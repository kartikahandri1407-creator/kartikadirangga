export type ProjectStatus =
  | 'Prototype'
  | 'In Development'
  | 'Testing'
  | 'Concept'
  | 'Live';

export type ProjectCategory =
  | 'Tata Kelola & Integritas SDM'
  | 'Pemberdayaan & Pendampingan Perempuan'
  | 'Pelayanan Publik & Kecamatan'
  | 'Koperasi & Ekonomi Daerah';

export type MockupPreviewTheme =
  | 'jurai'
  | 'sahabat'
  | 'sikeling'
  | 'pamungkas'
  | 'puan'
  | 'visitbdl'
  | 'companion'
  | 'inclusion'
  | 'empowerment'
  | 'village';

export interface ProjectVisualAsset {
  assetType: 'mockup' | 'screenshot';
  captionLabel: string;
  imageUrl: string;
  previewTheme: MockupPreviewTheme;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  isVerified: boolean;
  verificationNote: string;
  lastUpdated: string;
  featured: boolean;
  summary: string;
  problemStatement: string;
  targetUsers: string;
  solutionConcept: string;
  implementedFeatures: string[];
  aiRole: string;
  developmentApproach: string;
  visualAsset: ProjectVisualAsset;
  demoUrl: string;
  futureImprovements: string[];
  lessonsAndNextSteps: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  topic: string;
  readTime: string;
  isDraft: boolean;
  summary: string;
  content: string[];
  keyTakeaway: string;
}

export interface CollaborationOption {
  id: string;
  title: string;
  description: string;
  exampleScope: string;
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  'Prototype',
  'In Development',
  'Testing',
  'Concept',
  'Live',
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Tata Kelola & Integritas SDM',
  'Pemberdayaan & Pendampingan Perempuan',
  'Pelayanan Publik & Kecamatan',
  'Koperasi & Ekonomi Daerah',
];

