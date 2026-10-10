import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import {
  Maximize2,
  Laptop,
  Smartphone,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ProjectVisualPreviewProps {
  project: ProjectItem;
  size?: 'card' | 'detail';
  onOpenLightbox?: () => void;
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({
  project,
  size = 'card',
  onOpenLightbox,
}) => {
  const [imageError, setImageError] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const { visualAsset, name, demoUrl } = project;

  const hasCustomUploadedImage = Boolean(
    visualAsset.imageUrl &&
      visualAsset.imageUrl.trim() !== '' &&
      !imageError
  );

  const hasLiveUrl = Boolean(demoUrl && demoUrl.startsWith('http'));

  // Faithful 1:1 miniature UI of each of Kartika's 6 real applications (instant render & backdrop behind live iframe)
  const renderAuthenticAppScreen = (device: 'laptop' | 'phone') => {
    const theme = visualAsset.previewTheme;
    const isPhone = device === 'phone';

    if (theme === 'sikeling' || project.id.includes('si-keling')) {
      return (
        <div className="w-full h-full bg-[#F8FAFC] text-slate-900 flex flex-col justify-between p-2.5 select-none overflow-hidden">
          <div className="flex items-center justify-between bg-[#0F172A] text-white px-2.5 py-1.5 rounded-md">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[9px] font-bold tracking-tight">
                SI KELING · Kecamatan Kemiling
              </span>
            </div>
            <span className="text-[7px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">
              Layanan Warga
            </span>
          </div>

          <div className="my-auto py-1.5 grid grid-cols-12 gap-2">
            <div className={isPhone ? 'col-span-12 space-y-1' : 'col-span-7 space-y-1'}>
              <div className="text-[8px] font-bold text-orange-600 uppercase">
                Kota Bandar Lampung
              </div>
              <div className="text-[10px] font-extrabold text-slate-900 leading-tight">
                Sistem Informasi & Konsultasi Pelayanan Kemiling
              </div>
              <div className="bg-white border border-slate-200 rounded p-1.5 text-[8px] text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">
                  Asisten AI Pelayanan Kecamatan
                </div>
                <div className="bg-orange-50 text-orange-800 px-1.5 py-0.5 rounded text-[7px]">
                  Tanya syarat administrasi & kirim pengaduan warga
                </div>
              </div>
            </div>
            {!isPhone && (
              <div className="col-span-5 bg-white border border-slate-200 rounded p-1.5 flex flex-col justify-between">
                <div className="text-[8px] font-bold text-slate-800">
                  Form Laporan Warga
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-slate-100 rounded w-full" />
                  <div className="h-2 bg-slate-100 rounded w-4/5" />
                  <div className="h-3 bg-orange-500 rounded w-full flex items-center justify-center text-[6px] text-white font-bold">
                    Kirim Laporan + Foto
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[7px] text-slate-400 border-t border-slate-200 pt-1">
            <span>Seksi Pelayanan Umum</span>
            <span>Dasbor Petugas (PIN)</span>
          </div>
        </div>
      );
    }

    if (theme === 'pamungkas' || project.id.includes('pamungkas')) {
      return (
        <div className="w-full h-full bg-[#FFFDF9] text-stone-900 flex flex-col justify-between p-2.5 select-none overflow-hidden">
          <div className="flex items-center justify-between bg-[#991B1B] text-white px-2.5 py-1.5 rounded-md">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[9px] font-bold tracking-tight">
                PAMUNGKAS · KDKMP Merah Putih
              </span>
            </div>
            <span className="text-[7px] bg-white/15 px-1.5 py-0.5 rounded">
              AI Signal Extraction
            </span>
          </div>

          <div className="my-auto py-1.5 grid grid-cols-12 gap-2">
            <div className={isPhone ? 'col-span-12 space-y-1' : 'col-span-7 space-y-1'}>
              <div className="text-[8px] font-bold text-red-700 uppercase">
                Pengawasan Koperasi Berjenjang
              </div>
              <div className="text-[10px] font-extrabold text-stone-900 leading-tight">
                Ekstraksi Sinyal Kesehatan Koperasi Desa Merah Putih
              </div>
              <div className="grid grid-cols-3 gap-1 pt-0.5">
                <div className="bg-emerald-50 border border-emerald-200 rounded p-1 text-center">
                  <div className="text-[7px] text-emerald-700 font-bold">Sehat</div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded p-1 text-center">
                  <div className="text-[7px] text-amber-700 font-bold">Waspada</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-1 text-center">
                  <div className="text-[7px] text-red-700 font-bold">Urgensi</div>
                </div>
              </div>
            </div>
            {!isPhone && (
              <div className="col-span-5 bg-white border border-stone-200 rounded p-1.5 space-y-1">
                <div className="text-[7px] font-bold text-stone-700">
                  Peta Sebaran & Peran Dinas
                </div>
                <div className="h-8 bg-orange-50 border border-orange-200 rounded flex items-center justify-center text-[7px] text-orange-800 font-semibold">
                  Pusat · Provinsi · Kab · Desa
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[7px] text-stone-400 border-t border-stone-200 pt-1">
            <span>Deteksi Risiko AI</span>
            <span>Rekomendasi Pembinaan</span>
          </div>
        </div>
      );
    }

    if (theme === 'puan' || project.id.includes('puan')) {
      return (
        <div className="w-full h-full bg-[#FFF7F5] text-stone-900 flex flex-col justify-between p-2.5 select-none overflow-hidden">
          <div className="flex items-center justify-between bg-white border border-rose-200 px-2.5 py-1.5 rounded-md">
            <span className="text-[9px] font-bold text-rose-700">
              PUAN AI · Teman Harian Perempuan
            </span>
            <span className="text-[7px] text-rose-600 font-semibold">
              Zero-Retention Privacy
            </span>
          </div>

          <div className="my-auto py-1 space-y-1.5">
            <div className="text-[10px] font-extrabold text-stone-900 leading-tight">
              4 Pilar Kesejahteraan Perempuan Indonesia
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-white border border-rose-100 rounded p-1">
                <div className="text-[7px] font-bold text-rose-600">01. Kenali Diri</div>
                <div className="text-[6px] text-stone-500">Siklus & Energi</div>
              </div>
              <div className="bg-white border border-rose-100 rounded p-1">
                <div className="text-[7px] font-bold text-orange-600">02. Atur Hidup</div>
                <div className="text-[6px] text-stone-500">Finansial 50-30-20</div>
              </div>
              {!isPhone && (
                <>
                  <div className="bg-white border border-rose-100 rounded p-1">
                    <div className="text-[7px] font-bold text-emerald-600">03. Jaga Tubuh</div>
                    <div className="text-[6px] text-stone-500">Gizi & Herbal TOGA</div>
                  </div>
                  <div className="bg-white border border-rose-100 rounded p-1">
                    <div className="text-[7px] font-bold text-purple-600">04. Jurnal Malam</div>
                    <div className="text-[6px] text-stone-500">Ruang Curhat Aman</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] text-stone-400 border-t border-rose-100 pt-1">
            <span>Ruang Ngobrol AI</span>
            <span>Empatik & Privat</span>
          </div>
        </div>
      );
    }

    if (theme === 'sahabat' || project.id.includes('sahabat')) {
      return (
        <div className="w-full h-full bg-[#FDF8F5] text-stone-900 flex flex-col justify-between p-2.5 select-none overflow-hidden">
          <div className="flex items-center justify-between bg-white border border-orange-200 px-2.5 py-1.5 rounded-md">
            <span className="text-[9px] font-bold text-[#EA580C]">
              SahabatBaikmu · Pejuang Garis Dua
            </span>
            <span className="text-[7px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded font-semibold">
              Pelukan Darurat
            </span>
          </div>

          <div className="my-auto py-1 space-y-1.5">
            <div className="text-[10px] font-extrabold text-stone-900 leading-tight">
              Pendamping Holistik, Emosional & Spiritual Promil
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-white border border-orange-100 rounded p-1">
                <div className="text-[7px] font-bold text-orange-600">Ruang Utama</div>
                <div className="text-[6px] text-stone-500">Teman Cerita Hangat</div>
              </div>
              <div className="bg-white border border-orange-100 rounded p-1">
                <div className="text-[7px] font-bold text-rose-600">Klinik Holistik</div>
                <div className="text-[6px] text-stone-500">Siklus & Catatan Lab</div>
              </div>
              {!isPhone && (
                <>
                  <div className="bg-white border border-orange-100 rounded p-1">
                    <div className="text-[7px] font-bold text-amber-600">Ruang Spiritual</div>
                    <div className="text-[6px] text-stone-500">Doa & Ketenangan</div>
                  </div>
                  <div className="bg-white border border-orange-100 rounded p-1">
                    <div className="text-[7px] font-bold text-emerald-600">Studio Hati</div>
                    <div className="text-[6px] text-stone-500">Afirmasi & Jurnal</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] text-stone-400 border-t border-orange-100 pt-1">
            <span>Pendamping Non-Klinis</span>
            <span>Ruang Tenang & Doa</span>
          </div>
        </div>
      );
    }

    if (theme === 'jurai' || project.id.includes('jur-ai')) {
      return (
        <div className="w-full h-full bg-[#0F172A] text-white flex flex-col justify-between p-2.5 select-none overflow-hidden">
          <div className="flex items-center justify-between bg-slate-800/90 border border-slate-700 px-2.5 py-1.5 rounded-md">
            <span className="text-[9px] font-bold text-orange-400">
              JUR-AI · Behavioral Risk Intelligence
            </span>
            <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
              Integrity Sensor ON
            </span>
          </div>

          <div className="my-auto py-1 space-y-1.5">
            <div className="text-[10px] font-extrabold text-white leading-tight">
              Simulasi & Asesmen Integritas SDM Sektor Publik
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-slate-800/80 border border-slate-700 rounded p-1">
                <div className="text-[7px] font-bold text-orange-300">Sektor OPD</div>
                <div className="text-[6px] text-slate-300">BKPSDM · BPKAD</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded p-1">
                <div className="text-[7px] font-bold text-sky-300">Sensor Aktif</div>
                <div className="text-[6px] text-slate-300">Focus & Anti-Paste</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] text-slate-400 border-t border-slate-800 pt-1">
            <span>Good Governance Alignment</span>
            <span>Risk Profiling</span>
          </div>
        </div>
      );
    }

    // Default / Visit Bandar Lampung
    return (
      <div className="w-full h-full bg-[#F8FAFC] text-slate-900 flex flex-col justify-between p-2.5 select-none overflow-hidden">
        <div className="flex items-center justify-between bg-sky-900 text-white px-2.5 py-1.5 rounded-md">
          <span className="text-[9px] font-bold">
            Visit Bandar Lampung · Smart Tourism
          </span>
          <span className="text-[7px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
            In Development
          </span>
        </div>

        <div className="my-auto py-1 space-y-1.5">
          <div className="text-[10px] font-extrabold text-slate-900 leading-tight">
            Direktori Wisata, Kuliner, Akomodasi & Pemandu AI
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-white border border-slate-200 rounded p-1">
              <div className="text-[7px] font-bold text-sky-700">Puncak Mas</div>
              <div className="text-[6px] text-slate-500">Panorama</div>
            </div>
            <div className="bg-white border border-slate-200 rounded p-1">
              <div className="text-[7px] font-bold text-emerald-700">Lembah Hijau</div>
              <div className="text-[6px] text-slate-500">Rekreasi</div>
            </div>
            <div className="bg-white border border-slate-200 rounded p-1">
              <div className="text-[7px] font-bold text-orange-600">AI Guide</div>
              <div className="text-[6px] text-slate-500">Chat & Report</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[7px] text-slate-400 border-t border-slate-200 pt-1">
          <span>Kota Bandar Lampung</span>
          <span>Sedang Dalam Proses Pengembangan</span>
        </div>
      </div>
    );
  };

  // Screen content renderer: uses custom screenshot if uploaded, or overlays live scaled iframe of the real app URL on top of the faithful replica!
  const renderDeviceScreenContent = (device: 'laptop' | 'phone') => {
    if (hasCustomUploadedImage) {
      return (
        <img
          src={visualAsset.imageUrl}
          alt={`${name} (${device})`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top"
        />
      );
    }

    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Instant 1:1 Authentic Replica Backdrop */}
        <div className="absolute inset-0 z-0">
          {renderAuthenticAppScreen(device)}
        </div>

        {/* Real Live Prototype Viewport rendered directly inside the Laptop & Phone screen */}
        {hasLiveUrl && (
          <div
            className="absolute inset-0 z-10 overflow-hidden bg-white"
            style={{
              pointerEvents: interactiveMode && size === 'detail' ? 'auto' : 'none',
            }}
          >
            {device === 'laptop' ? (
              <iframe
                src={demoUrl}
                title={`Layar Laptop ${name}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="border-0 origin-top-left"
                style={{
                  width: '1280px',
                  height: '800px',
                  transform:
                    size === 'detail' ? 'scale(0.35)' : 'scale(0.245)',
                }}
              />
            ) : (
              <iframe
                src={demoUrl}
                title={`Layar HP ${name}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="border-0 origin-top-left"
                style={{
                  width: '390px',
                  height: '780px',
                  transform:
                    size === 'detail' ? 'scale(0.24)' : 'scale(0.18)',
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col w-full">
      {/* Studio Showcase Container with Laptop + Smartphone Frames */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF7ED] via-[#FAF8F5] to-[#FFEDD5]/70 border border-stone-200/90 flex items-center justify-center ${
          size === 'detail'
            ? 'aspect-[16/10] min-h-[320px] p-6 sm:p-8'
            : 'aspect-[16/10] min-h-[235px] p-4 sm:p-5'
        }`}
      >
        {/* Subtle Warm Architectural Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#FF5500]/10 blur-2xl pointer-events-none"
        />

        {/* Top-Left Live Screen Badge */}
        <div className="absolute top-3 left-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs border border-stone-200/80 text-[10px] font-semibold text-stone-700 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
          <span>
            {project.status === 'In Development'
              ? 'Live Preview · In Development'
              : 'Live Prototype Screen'}
          </span>
        </div>

        {/* Device Composition: Realistic Laptop Frame + Smartphone Frame */}
        <div className="relative w-full h-full flex items-center justify-center pt-4">
          {/* MACBOOK / LAPTOP FRAME */}
          <div
            className={`relative flex flex-col items-center transition-transform duration-300 ease-out group-hover:scale-[1.015] ${
              size === 'detail'
                ? 'w-[86%] max-w-[450px]'
                : 'w-[84%] max-w-[315px]'
            } mr-4 sm:mr-6`}
          >
            {/* Laptop Lid / Bezel */}
            <div className="w-full aspect-[16/10] rounded-t-xl bg-[#18181B] p-[5px] sm:p-[6px] shadow-xl border border-stone-700/80 relative">
              {/* Camera Notch */}
              <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b bg-stone-800 z-20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-stone-600" />
              </div>
              {/* Inner Laptop Screen */}
              <div className="w-full h-full rounded-[6px] overflow-hidden bg-white relative">
                {renderDeviceScreenContent('laptop')}
              </div>
            </div>
            {/* Laptop Aluminum Base Chin */}
            <div className="w-[108%] h-2.5 sm:h-3 bg-gradient-to-b from-stone-300 via-stone-200 to-stone-400 rounded-b-xl shadow-md border-t border-white/60 flex items-start justify-center">
              <div className="w-10 h-1 bg-stone-400/80 rounded-b" />
            </div>
          </div>

          {/* SMARTPHONE FRAME (Overlapping Bottom-Right) */}
          <div
            className={`absolute right-2 sm:right-4 bottom-2 sm:bottom-3 z-20 flex flex-col items-center transition-transform duration-300 ease-out group-hover:translate-y-[-2px] ${
              size === 'detail'
                ? 'w-[23%] max-w-[96px]'
                : 'w-[22%] max-w-[70px]'
            }`}
          >
            <div className="w-full aspect-[1/2] rounded-[14px] sm:rounded-[16px] bg-[#18181B] p-[3px] sm:p-[4px] shadow-2xl border border-stone-700 relative">
              {/* Dynamic Island / Speaker */}
              <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full bg-stone-900 z-20" />
              {/* Inner Phone Screen */}
              <div className="w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden bg-white relative">
                {renderDeviceScreenContent('phone')}
              </div>
            </div>
          </div>
        </div>

        {/* Detail View Controls: Interactive Mode & Fullscreen */}
        {size === 'detail' && (
          <div className="absolute bottom-3 left-3.5 right-3.5 z-30 flex flex-wrap items-center justify-between gap-2">
            {hasLiveUrl && !hasCustomUploadedImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setInteractiveMode((prev) => !prev);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                  interactiveMode
                    ? 'bg-[#FF5500] text-white border-[#FF5500]'
                    : 'bg-white/95 hover:bg-white text-[#141413] border-stone-200/90'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {interactiveMode
                    ? 'Selesai Interaksi di Layar'
                    : 'Aktifkan Scroll di Layar Laptop'}
                </span>
              </button>
            )}

            {onOpenLightbox && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#141413] border border-stone-200/90 shadow-xs text-xs font-semibold transition-transform duration-150 hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer ml-auto"
                title="Perbesar pratinjau visual"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Perbesar Layar</span>
              </button>
            )}
          </div>
        )}
      </div>

      {size === 'detail' && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-stone-700 font-medium">
              <Laptop className="w-3.5 h-3.5 text-[#FF5500]" />
              <Smartphone className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>{visualAsset.captionLabel}</span>
            </span>
          </div>
          {hasLiveUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#FF5500] hover:underline"
            >
              <span>Buka Tampilan Penuh di Tab Baru</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
