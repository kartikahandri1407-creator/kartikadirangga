import React, { useState, useEffect, useMemo } from 'react';
import {
  OWNER_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_JOURNAL_ENTRIES,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  ProjectItem,
  ProjectCategory,
  ProjectStatus,
  JournalEntry,
} from './data/portfolioData';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { IS_ADMIN } from './admin';
import { JournalSection } from './components/JournalSection';
import { CollaborationSection } from './components/CollaborationSection';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Search,
  FolderOpen,
  Sliders,
  Menu,
  X,
  CheckCircle2,
  Camera,
  Trash2,
} from 'lucide-react';

const STORAGE_KEY_PROJECTS = 'kd_ai_portfolio_projects_v10';
const STORAGE_KEY_JOURNAL = 'kd_ai_portfolio_journal_v10';
const STORAGE_KEY_PORTRAIT = 'kd_ai_portfolio_portrait_v1';
// Foto profil default dibaca dari file statis: public/foto-profil.jpg
const DEFAULT_PORTRAIT = '/foto-profil.jpg';

export default function App() {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROJECTS;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_JOURNAL_ENTRIES;
  });

  const [portraitUrl, setPortraitUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_PORTRAIT) || DEFAULT_PORTRAIT;
    } catch {
      return DEFAULT_PORTRAIT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch {
      // Ignore quota errors
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_JOURNAL,
        JSON.stringify(journalEntries)
      );
    } catch {
      // Ignore
    }
  }, [journalEntries]);

  useEffect(() => {
    try {
      if (portraitUrl && portraitUrl !== DEFAULT_PORTRAIT) {
        localStorage.setItem(STORAGE_KEY_PORTRAIT, portraitUrl);
      } else {
        localStorage.removeItem(STORAGE_KEY_PORTRAIT);
      }
    } catch {
      // Ignore
    }
  }, [portraitUrl]);

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | 'ALL'
  >('ALL');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'ALL'>(
    'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const [editorOpen, setEditorOpen] = useState(false);
  const [projectBeingEdited, setProjectBeingEdited] =
    useState<ProjectItem | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      triggerToast('Ukuran foto maksimal 3 MB agar tersimpan dengan lancar.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPortraitUrl(reader.result);
        triggerToast('Foto profil berhasil diperbarui.');
      }
    };
    reader.readAsDataURL(file);
  };

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || null,
    [projects, activeProjectId]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'ALL' || project.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'ALL' || project.status === selectedStatus;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  const navigateToSection = (sectionId: string) => {
    setActiveProjectId(null);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 40);
  };

  const handleOpenProjectDetail = (project: ProjectItem) => {
    setActiveProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditProject = (project: ProjectItem) => {
    setProjectBeingEdited(project);
    setEditorOpen(true);
  };

  const handleOpenAddProject = () => {
    setProjectBeingEdited(null);
    setEditorOpen(true);
  };

  const handleSaveProject = (savedProject: ProjectItem) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === savedProject.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProject.id ? savedProject : p));
      }
      return [savedProject, ...prev];
    });
    setEditorOpen(false);
    triggerToast(`Perubahan pada "${savedProject.name}" berhasil disimpan.`);
  };

  const handleDeleteProject = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setEditorOpen(false);
    if (activeProjectId === projectId) {
      setActiveProjectId(null);
    }
    if (target) {
      triggerToast(`Karya "${target.name}" telah dihapus.`);
    }
  };

  const handleResetAllData = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem(STORAGE_KEY_PROJECTS);
    setEditorOpen(false);
    triggerToast('Data portofolio dikembalikan ke pengaturan awal.');
  };

  const handleAddJournalEntry = (newEntry: JournalEntry) => {
    setJournalEntries((prev) => [newEntry, ...prev]);
    triggerToast(`Catatan "${newEntry.title}" berhasil diterbitkan.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      {/* Strict 3-Zone Top Bar Contract — Global English Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-[1160px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Static Non-Clickable Brand Wordmark */}
          <div className="text-base font-bold tracking-tight text-[#141413] whitespace-nowrap shrink-0 font-display select-none cursor-default">
            <span className="text-[#FF5500]">KD</span>
            <span className="text-stone-300 mx-1.5">·</span>
            <span>AI Innovation Portfolio</span>
          </div>

          {/* Zone 2: 5 Single-Line Global English Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('home');
              }}
              className="hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('projects');
              }}
              className="hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
            >
              My Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('about');
              }}
              className="hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
            >
              About Me
            </a>
            <a
              href="#journal"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('journal');
              }}
              className="hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
            >
              Innovation Journal
            </a>
            <a
              href="#collaborate"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('collaborate');
              }}
              className="hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0"
            >
              Let&apos;s Collaborate
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateToSection('collaborate')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5500] rounded-lg hover:bg-[#E04800] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Let&apos;s Collaborate
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-[#141413] hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-stone-700">
              <button
                type="button"
                onClick={() => navigateToSection('home')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigateToSection('projects')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                My Projects
              </button>
              <button
                type="button"
                onClick={() => navigateToSection('about')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                About Me
              </button>
              <button
                type="button"
                onClick={() => navigateToSection('journal')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Innovation Journal
              </button>
              <button
                type="button"
                onClick={() => navigateToSection('collaborate')}
                className="text-left py-1 hover:text-[#FF5500]"
              >
                Let&apos;s Collaborate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-[#141413] text-white px-4 py-3 shadow-lg flex items-center gap-2.5 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeProject ? (
          <ProjectDetailView
            project={activeProject}
            allProjects={projects}
            onBack={() => setActiveProjectId(null)}
            onSelectProject={handleOpenProjectDetail}
            onEditProject={handleOpenEditProject}
          />
        ) : (
          <>
            {/* 1. HOME / HERO SECTION */}
            <section
              id="home"
              className="pt-14 pb-20 sm:pt-20 sm:pb-24 bg-white border-b border-stone-200/80"
            >
              <div className="max-w-[1160px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  {/* Left Column: Kartika Dirangga as the Primary Focal Anchor */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                    <div className="space-y-5">
                      {/* Unboxed Role Kicker */}
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#FF5500]">
                        {OWNER_PROFILE.roles.map((role, index) => (
                          <React.Fragment key={role}>
                            <span>{role}</span>
                            {index < OWNER_PROFILE.roles.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="text-stone-300"
                              >
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Primary Hero Headline: KARTIKA DIRANGGA */}
                      <div className="space-y-3">
                        <h1
                          className="text-5xl sm:text-6xl lg:text-[64px] font-bold text-[#141413] tracking-tight leading-[1.04] font-display"
                          style={{ textWrap: 'balance' }}
                        >
                          {OWNER_PROFILE.name}
                        </h1>
                        <div className="space-y-1">
                          <p className="text-2xl sm:text-3xl font-editorial italic text-[#FF5500] leading-snug">
                            &ldquo;{OWNER_PROFILE.tagline}&rdquo;
                          </p>
                          <p className="text-base sm:text-lg font-medium text-stone-700">
                            {OWNER_PROFILE.subheadline}
                          </p>
                        </div>
                      </div>

                      {/* Justified Lead Narrative */}
                      <p className="text-base text-stone-600 leading-relaxed max-w-xl text-justify">
                        {OWNER_PROFILE.shortIntro}
                      </p>
                    </div>

                    {/* Primary Actions & Official Social Links */}
                    <div className="pt-2 space-y-5">
                      <div className="flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => navigateToSection('projects')}
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF5500] text-white text-sm font-semibold hover:bg-[#E04800] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Explore My Projects</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => navigateToSection('about')}
                          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#141413] text-sm font-semibold hover:border-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>About Me</span>
                        </button>
                      </div>

                      {/* Verified Social Links Bar */}
                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-5 text-xs font-semibold text-stone-600">
                        <a
                          href={OWNER_PROFILE.socials.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-[#FF5500] transition-colors"
                        >
                          <span className="text-[#FF5500] font-bold">LinkedIn</span>
                          <span>·</span>
                          <span>{OWNER_PROFILE.fullNameWithTitle}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={OWNER_PROFILE.socials.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-[#FF5500] transition-colors"
                        >
                          <span className="text-[#FF5500] font-bold">Instagram</span>
                          <span>·</span>
                          <span>{OWNER_PROFILE.socials.instagramHandle}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Personal Portrait & Identity Frame */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="h-full rounded-2xl bg-[#FAF8F5] border border-stone-200/90 p-6 flex flex-col justify-between">
                      {portraitUrl ? (
                        <div className="space-y-4 my-auto">
                          <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-stone-100 border border-stone-200/80">
                            <img
                              src={portraitUrl}
                              alt={OWNER_PROFILE.name}
                              className="w-full h-full object-cover"
                              onError={() => setPortraitUrl('')}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#141413]">
                              {OWNER_PROFILE.fullNameWithTitle}
                            </div>
                            <p className="text-xs text-stone-600 mt-0.5">
                              ASN · Digital Innovator · AI Product Creator
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="my-auto py-4 space-y-5">
                          <div className="flex items-center justify-between">
                            <div className="w-16 h-16 rounded-2xl bg-[#FF5500] text-white flex items-center justify-center text-2xl font-bold font-display shadow-xs">
                              {OWNER_PROFILE.monogram}
                            </div>
                            <span className="text-xs font-semibold text-stone-500">
                              {OWNER_PROFILE.fullNameWithTitle}
                            </span>
                          </div>

                          <blockquote className="text-lg sm:text-xl font-editorial italic text-[#141413] leading-relaxed text-justify">
                            &ldquo;Inovasi terbaik lahir dari kepekaan melihat masalah nyata di sekitar kita, lalu menghadirkannya sebagai solusi yang ramah dan mempermudah sesama.&rdquo;
                          </blockquote>

                          <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-600 leading-relaxed text-justify">
                            Menghadirkan karya digital yang memiliki rasa, berakar pada empati, dan terbuka mengeksplorasi berbagai solusi lintas bidang untuk menjawab permasalahan di sekitar kita.
                          </div>
                        </div>
                      )}

                      {/* Photo Upload Control (admin only: ?admin=1) */}
                      {IS_ADMIN && (
                      <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-2">
                        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5500] hover:underline cursor-pointer">
                          <Camera className="w-3.5 h-3.5" />
                          <span>
                            {portraitUrl
                              ? 'Ganti Foto Profil Anda'
                              : 'Pasang Foto Profil Anda (Opsional)'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePortraitUpload}
                            className="hidden"
                          />
                        </label>

                        {portraitUrl && (
                          <button
                            type="button"
                            onClick={() => setPortraitUrl('')}
                            className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Foto</span>
                          </button>
                        )}
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. MY PROJECTS SECTION */}
            <section id="projects" className="py-20 sm:py-24">
              <div className="max-w-[1160px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div className="max-w-2xl">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-[#141413] tracking-tight font-display"
                      style={{ textWrap: 'balance' }}
                    >
                      My Projects
                    </h2>
                    <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed text-justify">
                      Enam prototipe aplikasi berbasis kecerdasan buatan yang saya bangun sebagai eksplorasi solusi di bidang tata kelola SDM, pemberdayaan perempuan, pelayanan publik kecamatan, pengawasan koperasi desa, dan kepariwisataan daerah. Setiap layar laptop dan ponsel di bawah ini menampilkan antarmuka langsung dari masing-masing prototipe.
                    </p>
                  </div>

                  {IS_ADMIN && (
<div className="flex items-center gap-2.5 self-start md:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (projects.length > 0) {
                          handleOpenEditProject(projects[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>Kelola Data</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenAddProject}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141413] text-white text-xs font-semibold hover:bg-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Karya</span>
                    </button>
                  </div>
)}
                </div>

                {/* Clean Interactive Filter Bar */}
                <div className="rounded-2xl bg-white border border-stone-200/85 p-4 sm:p-5 mb-10 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Status Segmented Controls */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                      <button
                        type="button"
                        onClick={() => setSelectedStatus('ALL')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedStatus === 'ALL'
                            ? 'bg-[#FF5500] text-white'
                            : 'text-stone-600 hover:text-[#141413]'
                        }`}
                      >
                        All Status ({projects.length})
                      </button>
                      {PROJECT_STATUSES.map((st) => {
                        const count = projects.filter(
                          (p) => p.status === st
                        ).length;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setSelectedStatus(st)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              selectedStatus === st
                                ? 'bg-[#FF5500] text-white'
                                : 'text-stone-600 hover:text-[#141413]'
                            }`}
                          >
                            {st} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Search Input */}
                    <div className="w-full lg:w-64 relative">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari proyek atau topik..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] text-xs text-[#141413] focus:bg-white focus:border-[#FF5500] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-stone-400 mr-1">
                      Category:
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('ALL')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === 'ALL'
                          ? 'bg-[#141413] text-white'
                          : 'text-stone-600 hover:text-[#FF5500]'
                      }`}
                    >
                      All Categories
                    </button>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#141413] text-white'
                            : 'text-stone-600 hover:text-[#FF5500]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2-Column Showcase Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project, idx) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={idx}
                        onSelectProject={handleOpenProjectDetail}
                        onEditProject={handleOpenEditProject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-stone-200 p-12 text-center max-w-lg mx-auto my-6">
                    <FolderOpen className="w-10 h-10 text-[#FF5500] mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#141413]">
                      Belum Ada Karya pada Filter Ini
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Tidak ditemukan proyek untuk kombinasi kategori{' '}
                      <span className="font-semibold">
                        {selectedCategory === 'ALL'
                          ? 'Semua Kategori'
                          : selectedCategory}
                      </span>{' '}
                      dan status{' '}
                      <span className="font-semibold">
                        {selectedStatus === 'ALL'
                          ? 'Semua Status'
                          : selectedStatus}
                      </span>
                      .
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory('ALL');
                          setSelectedStatus('ALL');
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 rounded-lg bg-[#FF5500] text-white text-xs font-semibold hover:bg-[#E04800] transition-colors cursor-pointer"
                      >
                        Reset Filter
                      </button>
{IS_ADMIN && (
                      <button
                        type="button"
                        onClick={handleOpenAddProject}
                        className="px-4 py-2 rounded-lg border border-stone-200 text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors cursor-pointer"
                      >
                        + Tambah Karya Baru
                      </button>
)}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 3. ABOUT ME SECTION */}
            <section
              id="about"
              className="py-20 sm:py-24 border-t border-stone-200/80 bg-white"
            >
              <div className="max-w-[1160px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left Column: Justified Personal Narrative */}
                  <div className="lg:col-span-7 space-y-6">
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-[#141413] tracking-tight leading-tight font-display"
                      style={{ textWrap: 'balance' }}
                    >
                      About Me
                    </h2>

                    <div className="space-y-4 text-base text-stone-600 leading-relaxed text-justify">
                      {OWNER_PROFILE.aboutNarrative.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-mono-tabular font-bold text-[#FF5500] mb-1">
                          01.
                        </div>
                        <h3 className="text-base font-bold text-[#141413]">
                          Berorientasi Masalah Nyata
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed text-justify">
                          Setiap karya berawal dari kepekaan membaca hambatan nyata yang dialami warga dan keluarga sehari-hari.
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-mono-tabular font-bold text-[#FF5500] mb-1">
                          02.
                        </div>
                        <h3 className="text-base font-bold text-[#141413]">
                          Sederhana, Inklusif & Akuntabel
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed text-justify">
                          Menyederhanakan teknologi AI menjadi solusi yang tenang, mudah dipahami, dan didokumentasikan secara jujur.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Clean Focus & Official Profile Card */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 p-7 sm:p-8 space-y-6">
                    <div className="pb-5 border-b border-stone-200/80">
                      <h3 className="text-xl font-bold text-[#141413] font-display">
                        {OWNER_PROFILE.fullNameWithTitle}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 text-justify">
                        Menghubungkan kepedulian pelayanan publik dengan solusi digital berbasis AI.
                      </p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="font-semibold text-[#FF5500] block mb-1">
                          Karakter & Fokus Karya
                        </span>
                        <span className="text-stone-700 leading-relaxed block text-justify">
                          Inovasi Berbasis Empati · Eksplorasi Solusi Lintas Bidang · Karya Digital yang Memiliki Rasa & Menjawab Masalah di Sekitar Kita
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-[#FF5500] block mb-1">
                          Prototipe yang Telah Dibangun
                        </span>
                        <span className="text-stone-700 leading-relaxed block text-justify">
                          JUR-AI, SahabatBaikmu, SI KELING Kecamatan Kemiling, PAMUNGKAS (Koperasi Desa Merah Putih), PUAN AI, serta Visit Bandar Lampung (Dalam Proses Pengembangan).
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-[#FF5500] block mb-1.5">
                          Jejaring Profesional & Media Sosial
                        </span>
                        <div className="flex flex-wrap items-center gap-3 pt-0.5">
                          <a
                            href={OWNER_PROFILE.socials.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors"
                          >
                            <span className="text-[#0A66C2] font-bold">in</span>
                            <span>LinkedIn</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                          </a>

                          <a
                            href={OWNER_PROFILE.socials.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors"
                          >
                            <span className="text-[#FF5500] font-bold">IG</span>
                            <span>{OWNER_PROFILE.socials.instagramHandle}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200/80">
                      <button
                        type="button"
                        onClick={() => navigateToSection('collaborate')}
                        className="w-full py-3 px-4 rounded-xl bg-[#141413] text-white text-xs font-semibold hover:bg-[#FF5500] transition-colors cursor-pointer"
                      >
                        Let&apos;s Collaborate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. INNOVATION JOURNAL SECTION */}
            <JournalSection
              entries={journalEntries}
              onAddEntry={handleAddJournalEntry}
            />

            {/* 5. LET'S COLLABORATE SECTION */}
            <CollaborationSection />
          </>
        )}
      </main>

      {/* Minimalist Architectural Footer */}
      <footer className="bg-white text-[#141413] border-t border-stone-200/90 py-12">
        <div className="max-w-[1160px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-base font-bold text-[#141413] font-display">
              {OWNER_PROFILE.fullNameWithTitle}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {OWNER_PROFILE.brandTitle} · {OWNER_PROFILE.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={() => navigateToSection('home')}
              className="hover:text-[#FF5500] cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateToSection('projects')}
              className="hover:text-[#FF5500] cursor-pointer"
            >
              My Projects
            </button>
            <button
              type="button"
              onClick={() => navigateToSection('about')}
              className="hover:text-[#FF5500] cursor-pointer"
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => navigateToSection('journal')}
              className="hover:text-[#FF5500] cursor-pointer"
            >
              Innovation Journal
            </button>
            <button
              type="button"
              onClick={() => navigateToSection('collaborate')}
              className="hover:text-[#FF5500] cursor-pointer"
            >
              Let&apos;s Collaborate
            </button>
            <span className="text-stone-300">|</span>
            <a
              href={OWNER_PROFILE.socials.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#141413] hover:text-[#FF5500]"
            >
              LinkedIn
            </a>
            <a
              href={OWNER_PROFILE.socials.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#141413] hover:text-[#FF5500]"
            >
              Instagram ({OWNER_PROFILE.socials.instagramHandle})
            </a>
          </div>
        </div>
      </footer>

      {/* Project Studio Editor Modal (admin only) */}
      {editorOpen && (
        <ProjectEditorModal
          projectToEdit={projectBeingEdited}
          onSave={handleSaveProject}
          onDelete={projectBeingEdited ? handleDeleteProject : undefined}
          onClose={() => setEditorOpen(false)}
          allProjects={projects}
          onResetAllData={handleResetAllData}
        />
      )}
    </div>
  );
}
