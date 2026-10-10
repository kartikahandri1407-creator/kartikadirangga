import { IS_ADMIN } from '../admin';
import React, { useState } from 'react';
import { JournalEntry } from '../data/portfolioData';
import { BookOpen, Plus, X, ArrowUpRight } from 'lucide-react';

interface JournalSectionProps {
  entries: JournalEntry[];
  onAddEntry: (entry: JournalEntry) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  entries,
  onAddEntry,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Catatan Inovasi & Pembelajaran');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTakeaway, setNewTakeaway] = useState('');

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const now = new Date();
    const months = [
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

    const created: JournalEntry = {
      id: `jurnal-${Date.now()}`,
      date: `${months[now.getMonth()]} ${now.getFullYear()}`,
      title: newTitle.trim(),
      topic: newTopic.trim() || 'Refleksi Inovasi ASN',
      readTime: '3 menit baca',
      isDraft: false,
      summary: newSummary.trim(),
      content: newContent
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean),
      keyTakeaway:
        newTakeaway.trim() ||
        'Setiap gagasan inovasi yang diuji memberikan pelajaran berharga tentang kebutuhan masyarakat.',
    };

    onAddEntry(created);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewTakeaway('');
    setShowAddModal(false);
  };

  return (
    <section id="journal" className="py-20 sm:py-24 border-t border-stone-200/80">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#141413] tracking-tight font-display"
              style={{ textWrap: 'balance' }}
            >
              Innovation Journal
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed text-justify">
              Ruang berbagi refleksi sebagai ASN dan pembelajar teknologi dalam menerjemahkan persoalan sehari-hari menjadi prototipe solusi yang bermanfaat.
            </p>
          </div>

          {IS_ADMIN && (
<button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-[#141413] hover:border-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>Tulis Catatan Baru</span>
          </button>
)}
        </div>

        {/* Journal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.map((entry, idx) => (
            <article
              key={entry.id}
              className="flex flex-col justify-between rounded-2xl bg-white border border-stone-200/85 p-6 transition-all duration-150 hover:border-[#FF5500]/60"
            >
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                  <span className="font-mono-tabular text-[#FF5500] font-bold">
                    0{idx + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[#141413] leading-snug mb-2.5 font-display">
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(entry)}
                    className="text-left hover:text-[#FF5500] transition-colors cursor-pointer"
                  >
                    {entry.title}
                  </button>
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-4 text-justify">
                  {entry.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-xs text-stone-500">{entry.readTime}</span>
                <button
                  type="button"
                  onClick={() => setSelectedEntry(entry)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5500] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Read Journal Entry Modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/75 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-orange-200 p-6 sm:p-8 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-orange-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#EA580C] font-medium mb-1.5">
                  <span>{selectedEntry.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedEntry.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedEntry.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
                  {selectedEntry.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="p-2 rounded-lg text-stone-500 hover:text-[#1C1917] hover:bg-orange-50 transition-colors cursor-pointer"
                aria-label="Tutup artikel jurnal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed text-justify">
              {selectedEntry.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[#FFF7ED] border border-orange-200 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EA580C] mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pesan Utama</span>
              </div>
              <p className="text-sm text-[#1C1917] font-editorial italic">
                &ldquo;{selectedEntry.keyTakeaway}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-orange-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 rounded-lg bg-[#EA580C] text-white text-xs font-semibold hover:bg-[#C2410C] transition-colors cursor-pointer"
              >
                Tutup Catatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Journal Entry Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/75 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl border border-orange-200 p-6 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-orange-100 mb-4">
              <h3 className="text-lg font-bold text-[#1C1917]">
                Tulis Catatan Innovation Journal
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Judul Catatan *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Merancang Alur Informasi Layanan yang Ramah Warga"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Topik Catatan
                </label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Ringkasan Singkat *
                </label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 p-3 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Isi Catatan Refleksi (Pisahkan paragraf dengan baris baru)
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 p-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Pesan Utama (Intisari)
                </label>
                <input
                  type="text"
                  value={newTakeaway}
                  onChange={(e) => setNewTakeaway(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="pt-3 border-t border-orange-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#EA580C] text-white text-xs font-semibold hover:bg-[#C2410C] cursor-pointer"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
