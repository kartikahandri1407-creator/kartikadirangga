import React, { useState, useEffect } from 'react';
import {
  COLLABORATION_OPTIONS,
  OWNER_PROFILE,
} from '../data/portfolioData';
import {
  Check,
  Copy,
  Mail,
  Trash2,
  ArrowUpRight,
  Send,
  Phone,
  Inbox,
} from 'lucide-react';

interface CollaborationMessageItem {
  id: string;
  createdAt: string;
  topicTitle: string;
  senderName: string;
  senderOrg: string;
  senderContact: string;
  message: string;
}

const STORAGE_KEY_COLLAB_MESSAGES = 'kd_ai_portfolio_collab_messages_v1';

export const CollaborationSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    COLLABORATION_OPTIONS[0].id
  );
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<CollaborationMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLAB_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore
    }
    return [];
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_COLLAB_MESSAGES,
        JSON.stringify(messages)
      );
    } catch {
      // Ignore
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderContact.trim() || !message.trim()) return;

    const topicObj =
      COLLABORATION_OPTIONS.find((item) => item.id === selectedTopicId) ||
      COLLABORATION_OPTIONS[0];

    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newItem: CollaborationMessageItem = {
      id: `msg-${Date.now()}`,
      createdAt: formattedDate,
      topicTitle: topicObj.title,
      senderName: senderName.trim(),
      senderOrg: senderOrg.trim(),
      senderContact: senderContact.trim(),
      message: message.trim(),
    };

    setMessages((prev) => [newItem, ...prev]);
    setSenderName('');
    setSenderOrg('');
    setSenderContact('');
    setMessage('');
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyMessage = (item: CollaborationMessageItem) => {
    const text = [
      `Pesan Kolaborasi untuk ${OWNER_PROFILE.fullNameWithTitle}`,
      `Topik: ${item.topicTitle}`,
      `Dari: ${item.senderName}${item.senderOrg ? ` (${item.senderOrg})` : ''}`,
      `Kontak Pengirim (Email/WA): ${item.senderContact}`,
      `Pesan: ${item.message}`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMailtoLink = (item: CollaborationMessageItem) => {
    const subject = encodeURIComponent(
      `Kolaborasi: ${item.topicTitle} - ${item.senderName}`
    );
    const body = encodeURIComponent(
      [
        `Yth. Ibu ${OWNER_PROFILE.fullNameWithTitle},`,
        '',
        `Nama Pengirim: ${item.senderName}${
          item.senderOrg ? ` (${item.senderOrg})` : ''
        }`,
        `Kontak (Email / WhatsApp): ${item.senderContact}`,
        `Topik Kolaborasi: ${item.topicTitle}`,
        '',
        'Pesan Singkat:',
        item.message,
      ].join('\n')
    );
    return `mailto:${OWNER_PROFILE.socials.emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="collaborate"
      className="py-16 sm:py-20 border-t border-stone-200/80 bg-white"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Official Channels & Compact Scope List */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#141413] tracking-tight font-display"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s Collaborate
              </h2>
              <p className="text-sm text-stone-600 mt-2.5 leading-relaxed text-justify">
                Terbuka untuk bersinergi dalam inovasi pelayanan publik, perancangan prototipe solusi berbasis AI, kompetisi inovasi, maupun sesi berbagi pembelajaran ASN. Hubungi melalui kanal resmi atau tinggalkan pesan beserta kontak Anda.
              </p>
            </div>

            {/* Official Contact Cards */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-stone-500 block">
                Kanal Resmi:
              </span>

              <a
                href={`mailto:${OWNER_PROFILE.socials.emailAddress}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#FF5500] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FF5500] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      Email Resmi
                    </div>
                    <div className="text-xs font-bold text-[#141413] group-hover:text-[#FF5500] transition-colors">
                      {OWNER_PROFILE.socials.emailAddress}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#FF5500]" />
              </a>

              <a
                href={OWNER_PROFILE.socials.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#FF5500] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    in
                  </span>
                  <div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      LinkedIn
                    </div>
                    <div className="text-xs font-bold text-[#141413] group-hover:text-[#FF5500] transition-colors">
                      {OWNER_PROFILE.fullNameWithTitle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#FF5500]" />
              </a>

              <a
                href={OWNER_PROFILE.socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#FF5500] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF5500] to-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    IG
                  </span>
                  <div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      Instagram
                    </div>
                    <div className="text-xs font-bold text-[#141413] group-hover:text-[#FF5500] transition-colors">
                      {OWNER_PROFILE.socials.instagramHandle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#FF5500]" />
              </a>
            </div>
          </div>

          {/* Right Column: Sleek Compact Form + Compact Message Cards with Delete Button */}
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-2xl bg-[#FAF8F5] border border-stone-200/90 p-5 sm:p-6">
              <h3 className="text-base font-bold text-[#141413] font-display">
                Tinggalkan Pesan & Kontak Kolaborasi
              </h3>
              <p className="text-xs text-stone-600 mt-0.5 text-justify">
                Silakan isi nama, nomor WhatsApp atau email Anda, beserta topik yang ingin didiskusikan.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#141413] mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#141413] focus:border-[#FF5500] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141413] mb-1">
                      Instansi atau Komunitas
                    </label>
                    <input
                      type="text"
                      value={senderOrg}
                      onChange={(e) => setSenderOrg(e.target.value)}
                      placeholder="Unit kerja atau komunitas"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#141413] focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#141413] mb-1">
                      Email atau Nomor WhatsApp Anda *
                    </label>
                    <input
                      type="text"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      placeholder="Contoh: 0812xxxx atau nama@email.com"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#141413] focus:border-[#FF5500] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#141413] mb-1">
                      Topik Kolaborasi
                    </label>
                    <select
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#141413] focus:border-[#FF5500] focus:outline-none"
                    >
                      {COLLABORATION_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141413] mb-1">
                    Pesan Singkat *
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan gagasan atau ajakan diskusi Anda secara singkat..."
                    className="w-full rounded-xl border border-stone-200 bg-white p-3 text-xs sm:text-sm text-[#141413] focus:border-[#FF5500] focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FF5500] hover:bg-[#E04800] text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simpan & Buat Kartu Pesan</span>
                </button>
              </form>
            </div>

            {/* Compact Saved Collaboration Cards with Delete Action */}
            {messages.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141413]">
                    <Inbox className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Daftar Pesan Kolaborasi ({messages.length})</span>
                  </span>
                  {messages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      className="text-[11px] font-semibold text-stone-400 hover:text-red-600 cursor-pointer"
                    >
                      Hapus Semua
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  {messages.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-white border border-stone-200/90 p-4 shadow-2xs transition-colors hover:border-[#FF5500]/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="font-bold text-[#141413]">
                              {item.senderName}
                            </span>
                            {item.senderOrg && (
                              <span className="text-stone-500">
                                · {item.senderOrg}
                              </span>
                            )}
                            <span className="text-stone-400">·</span>
                            <span className="text-[11px] font-semibold text-[#FF5500]">
                              {item.topicTitle}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-600 font-medium">
                            <Phone className="w-3 h-3 text-[#FF5500]" />
                            <span>Kontak: {item.senderContact}</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-400">
                              {item.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(item.id)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="Hapus pesan ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>

                      <p className="text-xs text-stone-700 mt-2.5 leading-relaxed text-justify bg-[#FAF8F5] rounded-lg px-3 py-2 border border-stone-200/60">
                        {item.message}
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] font-semibold text-stone-700 hover:border-[#FF5500] cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#FF5500]" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>

                        <a
                          href={getMailtoLink(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF5500] hover:bg-[#E04800] text-white text-[11px] font-semibold transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Teruskan ke Email</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