export const OWNER_PROFILE = {
  name: 'Kartika Dirangga',
  fullNameWithTitle: 'Kartika Dirangga, S.T., M.T.',
  monogram: 'KD',
  brandTitle: 'AI Innovation Portfolio',
  tagline: 'Ideas into Impact.',
  subheadline: 'Turning real-world problems into digital solutions with AI.',
  roles: [
    'Aparatur Sipil Negara (ASN)',
    'Digital Innovator',
    'AI Product & Prototype Creator',
  ],
  socials: {
    instagramHandle: '@kartikadirangga',
    instagramUrl: 'https://www.instagram.com/kartikadirangga/',
    linkedinLabel: 'Kartika Dirangga, S.T., M.T.',
    linkedinUrl:
      'https://www.linkedin.com/in/kartika-dirangga-st-mt-33b385405/',
    emailAddress: 'Dirangga73@gmail.com',
  },
  shortIntro:
    'Merancang dan mengembangkan prototipe aplikasi berbasis kecerdasan buatan (AI) yang lahir dari kepekaan melihat permasalahan nyata di sekitar kita. Bagi saya, teknologi terbaik adalah karya yang memiliki rasa, dirancang dengan penuh empati, dan terbuka untuk menjawab berbagai persoalan lintas bidang agar memberi manfaat nyata bagi sesama.',
  aboutNarrative: [
    'Sebagai seorang Aparatur Sipil Negara (ASN) sekaligus seorang ibu, saya setiap hari melihat langsung bagaimana kebijakan publik, pelayanan warga, dan dinamika kehidupan keluarga saling bersinggungan. Saya percaya bahwa sebuah gagasan inovasi akan jauh lebih mudah dipahami, diuji, dan dirasakan manfaatnya apabila diwujudkan ke dalam bentuk prototipe aplikasi yang nyata.',
    'Berangkat dari pengamatan masalah di lapangan, saya membangun enam prototipe aplikasi digital: JUR-AI untuk simulasi integritas dan risiko perilaku SDM, SahabatBaikmu dan PUAN AI untuk pendampingan perempuan Indonesia, SI KELING untuk pelayanan warga Kecamatan Kemiling, PAMUNGKAS untuk pemantauan sinyal kesehatan Koperasi Desa dan Kelurahan Merah Putih, serta Visit Bandar Lampung yang saat ini sedang dalam proses pengembangan.',
    'Seluruh karya di dalam portofolio ini disajikan secara transparan sebagai prototipe inovasi dan rancangan pengembangan. Setiap solusi menggabungkan kepekaan pelayanan publik dengan pemanfaatan teknologi AI yang terukur, bersih, dan akuntabel.',
  ],
  focusDomains: [
    {
      number: '01',
      title: 'Governance & Risk Intelligence',
      description:
        'Simulasi pengambilan keputusan strategis dan pemetaan integritas SDM aparatur maupun sektor jasa keuangan.',
    },
    {
      number: '02',
      title: 'Women Empowerment & Wellness',
      description:
        'Ruang pendampingan holistik berbasis AI untuk menjaga ketenangan batin, keseimbangan mental, dan kesehatan perempuan.',
    },
    {
      number: '03',
      title: 'Public Service & District Innovation',
      description:
        'Transformasi layanan informasi dan pengaduan warga tingkat kecamatan yang responsif serta terdata rapi.',
    },
    {
      number: '04',
      title: 'Cooperative & Regional Economy',
      description:
        'Pemantauan sinyal kesehatan koperasi desa secara berjenjang dan pengembangan ekosistem informasi pariwisata daerah.',
    },
  ],
};

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'jur-ai-ready',
    name: 'JUR-AI: Behavioral Risk Intelligence',
    category: 'Tata Kelola & Integritas SDM',
    status: 'Prototype',
    isVerified: true,
    verificationNote:
      'Prototipe Interaktif: Sistem Simulasi & Asesmen Risiko Perilaku (Behavioral Risk Intelligence).',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Prototipe platform asesmen dan simulasi risiko perilaku berbasis AI untuk memetakan integritas, pengambilan keputusan strategis, serta ketahanan terhadap tekanan operasional di sektor publik (OPD) dan jasa keuangan.',
    problemStatement:
      'Proses pemetaan integritas dan manajemen risiko perilaku SDM di lingkungan instansi pemerintah seperti BKPSDM dan BPKAD maupun sektor keuangan membutuhkan metode simulasi kasus nyata yang objektif, terukur, dan menjaga keaslian respons.',
    targetUsers:
      'Instansi sektor publik (BKPSDM, BPKAD, dan OPD lainnya), lembaga perbankan dan fintech, serta pengelola asesmen SDM dan kepatuhan tata kelola.',
    solutionConcept:
      'Menghadirkan prototipe simulasi interaktif bertahap yang menguji respons kandidat terhadap dilema strategis dan tekanan operasional, dievaluasi berdasarkan keselarasan prinsip Good Governance serta dilengkapi sensor integritas pengerjaan.',
    implementedFeatures: [
      'Kustomisasi profil asesmen berdasarkan sektor instansi (BKPSDM, BPKAD, OPD Umum, serta Perbankan dan Fintech) dan tingkat risiko.',
      'Simulasi skenario strategis bertingkat yang menguji rencana taktis sekaligus respons kandidat saat menghadapi eskalasi tekanan baru.',
      'Sensor Integritas Real-Time berupa deteksi perpindahan jendela (tab focus sensor) dan pencegahan salin-tempel (anti-copy-paste) selama sesi asesmen.',
      'Evaluasi analitik Behavioral Risk Intelligence berdasarkan keselarasan tindakan terhadap prinsip tata kelola yang baik.',
    ],
    aiRole:
      'Menghasilkan skenario tantangan kontekstual sesuai jabatan atau OPD target serta menganalisis kualitas argumen strategis, ketahanan tekanan, dan indikator risiko perilaku.',
    developmentApproach:
      'Menggabungkan kerangka kerja tata kelola dan manajemen risiko SDM dengan antarmuka simulasi asesmen yang presisi.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Prototipe JUR-AI Behavioral Risk Intelligence',
      imageUrl: '',
      previewTheme: 'jurai',
    },
    demoUrl: 'https://jur-ai-ready.vercel.app/',
    futureImprovements: [
      'Menambahkan modul ekspor laporan komparasi hasil simulasi untuk kebutuhan evaluasi internal.',
      'Memperluas variasi skenario khusus pelayanan publik dan pengelolaan keuangan daerah.',
    ],
    lessonsAndNextSteps:
      'Pemanfaatan AI dalam tata kelola SDM memungkinkan proses simulasi pengambilan keputusan dilakukan secara lebih kontekstual dan terukur.',
  },
  {
    id: 'sahabat-baikmu',
    name: 'SahabatBaikmu: Pendamping Holistik Pejuang Garis Dua',
    category: 'Pemberdayaan & Pendampingan Perempuan',
    status: 'Prototype',
    isVerified: true,
    verificationNote:
      'Prototipe Interaktif: Ruang Pendampingan Emosional, Holistik & Spiritual Program Hamil.',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Prototipe aplikasi pendamping holistik, emosional, dan spiritual berbasis AI yang dirancang khusus untuk menemani perempuan pejuang garis dua (program hamil) secara empatik dan menenangkan.',
    problemStatement:
      'Perjalanan menanti buah hati maupun masa penantian hasil (Two Week Wait) sering kali membawa tekanan emosional, rasa cemas, dan kelelahan batin yang membutuhkan ruang dukungan yang aman serta penuh pengertian.',
    targetUsers:
      'Perempuan dan pasangan pejuang garis dua yang membutuhkan teman cerita, pencatatan perjalanan promil, serta dukungan ketenangan batin sebagai pendamping non-klinis.',
    solutionConcept:
      'Menghadirkan ruang pendampingan terpadu yang memadukan Ruang Utama percakapan empatik, fitur Pelukan Darurat untuk latihan pernapasan penenang, Klinik Holistik, Ruang Spiritual, hingga Studio Kreasi Hati.',
    implementedFeatures: [
      'Fitur Pelukan Darurat: panduan latihan pernapasan interaktif beranimasi lembut untuk menenangkan diri saat cemas atau sedih.',
      'Klinik Holistik & Pembacaan Dokumen: ruang diskusi seputar masa subur, pola hidup sehat, serta bantuan memahami catatan hasil lab.',
      'Ruang Spiritual & Malaikat Kecil: pendamping doa, ketenangan batin, serta ruang pemulihan hati yang damai dan empatik.',
      'Studio Kreasi Hati & Arsip Perjalanan Promil: pembuatan kalimat afirmasi positif, puisi harapan, pertanyaan refleksi jurnal, serta fitur backup arsip pribadi.',
    ],
    aiRole:
      'Menjadi sahabat bicara yang hangat, membantu menjelaskan istilah pada catatan siklus atau lab secara sederhana, serta merangkai afirmasi positif dan doa penguat hati.',
    developmentApproach:
      'Mengusung desain antarmuka bertema ketenangan dengan alur interaksi yang lembut dan memprioritaskan kenyamanan psikologis pengguna.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Prototipe SahabatBaikmu Pendamping Pejuang Garis Dua',
      imageUrl: '',
      previewTheme: 'sahabat',
    },
    demoUrl: 'https://sahabatbaikmufinalbanget.vercel.app/',
    futureImprovements: [
      'Menambahkan kurasi panduan persiapan fisik dan mental bersama praktisi kesehatan ibu.',
      'Menyempurnakan fitur pencetakan kartu afirmasi dari Studio Kreasi Hati.',
    ],
    lessonsAndNextSteps:
      'Merancang aplikasi untuk kondisi emosional yang sensitif mengajarkan pentingnya pemilihan setiap kata, warna, dan ritme interaksi agar pengguna merasa ditemani.',
  },
  {
    id: 'si-keling-kemiling',
    name: 'SI KELING: Pelayanan Kecamatan Kemiling',
    category: 'Pelayanan Publik & Kecamatan',
    status: 'Prototype',
    isVerified: true,
    verificationNote:
      'Prototipe Interaktif: Sistem Informasi dan Konsultasi Pelayanan Kecamatan Kemiling, Kota Bandar Lampung.',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Prototipe Sistem Informasi dan Konsultasi Pelayanan Kemiling. Asisten digital pelayanan warga Kecamatan Kemiling, Kota Bandar Lampung yang memadukan konsultasi AI dengan dasbor manajemen pengaduan terpadu.',
    problemStatement:
      'Warga sering kali membutuhkan kejelasan informasi persyaratan administrasi kecamatan di luar jam kerja atau ingin menyampaikan pertanyaan serta pengaduan layanan secara cepat tanpa harus berulang kali datang ke kantor kecamatan.',
    targetUsers:
      'Warga Kecamatan Kemiling, Kota Bandar Lampung serta petugas Seksi Pelayanan Umum Kecamatan.',
    solutionConcept:
      'Menghadirkan prototipe layanan dua arah berupa antarmuka konsultasi interaktif berbasis AI bagi warga untuk bertanya dan melapor lengkap dengan lampiran bukti foto, serta Sistem Manajemen Laporan bagi petugas untuk menindaklanjuti dan mencetak rekapitulasi laporan.',
    implementedFeatures: [
      'Asisten digital konsultasi pelayanan warga Kecamatan Kemiling secara interaktif.',
      'Fitur pelaporan warga terstruktur berdasarkan kategori Aspek Pertanyaan dan Aspek Pengaduan disertai unggah bukti foto.',
      'Dasbor Sistem Manajemen Laporan berproteksi PIN bagi petugas untuk memperbarui status tindak lanjut dan catatan.',
      'Fitur ekspor rekapitulasi laporan siap cetak serta pencadangan dan pemulihan data (JSON).',
    ],
    aiRole:
      'Berperan sebagai asisten layanan informasi garda depan yang menjawab pertanyaan warga mengenai prosedur administrasi kecamatan secara ramah, cepat, dan terstruktur.',
    developmentApproach:
      'Dirancang sebagai prototipe inovasi pelayanan publik tingkat kecamatan yang menyatukan kemudahan akses warga lewat ponsel dengan kerapian arsip laporan petugas.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Prototipe SI KELING Kecamatan Kemiling (Laptop & Mobile)',
      imageUrl: '',
      previewTheme: 'sikeling',
    },
    demoUrl: 'https://si-keling-kecamatan-kemiling.vercel.app/',
    futureImprovements: [
      'Validasi dan sinkronisasi standar operasional prosedur (SOP) bersama seluruh kelurahan di Kecamatan Kemiling.',
      'Penambahan fitur notifikasi status tindak lanjut laporan langsung ke perangkat warga.',
    ],
    lessonsAndNextSteps:
      'Prototipe pelayanan kecamatan harus mengutamakan antarmuka yang langsung mudah digunakan warga dari berbagai kelompok usia.',
  },
  {
    id: 'pamungkas-koperasi',
    name: 'PAMUNGKAS: Pemantauan Koperasi Desa Merah Putih',
    category: 'Koperasi & Ekonomi Daerah',
    status: 'Prototype',
    isVerified: true,
    verificationNote:
      'Prototipe Interaktif: Sistem Ekstraksi Sinyal AI dan Pengawasan Koperasi Desa dan Kelurahan Merah Putih (KDKMP).',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Prototipe sistem pengawasan berjenjang dan ekstraksi sinyal risiko berbasis AI untuk memantau kesehatan Koperasi Desa dan Kelurahan Merah Putih (KDKMP) secara cepat dan terukur.',
    problemStatement:
      'Pengawasan kondisi kesehatan dan kendala operasional koperasi di tingkat desa atau kelurahan sering kali terlambat terdeteksi karena laporan lapangan masih berbentuk narasi tidak terstruktur dan tersebar di berbagai jenjang wilayah.',
    targetUsers:
      'Pengurus Koperasi, Kader Kecamatan, Dinas Koperasi Kabupaten dan Provinsi, hingga pemangku kepentingan tingkat Pusat.',
    solutionConcept:
      'Membangun mesin ekstraksi sinyal berbasis AI Gemini yang mengubah laporan kondisi lapangan menjadi prediksi status kesehatan koperasi, tingkat urgensi, dan kategori kendala, dilengkapi dasbor pengawasan berjenjang serta peta sebaran wilayah.',
    implementedFeatures: [
      'Mesin Ekstraksi Sinyal AI untuk merangkum laporan lapangan menjadi prediksi status koperasi, level urgensi, dan kategori kendala secara otomatis.',
      'Dasbor Pengawasan Multi-Peran berjenjang untuk Pemerintah Pusat, Dinas Provinsi, Dinas Kabupaten, Kader Kecamatan, dan Pengurus Koperasi.',
      'Peta Sebaran dan Status Koperasi interaktif disertai indikator kesehatan koperasi terkini.',
      'Rekomendasi intervensi otomatis bagi dinas seperti penjadwalan kunjungan awal, permintaan klarifikasi laporan, atau pembinaan terarah.',
    ],
    aiRole:
      'Mengekstrak sinyal risiko dan merangkum inti permasalahan dari laporan teks pengurus maupun masyarakat menjadi indikator keputusan yang siap ditindaklanjuti oleh dinas pembina.',
    developmentApproach:
      'Dirancang dengan arsitektur tata kelola berjenjang untuk menjembatani pelaporan akar rumput di desa dengan pengawasan strategis pemerintah.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Prototipe PAMUNGKAS Pengawasan Koperasi Desa Merah Putih',
      imageUrl: '',
      previewTheme: 'pamungkas',
    },
    demoUrl: 'https://pamungkas-sandy.vercel.app/',
    futureImprovements: [
      'Uji coba skenario pelaporan berjenjang bersama kader kecamatan dan pengurus koperasi percontohan.',
      'Penambahan fitur ekspor laporan analitik berkala per wilayah kabupaten dan kota.',
    ],
    lessonsAndNextSteps:
      'Mengubah laporan naratif menjadi sinyal terstruktur dengan AI sangat membantu instansi pembina dalam menentukan prioritas pendampingan koperasi secara tepat sasaran.',
  },
  {
    id: 'puan-ai',
    name: 'PUAN AI: Teman Harian Cerdas Perempuan Indonesia',
    category: 'Pemberdayaan & Pendampingan Perempuan',
    status: 'Prototype',
    isVerified: true,
    verificationNote:
      'Prototipe Interaktif: Platform 4 Pilar Kesejahteraan Perempuan Berbasis Generative AI.',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Prototipe asisten pribadi berbasis Generative AI yang mendampingi perempuan Indonesia menjaga keseimbangan fisik, mental, finansial, dan hati melalui 4 Pilar Kesejahteraan dengan prinsip Zero-Retention Privacy.',
    problemStatement:
      'Menghadapi beban ganda antara tuntutan pekerjaan profesional dan tanggung jawab domestik, banyak perempuan Indonesia mengalami kelelahan mental serta keterbatasan akses pada pendampingan kesehatan dan literasi keuangan rumah tangga yang privat.',
    targetUsers:
      'Perempuan pekerja, ASN perempuan, ibu rumah tangga, dan perempuan Indonesia yang membutuhkan ruang pendampingan harian yang aman.',
    solutionConcept:
      'Menyediakan satu prototipe platform komprehensif yang mencakup empat dimensi hidup perempuan (4 Pilar PUAN) ditambah ruang percakapan interaktif setiap saat yang menjaga privasi pengguna.',
    implementedFeatures: [
      'Pilar 01 Kenali Diri: Analisis siklus hormonal dan mood harian untuk memprediksi tingkat energi serta suasana hati.',
      'Pilar 02 Atur Hidup: Kalkulator dan rekomendasi pengelolaan keuangan rumah tangga praktis dengan metode 50-30-20 serta tips menabung.',
      'Pilar 03 Jaga Tubuh: Rekomendasi menu sehat hemat dan ramuan tanaman obat keluarga (TOGA) sesuai keluhan fisik.',
      'Pilar 04 Jurnal Malam & Ruang Ngobrol: Refleksi berbasis analisis sentimen untuk mendeteksi gejala burnout disertai informasi rujukan resmi (119 ext 8).',
    ],
    aiRole:
      'Memberikan analisis prediktif energi harian, menyusun rekomendasi anggaran keluarga yang realistis, meramu saran nutrisi dan herbal lokal, serta menjadi teman bicara empatik.',
    developmentApproach:
      'Dirancang dari perspektif empati sesama perempuan dan ibu dengan menggabungkan antarmuka yang menenangkan serta prinsip perlindungan privasi.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Prototipe PUAN AI 4 Pilar Kesejahteraan Perempuan',
      imageUrl: '',
      previewTheme: 'puan',
    },
    demoUrl: 'https://puan-ai.netlify.app/',
    futureImprovements: [
      'Pengujian alur 4 pilar bersama komunitas perempuan dan kelompok ibu bekerja.',
      'Penambahan pustaka edukasi gizi keluarga berbasis bahan pangan lokal.',
    ],
    lessonsAndNextSteps:
      'Ketika teknologi dirancang dengan memahami beban nyata perempuan sehari-hari, AI dapat menjadi alat bantu pendampingan awal yang hangat dan memberdayakan.',
  },
  {
    id: 'visit-bandar-lampung',
    name: 'Visit Bandar Lampung: Smart Tourism Portal',
    category: 'Koperasi & Ekonomi Daerah',
    status: 'In Development',
    isVerified: true,
    verificationNote:
      'Dalam Proses Pengembangan (In Development): Prototipe awal sudah dapat diakses, namun pengisian data dan penyempurnaan fitur masih terus berjalan.',
    lastUpdated: '2026',
    featured: true,
    summary:
      'Rancangan platform informasi, direktori wisata, pemandu AI, dan sistem pelaporan destinasi pariwisata, akomodasi, kuliner, serta MICE Kota Bandar Lampung yang saat ini masih dalam proses pengembangan.',
    problemStatement:
      'Wisatawan maupun pengelola daerah membutuhkan pusat informasi modern yang tidak hanya menampilkan titik wisata, tetapi juga memetakan ekosistem pendukung seperti perhotelan, kuliner khas, dan fasilitas pertemuan (MICE) beserta pelaporannya.',
    targetUsers:
      'Wisatawan, pelaku usaha pariwisata dan UMKM kuliner, serta pengelola informasi kepariwisataan Kota Bandar Lampung.',
    solutionConcept:
      'Membangun prototipe portal pariwisata yang menggabungkan katalog destinasi (seperti Puncak Mas, Lembah Hijau, Pantai Mutun, Air Terjun Batu Putuk, Taman Hutan Kera), direktori Akomodasi, Kuliner & MICE, asisten Tour Guide Chat berbasis AI, serta modul cetak laporan destinasi.',
    implementedFeatures: [
      'Kerangka direktori destinasi wisata Kota Bandar Lampung disertai titik koordinat lokasi, jam operasional, dan tips pengunjung.',
      'Halaman katalog Akomodasi, Kuliner khas, dan venue MICE.',
      'Prototipe awal fitur Tour Guide Chat berbasis AI dan format cetak laporan destinasi (Print Destination Report).',
    ],
    aiRole:
      'Dirancang sebagai pemandu wisata digital pintar (AI Tour Guide) yang membantu memberikan informasi destinasi dan rekomendasi kunjungan.',
    developmentApproach:
      'Sedang dikembangkan secara bertahap dengan fokus pada kelengkapan basis data destinasi lokal dan kemudahan pencetakan profil wisata.',
    visualAsset: {
      assetType: 'screenshot',
      captionLabel:
        'Tampilan Layar Pengembangan Visit Bandar Lampung (In Development)',
      imageUrl: '',
      previewTheme: 'visitbdl',
    },
    demoUrl: 'https://destinasiwisatakotabandarlampung.vercel.app/',
    futureImprovements: [
      'Menyelesaikan pengisian data lengkap untuk seluruh kategori destinasi, akomodasi, dan kuliner.',
      'Menyempurnakan akurasi respons asisten AI Tour Guide dan tata letak laporan cetak.',
      'Melakukan uji coba menyeluruh sebelum memasuki tahap rilis penuh.',
    ],
    lessonsAndNextSteps:
      'Proyek ini masih berada dalam proses pengembangan aktif. Langkah berikutnya adalah melengkapi konten direktori dan memvalidasi seluruh fitur pelaporan.',
  },
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'jurnal-1',
    date: 'Oktober 2026',
    title: 'Pentingnya Transparansi Status Prototype bagi Inovator ASN',
    topic: 'Etika & Akuntabilitas',
    readTime: '3 menit baca',
    isDraft: false,
    summary:
      'Menjaga akuntabilitas karya inovasi dengan membedakan secara jelas antara purwarupa (prototype) yang siap diuji coba dengan sistem resmi yang telah selesai.',
    content: [
      'Sebagai seorang ASN yang merancang solusi digital, pertanyaan yang sering muncul adalah bagaimana cara terbaik menampilkan karya aplikasi yang kita bangun secara mandiri agar tetap aman, etis, dan profesional.',
      'Jawabannya terletak pada kejujuran pelabelan status karya. Ketika kita mencantumkan status Prototype (Purwarupa Interaktif) atau In Development (Masih Dalam Proses Pengembangan), kita sedang menunjukkan integritas yang tinggi. Pengunjung, rekan kerja, maupun penguji inovasi tetap dapat membuka tautan aplikasi kita dan mencoba langsung fiturnya, sambil memahami bahwa karya tersebut adalah purwarupa inovasi yang terbuka untuk disempurnakan lebih lanjut.',
      'Dengan cara ini, portofolio kita tidak hanya terlihat modern dan memikat, tetapi juga sepenuhnya aman dan akuntabel.',
    ],
    keyTakeaway:
      'Transparansi status prototipe meningkatkan kredibilitas dan membuka ruang kolaborasi yang lebih luas.',
  },
  {
    id: 'jurnal-2',
    date: 'Oktober 2026',
    title: 'Empati Perempuan dalam Teknologi: Melahirkan SahabatBaikmu dan PUAN AI',
    topic: 'Pemberdayaan Perempuan',
    readTime: '3 menit baca',
    isDraft: false,
    summary:
      'Bagaimana pengalaman sebagai perempuan dan ibu menginspirasi hadirnya sahabat bagi pejuang garis dua serta ruang pendampingan kesejahteraan harian.',
    content: [
      'Di samping inovasi tata kelola publik seperti JUR-AI, hati saya selalu tergerak untuk menghadirkan solusi digital yang merangkul kebutuhan emosional dan kesejahteraan perempuan Indonesia.',
      'Melalui SahabatBaikmu, saya menghadirkan ruang yang tenang, hangat, dan penuh doa bagi para perempuan pejuang garis dua (program hamil), lengkap dengan fitur Pelukan Darurat, Klinik Holistik, dan Studio Kreasi Hati.',
      'Sementara melalui prototipe PUAN AI, saya merancang 4 Pilar Kesejahteraan untuk membantu perempuan menghadapi beban ganda, mulai dari mengenali siklus energi, mengatur keuangan rumah tangga, merawat tubuh dengan herbal lokal, hingga refleksi Jurnal Malam.',
    ],
    keyTakeaway:
      'Inovasi yang dirancang dengan ketulusan hati mampu menghadirkan ketenangan bagi mereka yang sedang berjuang.',
  },
  {
    id: 'jurnal-3',
    date: 'Oktober 2026',
    title: 'Merancang Solusi untuk Daerah: SI KELING, PAMUNGKAS, dan Visit Bandar Lampung',
    topic: 'Inovasi Pelayanan & Daerah',
    readTime: '4 menit baca',
    isDraft: false,
    summary:
      'Cerita di balik pembuatan prototipe pelayanan Kecamatan Kemiling, pemantauan Koperasi Desa Merah Putih, dan portal wisata Kota Bandar Lampung.',
    content: [
      'Tiga karya di dalam portofolio ini berangkat langsung dari pengamatan terhadap kebutuhan tata kelola pemerintahan dan potensi daerah. SI KELING lahir untuk menjembatani konsultasi layanan serta pengaduan warga di Kecamatan Kemiling secara responsif.',
      'Sementara itu, PAMUNGKAS saya rancang sebagai prototipe ekstraksi sinyal berbasis AI untuk membantu memetakan kondisi kesehatan Koperasi Desa dan Kelurahan Merah Putih secara berjenjang, mulai dari tingkat pengurus desa hingga dinas pembina.',
      'Adapun Visit Bandar Lampung saat ini terus saya kembangkan secara bertahap agar nantinya dapat menjadi referensi destinasi wisata, kuliner, dan MICE yang komprehensif.',
    ],
    keyTakeaway:
      'Teknologi AI memberikan nilai tambah terbesar ketika diarahkan untuk mempermudah koordinasi pelayanan dan pemberdayaan ekonomi di tingkat akar rumput.',
  },
];

