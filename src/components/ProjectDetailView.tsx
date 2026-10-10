import { IS_ADMIN } from '../admin';
import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { isValidHttpUrl } from './ProjectCard';
import {
  ArrowLeft,
  Sliders,
  ExternalLink,
  Link2,
  X,
  ArrowUpRight,
} from 'lucide-react';

interface ProjectDetailViewProps {
  project: ProjectItem;
  allProjects: ProjectItem[];
  onBack: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onEditProject: (project: ProjectItem) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
  onEditProject,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasValidDemo = isValidHttpUrl(project.demoUrl);
  const relatedProjects = allProjects.filter((p) => p.id !== project.id);

  return (
    <div className="max-w-[1160px] mx-auto px-6 py-12">
      {/* Top Navigation & Studio Edit Control */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-stone-200/80">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Projects</span>
        </button>

        <div className="flex items-center gap-3">
          {IS_ADMIN && (
<button
            type="button"
            onClick={() => onEditProject(project)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-white text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>Edit Project Data</span>
          </button>
)}

          {hasValidDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5500] text-white text-xs font-semibold hover:bg-[#E04800] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Coba Prototipe</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Case Study Hero Split */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-5">
          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-[#FF5500]">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#141413]">
              Status: {project.status}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{project.lastUpdated}</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-[#141413] tracking-tight leading-[1.08] font-display"
            style={{ textWrap: 'balance' }}
          >
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed text-justify">
            {project.summary}
          </p>

          {/* Status & Demo Link Spec Strip */}
          <div className="pt-5 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-stone-500">Status Pengembangan</p>
              <p className="text-sm font-bold text-[#141413] mt-1">
                {project.status}
              </p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed text-justify">
                {project.verificationNote}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500">Tautan Prototipe</p>
              {hasValidDemo ? (
                <div className="mt-1">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF5500] hover:underline break-all"
                  >
                    <span>Buka Prototipe Interaktif</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              ) : (
                <div className="mt-1">
                  <p className="text-sm font-semibold text-[#141413]">
                    Belum Ditautkan
                  </p>
                  {IS_ADMIN && (
<button
                    type="button"
                    onClick={() => onEditProject(project)}
                    className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-[#FF5500] hover:underline cursor-pointer"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Hubungkan URL Prototipe</span>
                  </button>
)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-6">
          <ProjectVisualPreview
            project={project}
            size="detail"
            onOpenLightbox={() => setLightboxOpen(true)}
          />
        </div>
      </div>

      {/* Editorial Case Study Architecture (Justified & Clean) */}
      <div className="mt-16 pt-12 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">01.</span>
            Masalah yang Ingin Diselesaikan
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.problemStatement}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">02.</span>
            Pengguna Sasaran
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.targetUsers}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">03.</span>
            Konsep Solusi
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.solutionConcept}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">04.</span>
            Peran AI dalam Solusi
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.aiRole}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-3">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">05.</span>
            Fitur yang Telah Dirancang
          </h2>
          {project.implementedFeatures.length > 0 ? (
            <ul className="space-y-2.5 text-sm text-stone-600">
              {project.implementedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-bold text-[#FF5500] mt-0.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-relaxed text-justify">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500">
              Sedang dalam tahap perumusan spesifikasi fitur awal.
            </p>
          )}
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">06.</span>
            Pendekatan Pengembangan
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.developmentApproach}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-3">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">07.</span>
            Hal yang Masih Perlu Dikembangkan
          </h2>
          {project.futureImprovements.length > 0 ? (
            <ul className="space-y-2.5 text-sm text-stone-600">
              {project.futureImprovements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-bold text-stone-400 mt-0.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-relaxed text-justify">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500">
              Peta jalan pengembangan berikutnya sedang disusun.
            </p>
          )}
        </section>

        <section className="rounded-2xl bg-white border border-stone-200/80 p-7 space-y-2.5">
          <h2 className="text-lg font-bold text-[#141413]">
            <span className="text-[#FF5500] font-mono-tabular mr-2">08.</span>
            Pelajaran dan Rencana Berikutnya
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed text-justify">
            {project.lessonsAndNextSteps}
          </p>
        </section>
      </div>

      {/* Related Works */}
      {relatedProjects.length > 0 && (
        <div className="mt-16 pt-12 border-t border-stone-200/80">
          <h3 className="text-xl font-bold text-[#141413] mb-6">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProjects.map((other) => (
              <button
                key={other.id}
                type="button"
                onClick={() => onSelectProject(other)}
                className="group text-left rounded-2xl bg-white border border-stone-200/80 p-5 hover:border-[#FF5500] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#FF5500] font-medium">
                    {other.category} · {other.status}
                  </div>
                  <div className="text-lg font-bold text-[#141413] mt-1.5 group-hover:text-[#FF5500] transition-colors">
                    {other.name}
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed text-justify">
                    {other.summary}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#141413] group-hover:text-[#FF5500]">
                  <span>Lihat Rincian</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#141413]">
                  {project.name}
                </h3>
                <p className="text-xs text-stone-500">
                  {project.visualAsset.captionLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-lg text-stone-500 hover:text-[#141413] hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProjectVisualPreview project={project} size="detail" />
          </div>
        </div>
      )}
    </div>
  );
};
