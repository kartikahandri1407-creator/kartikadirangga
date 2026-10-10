import React, { useState } from 'react';
import {
  ProjectItem,
  ProjectCategory,
  ProjectStatus,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  MockupPreviewTheme,
} from '../data/portfolioData';
import { isValidHttpUrl } from './ProjectCard';
import { X, Upload, Check, Trash2, AlertTriangle, Copy } from 'lucide-react';

interface ProjectEditorModalProps {
  projectToEdit: ProjectItem | null; // null means creating a new project
  onSave: (project: ProjectItem) => void;
  onDelete?: (projectId: string) => void;
  onClose: () => void;
  allProjects: ProjectItem[];
  onResetAllData: () => void;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  projectToEdit,
  onSave,
  onDelete,
  onClose,
  allProjects,
  onResetAllData,
}) => {
  const isNew = !projectToEdit;

  const [name, setName] = useState(projectToEdit?.name ?? '');
  const [category, setCategory] = useState<ProjectCategory>(
    projectToEdit?.category ?? 'Pelayanan Publik & Kecamatan'
  );
  const [status, setStatus] = useState<ProjectStatus>(
    projectToEdit?.status ?? 'Concept'
  );
  const [isVerified, setIsVerified] = useState<boolean>(
    projectToEdit?.isVerified ?? false
  );
  const [verificationNote, setVerificationNote] = useState(
    projectToEdit?.verificationNote ??
      'Data Draft: Belum Terverifikasi. Perbarui setelah implementasi dan tautan dikonfirmasi.'
  );
  const [featured, setFeatured] = useState<boolean>(
    projectToEdit?.featured ?? true
  );
  const [summary, setSummary] = useState(projectToEdit?.summary ?? '');
  const [problemStatement, setProblemStatement] = useState(
    projectToEdit?.problemStatement ?? ''
  );
  const [targetUsers, setTargetUsers] = useState(
    projectToEdit?.targetUsers ?? ''
  );
  const [solutionConcept, setSolutionConcept] = useState(
    projectToEdit?.solutionConcept ?? ''
  );
  const [implementedFeaturesText, setImplementedFeaturesText] = useState(
    (projectToEdit?.implementedFeatures ?? []).join('\n')
  );
  const [aiRole, setAiRole] = useState(projectToEdit?.aiRole ?? '');
  const [developmentApproach, setDevelopmentApproach] = useState(
    projectToEdit?.developmentApproach ??
      'Dirancang melalui pendekatan berorientasi masalah nyata dengan dukungan kecerdasan buatan (AI).'
  );
  const [demoUrl, setDemoUrl] = useState(projectToEdit?.demoUrl ?? '');
  const [assetType, setAssetType] = useState<'mockup' | 'screenshot'>(
    projectToEdit?.visualAsset.assetType ?? 'mockup'
  );
  const [captionLabel, setCaptionLabel] = useState(
    projectToEdit?.visualAsset.captionLabel ??
      'Ilustrasi Mockup Konsep Antarmuka (Draft)'
  );
  const [imageUrl, setImageUrl] = useState(
    projectToEdit?.visualAsset.imageUrl ?? ''
  );
  const [previewTheme, setPreviewTheme] = useState<MockupPreviewTheme>(
    projectToEdit?.visualAsset.previewTheme ?? 'inclusion'
  );
  const [futureImprovementsText, setFutureImprovementsText] = useState(
    (projectToEdit?.futureImprovements ?? []).join('\n')
  );
  const [lessonsAndNextSteps, setLessonsAndNextSteps] = useState(
    projectToEdit?.lessonsAndNextSteps ?? ''
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      setErrorMessage(
        'Ukuran gambar terlalu besar (maksimal 2.5 MB agar dapat disimpan dengan lancar di peramban).'
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        setAssetType('screenshot');
        setCaptionLabel(`Screenshot Asli Antarmuka ${name || 'Proyek'}`);
        setErrorMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Nama proyek wajib diisi.');
      return;
    }
    if (!summary.trim()) {
      setErrorMessage('Ringkasan proyek wajib diisi.');
      return;
    }
    if (demoUrl.trim() !== '' && !isValidHttpUrl(demoUrl.trim())) {
      setErrorMessage(
        'Tautan demo harus menggunakan format URL yang valid (diawali https:// atau http://) atau dikosongkan jika belum tersedia.'
      );
      return;
    }

    const now = new Date();
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const updatedProject: ProjectItem = {
      id:
        projectToEdit?.id ??
        `${name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      category,
      status,
      isVerified,
      verificationNote: verificationNote.trim(),
      lastUpdated: formattedDate,
      featured,
      summary: summary.trim(),
      problemStatement:
        problemStatement.trim() || 'Masalah sedang dirumuskan lebih lanjut.',
      targetUsers:
        targetUsers.trim() || 'Pengguna sasaran sedang dipetakan.',
      solutionConcept:
        solutionConcept.trim() || 'Konsep solusi sedang dalam penyusunan.',
      implementedFeatures: implementedFeaturesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      aiRole: aiRole.trim() || 'Peran AI sedang dirumuskan.',
      developmentApproach:
        developmentApproach.trim() ||
        'Perancangan prototipe solusi berbasis masalah nyata dengan dukungan teknologi AI.',
      visualAsset: {
        assetType,
        captionLabel:
          captionLabel.trim() ||
          (assetType === 'screenshot'
            ? 'Screenshot Asli'
            : 'Ilustrasi Mockup Konsep (Draft)'),
        imageUrl: imageUrl.trim(),
        previewTheme,
      },
      demoUrl: demoUrl.trim(),
      futureImprovements: futureImprovementsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      lessonsAndNextSteps:
        lessonsAndNextSteps.trim() ||
        'Melanjutkan verifikasi fitur dan uji coba bertahap.',
    };

    onSave(updatedProject);
  };

  const handleCopyAllJson = () => {
    navigator.clipboard.writeText(JSON.stringify(allProjects, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#101827]/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-[#F4F6FA]">
          <div>
            <h2 className="text-lg font-bold text-[#101827]">
              {isNew
                ? 'Tambah Proyek Inovasi Baru'
                : `Kelola Data Proyek: ${projectToEdit.name}`}
            </h2>
            <p className="text-xs text-slate-600">
              Perbarui status aktual, tautan prototype asli, screenshot, atau rincian dokumentasi proyek.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-[#101827] hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Tutup editor proyek"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-6 text-sm"
        >
          {errorMessage && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-xs text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Basic Info & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-[#101827] mb-1.5">
                Nama Proyek *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: SahabatBaikmu"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1.5">
                Kategori Proyek
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#101827] bg-white focus:border-[#3478F6] focus:outline-none"
              >
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1.5">
                Status Aktual Proyek
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#101827] bg-white focus:border-[#3478F6] focus:outline-none"
              >
                {PROJECT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Verification Control */}
          <div className="rounded-xl bg-[#F4F6FA] border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsVerified(checked);
                    if (checked && verificationNote.includes('Belum Terverifikasi')) {
                      setVerificationNote(
                        'Data dan status proyek telah diverifikasi sesuai kondisi aktual.'
                      );
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-[#3478F6] focus:ring-[#3478F6]"
                />
                <span className="text-xs font-semibold text-[#101827]">
                  Tandai proyek ini sebagai &ldquo;Data Terverifikasi&rdquo; (Bukan Draft)
                </span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#3478F6] focus:ring-[#3478F6]"
                />
                <span className="text-xs text-slate-700">
                  Tampilkan di halaman utama (Home)
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Catatan Transparansi Status
              </label>
              <input
                type="text"
                value={verificationNote}
                onChange={(e) => setVerificationNote(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-[#3478F6] focus:outline-none"
              />
            </div>
          </div>

          {/* Tautan Prototype & Screenshot (Tahap 3 Ready) */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tautan Prototype & Visual Proyek
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#141413] mb-1">
                Tautan Prototipe Asli (Kosongkan jika belum tersedia)
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tombol &ldquo;Buka Prototype&rdquo; hanya akan muncul jika tautan valid diisi. Jangan mengisi tautan palsu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#101827] mb-1">
                  Jenis Tampilan Visual
                </label>
                <select
                  value={assetType}
                  onChange={(e) =>
                    setAssetType(e.target.value as 'mockup' | 'screenshot')
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white text-[#101827]"
                >
                  <option value="mockup">
                    Ilustrasi Mockup Konsep (Draft)
                  </option>
                  <option value="screenshot">
                    Screenshot Asli Aplikasi dan Prototipe
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101827] mb-1">
                  Label Keterangan Visual
                </label>
                <input
                  type="text"
                  value={captionLabel}
                  onChange={(e) => setCaptionLabel(e.target.value)}
                  placeholder="Contoh: Screenshot Asli Prototype v1"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#101827]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-[#101827] mb-1">
                  Unggah File Screenshot Asli (Opsional)
                </label>
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-[#F4F6FA] hover:bg-slate-200/70 text-xs font-medium text-[#101827] cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#3478F6]" />
                  <span>Pilih Gambar dari Perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141413] mb-1">
                  Atau URL Gambar dan Tema Visual
                </label>
                {imageUrl ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        setAssetType('mockup');
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600 hover:text-red-600 cursor-pointer shrink-0"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                ) : (
                  <select
                    value={previewTheme}
                    onChange={(e) =>
                      setPreviewTheme(e.target.value as MockupPreviewTheme)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs bg-white text-slate-700"
                  >
                    <option value="companion">
                      Tema Mockup: Ruang Percakapan & Refleksi
                    </option>
                    <option value="inclusion">
                      Tema Mockup: Panduan Akses Layanan Publik
                    </option>
                    <option value="empowerment">
                      Tema Mockup: Modul Belajar & Produktivitas
                    </option>
                    <option value="village">
                      Tema Visual: Asisten Informasi Desa dan Komunitas
                    </option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Narrative Fields */}
          <div>
            <label className="block text-xs font-semibold text-[#101827] mb-1">
              Ringkasan Proyek *
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Masalah yang Ingin Diselesaikan
              </label>
              <textarea
                rows={3}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Pengguna Sasaran
              </label>
              <textarea
                rows={3}
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Konsep Solusi
              </label>
              <textarea
                rows={3}
                value={solutionConcept}
                onChange={(e) => setSolutionConcept(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Peran AI dalam Solusi
              </label>
              <textarea
                rows={3}
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Fitur yang Benar-Benar Sudah Diimplementasikan (Satu per baris)
              </label>
              <textarea
                rows={4}
                value={implementedFeaturesText}
                onChange={(e) => setImplementedFeaturesText(e.target.value)}
                placeholder="Tuliskan hanya fitur yang benar-benar sudah dibuat..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Hal yang Masih Perlu Dikembangkan (Satu per baris)
              </label>
              <textarea
                rows={4}
                value={futureImprovementsText}
                onChange={(e) => setFutureImprovementsText(e.target.value)}
                placeholder="Tuliskan rencana pengembangan atau hal yang belum selesai..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Pendekatan Pengembangan
              </label>
              <textarea
                rows={2}
                value={developmentApproach}
                onChange={(e) => setDevelopmentApproach(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101827] mb-1">
                Pelajaran dan Rencana Berikutnya
              </label>
              <textarea
                rows={2}
                value={lessonsAndNextSteps}
                onChange={(e) => setLessonsAndNextSteps(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-[#101827] focus:border-[#3478F6] focus:outline-none"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {!isNew && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(projectToEdit.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Proyek</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyAllJson}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copiedJson ? 'JSON Tersalin!' : 'Salin JSON Semua Proyek'}
                </span>
              </button>

              <button
                type="button"
                onClick={onResetAllData}
                className="px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-[#101827] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Reset ke Draft Awal
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#FF5500] text-white text-xs font-semibold hover:bg-[#E04800] transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
