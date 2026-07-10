/* ─────────────────────────────────────────────────────────────
   SITE CONFIG
   Single source of truth for site-wide settings.
   Edit this file to customize the portfolio.
───────────────────────────────────────────────────────────── */

export const SITE = {
  name:        'Charles Liu',
  role:        'researcher',
  taglines: [
    'cryptography',
    'student researcher',
    `birdwatching enthusiast`,
    'computer science & math',
    'chess player',
    `post-quantum cryptography`,
    `software engineer`,
    `zero-knowledge proofs`,
    `tennis player`,
    `fully-homomorphic encryption`,
  ] as const,
  description: 'Undergraduate student in computer science and mathematics studying zero-knowledge proofs, cryptographic protocols, and the foundations of theoretical computer science.',
  institution: 'Washington State University',
  email:       'charles.liu@wsu.edu',
  github:      'https://github.com/charlesliucool',
  github_name: 'charlesliucool',
  youtube:     'https://www.youtube.com/@CharlesLiu-l3m',
  youtube_name: 'CharlesLiu-l3m',
  status:      'open to collaboration',
} as const;

// ── Navigation ──────────────────────────────────────────────
export const NAV = [
  {
    label: 'MAIN',
    items: [
      { href: '/',      label: 'Home',     icon: '⌂' },
      { href: '/about', label: 'About',    icon: '◈' },
      { href: '/cv',    label: 'CV',       icon: '▤' },
    ],
  },
  {
    label: 'WORK',
    items: [
      { href: '/research', label: 'Research', icon: '◉' },
      { href: '/projects', label: 'Projects', icon: '⬡' },
    ],
  },
  {
    label: 'WRITING',
    items: [
      { href: '/notes', label: 'Notes', icon: '◧' },
      { href: '/blog',  label: 'Blog',  icon: '◳' },
      { href: '/tags',  label: 'Tags',  icon: '#' },
    ],
  },
] as const;

// ── Collection themes ────────────────────────────────────────
// Controls accent colors for each content type throughout the site.
export type Accent = 'purple' | 'cyan' | 'green' | 'amber' | 'blue' | 'pink';

export const COLLECTION_THEME: Record<string, {
  accent: Accent;
  accentVar: string;
  label: string;
}> = {
  research: { accent: 'purple', accentVar: 'var(--accent-purple)', label: 'Research' },
  notes:    { accent: 'cyan',   accentVar: 'var(--accent-cyan)',   label: 'Notes'    },
  blog:     { accent: 'green',  accentVar: 'var(--accent-green)',  label: 'Blog'     },
  projects: { accent: 'blue',   accentVar: 'var(--accent-blue)',   label: 'Projects' },
};

// ── Status badge mapping ─────────────────────────────────────
export const STATUS_CLASS: Record<string, string> = {
  complete:      'badge--complete',
  'in-progress': 'badge--progress',
  draft:         'badge--draft',
  active:        'badge--active',
  archived:      'badge--archived',
  prototype:     'badge--prototype',
  published:     'badge--published',
  preprint:      'badge--preprint',
};

// ── Homepage sections config ─────────────────────────────────
// Controls what appears on the homepage and in what order.
export const HOME_SECTIONS = [
  {
    id:         'featured-research',
    title:      'Featured Research',
    collection: 'research',
    layout:     'list' as const,
    limit:      3,
    filterBy:   { featured: true },
    accentVar:  'var(--accent-purple)',
    href:       '/research',
  },
  {
    id:         'recent-notes',
    title:      'Recent Notes',
    collection: 'notes',
    layout:     'grid' as const,
    limit:      4,
    accentVar:  'var(--accent-cyan)',
    href:       '/notes',
  },
  {
    id:         'recent-writing',
    title:      'Recent Writing',
    collection: 'blog',
    layout:     'list' as const,
    limit:      2,
    accentVar:  'var(--accent-green)',
    href:       '/blog',
  },
] as const;

// ── Formatting helpers ───────────────────────────────────────
export function formatDate(d: string, style: 'short' | 'long' = 'short'): string {
  return new Date(d).toLocaleDateString('en-US',
    style === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' }
  );
}
