export interface CaseItem {
  id: string;
  title: string;
  tags: string[];
  url: string;
  themeBg: string;
  themeFg: string;
  accent: string;
  eyebrow: string;
  summary: string;
  metrics: { label: string; value: string }[];
  visualKind: 'focuslearn' | 'bookin' | 'umkm' | 'gdgoc';
}

export interface MoreProjectItem {
  id: string;
  title: string;
  tags: string[];
  url: string;
  subtitle: string;
  detail: string;
  tint: string;
  ink: string;
}

export const PERSONAL_INFO = {
  fullName: 'M Zidan Ramadhan',
  firstName: 'Zidan',
  lastName: 'Ramadhan',
  roleLines: ['Web &', 'Mobile Dev'],
  bio: 'Web & Mobile developer specialised in websites & mobile apps',
  aboutBio:
    'Management Informatics undergraduate at Politeknik Negeri Sriwijaya (GPA 3.75 / 4.00) crafting clean interfaces, responsive web applications, and native Android experiences. Partnering with student developer communities at Google Developer Groups on Campus (GDGoC) to maintain web infrastructure and translate product requirements into high-performance builds backed by React, Next.js, Kotlin, and Firebase.',
  footerInfo:
    'Available for software engineering internships, junior full-stack or mobile developer roles, and collaborative web projects in Palembang or remotely.',
  email: 'zidanramadhan2606@gmail.com',
  whatsappUrl: 'https://wa.me/6288274331446',
  githubUrl: 'https://github.com/zidanramadhan2606robot',
  linkedinUrl: 'https://linkedin.com/in/zidanramadhan',
  location: 'Palembang, Indonesia',
  timezone: 'Asia/Jakarta',
  timezoneLabel: 'WIB',
};

export const FEATURED_CASES: CaseItem[] = [
  {
    id: 'focuslearn',
    title: 'FocusLearn',
    tags: ['Development', 'Next.js', 'Firebase'],
    url: 'https://github.com/zidanramadhan2606robot',
    themeBg: '#eae8e0',
    themeFg: '#1b3b2b',
    accent: '#1b3b2b',
    eyebrow: 'SSR Study Workspace',
    summary: 'Distraction-free web learning workspace with server-side rendering & Firestore real-time session sync.',
    metrics: [
      { label: 'Render', value: 'Next.js SSR' },
      { label: 'Database', value: 'Firestore Realtime' },
      { label: 'Auth', value: 'Firebase OAuth' },
    ],
    visualKind: 'focuslearn',
  },
  {
    id: 'bookin',
    title: 'Bookin',
    tags: ['Mobile App', 'Kotlin', 'Firestore'],
    url: 'https://github.com/zidanramadhan2606robot',
    themeBg: '#e1eae4',
    themeFg: '#143022',
    accent: '#c86d51',
    eyebrow: 'Android Native Client',
    summary: 'Native Android textbook marketplace & campus book exchange built with Kotlin, Java, and Firestore.',
    metrics: [
      { label: 'Platform', value: 'Android SDK' },
      { label: 'Language', value: 'Kotlin / Java' },
      { label: 'Storage', value: 'Cloud Firestore' },
    ],
    visualKind: 'bookin',
  },
  {
    id: 'umkm-platform',
    title: 'UMKM Web Platform',
    tags: ['Frontend', 'HTML5 & CSS3', 'Figma'],
    url: 'https://github.com/zidanramadhan2606robot',
    themeBg: '#efe5dc',
    themeFg: '#4a2016',
    accent: '#c86d51',
    eyebrow: 'Local Commerce Portal',
    summary: 'High-speed semantic digital storefront empowering local MSMEs with responsive catalogs and brand assets.',
    metrics: [
      { label: 'Markup', value: 'Semantic HTML5' },
      { label: 'Layout', value: 'CSS Grid / Flex' },
      { label: 'Design', value: 'Figma & PS' },
    ],
    visualKind: 'umkm',
  },
  {
    id: 'gdgoc-portal',
    title: 'GDGoC Campus Portal',
    tags: ['Web Infrastructure', 'Maintainer', 'Polsri'],
    url: 'https://github.com/zidanramadhan2606robot',
    themeBg: '#1a1917',
    themeFg: '#e6dfd5',
    accent: '#c86d51',
    eyebrow: 'Developer Community Hub',
    summary: 'Event listings and technical workshop web infrastructure for Google Developer Groups on Campus Polsri.',
    metrics: [
      { label: 'Chapter', value: 'GDGoC Polsri' },
      { label: 'Role', value: 'Web Maintainer' },
      { label: 'Stack', value: 'React / TS' },
    ],
    visualKind: 'gdgoc',
  },
];

export const MORE_PROJECTS: MoreProjectItem[] = [
  {
    id: 'focuslearn-auth',
    title: 'FocusLearn Auth & Sync',
    tags: ['Next.js', 'Firebase Auth', 'SSR'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Multi-session persistent state sync & server routing',
    detail: 'TypeScript • Firestore • Tailwind CSS',
    tint: '#eae8e0',
    ink: '#1b3b2b',
  },
  {
    id: 'bookin-engine',
    title: 'Bookin Reservation Engine',
    tags: ['Kotlin', 'Cloud Firestore', 'Android'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Low-latency Android CRUD queries & offline caching',
    detail: 'Kotlin • Java • Android SDK',
    tint: '#e1eae4',
    ink: '#143022',
  },
  {
    id: 'umkm-catalog',
    title: 'UMKM Responsive Catalog',
    tags: ['HTML5 & CSS3', 'JavaScript', 'UI Design'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Zero-bloat responsive product grid & brand kit',
    detail: 'W3C Semantic • Figma • Photoshop',
    tint: '#efe5dc',
    ink: '#4a2016',
  },
  {
    id: 'gdgoc-hub',
    title: 'GDGoC Event Hub',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Workshop schedules & technical chapter updates',
    detail: 'Politeknik Negeri Sriwijaya',
    tint: '#1a1917',
    ink: '#e6dfd5',
  },
  {
    id: 'cert-html-css',
    title: 'HTML & CSS Full Course',
    tags: ['Certification', 'SuperSimpleDev', '2025'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Web architecture, layout grids & accessibility',
    detail: 'Verified Coursework Completion',
    tint: '#e8ece6',
    ink: '#1b3b2b',
  },
  {
    id: 'cert-c-prog',
    title: 'Programming with C',
    tags: ['Certification', 'Dicoding Indonesia', '2025'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Memory structures, control flow & systems logic',
    detail: 'Computer Science Fundamentals',
    tint: '#efe5dc',
    ink: '#4a2016',
  },
  {
    id: 'seminar-ai',
    title: 'Applied AI Systems',
    tags: ['Seminar', 'Polsri', '2025'],
    url: 'https://github.com/zidanramadhan2606robot',
    subtitle: 'Politeknik Negeri Sriwijaya emerging tech symposium',
    detail: 'GPA 3.75 / 4.00 Honours Track',
    tint: '#f6f5f0',
    ink: '#141413',
  },
];

export const SERVICE_PANEL_2_SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'HTML5 & CSS3',
  'Figma',
  'Photoshop',
];

export const SERVICE_PANEL_4_SKILLS = [
  'Kotlin',
  'Java',
  'Android SDK',
  'Firebase Auth',
  'Firestore',
  'C Language',
  'Git & GitHub',
];