export const COLLABORATION_OPTIONS: CollaborationOption[] = [
  {
    id: 'pelayanan-publik',
    title: 'Inovasi pelayanan publik & daerah',
    description:
      'Perancangan prototipe aplikasi layanan warga, sistem informasi kecamatan dan OPD, serta pemantauan program daerah seperti SI KELING dan PAMUNGKAS.',
    exampleScope:
      'Purwarupa layanan warga, sistem manajemen pengaduan, dan dasbor pemantauan program.',
  },
  {
    id: 'inovasi-ai',
    title: 'Kolaborasi solusi berbasis AI',
    description:
      'Eksplorasi pemanfaatan kecerdasan buatan untuk menjawab permasalahan spesifik di sektor pemerintahan, manajemen SDM, maupun edukasi masyarakat.',
    exampleScope:
      'Perancangan asisten AI layanan publik, simulasi asesmen seperti JUR-AI, dan validasi konsep.',
  },
  {
    id: 'pengembangan-prototype',
    title: 'Pengembangan prototipe aplikasi',
    description:
      'Menerjemahkan gagasan inovasi atau rancangan aksi perubahan menjadi prototipe aplikasi web interaktif yang modern, bersih, dan siap diuji coba.',
    exampleScope:
      'Desain alur pengalaman pengguna (UX), pembuatan purwarupa fungsional, dan simulasi produk.',
  },
  {
    id: 'kompetisi-sosial',
    title: 'Kompetisi inovasi & pemberdayaan perempuan',
    description:
      'Sinergi untuk ajang kompetisi inovasi pelayanan publik maupun program pemberdayaan perempuan dan keluarga seperti SahabatBaikmu dan PUAN AI.',
    exampleScope:
      'Perumusan karya inovasi unggulan, demonstrasi prototipe aktif, dan dokumentasi solusi.',
  },
  {
    id: 'diskusi-pembelajaran',
    title: 'Diskusi & berbagi pembelajaran ASN',
    description:
      'Berbagi pengalaman praktis tentang bagaimana ASN dapat merancang prototipe aplikasi yang menjawab persoalan di unit kerja dan masyarakat.',
    exampleScope:
      'Sesi berbagi inspirasi inovasi ASN, literasi AI terapan, dan kolaborasi lintas instansi.',
  },
];
