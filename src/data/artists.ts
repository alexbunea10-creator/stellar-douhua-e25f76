/**
 * Artist and creative-partner roster.
 *
 * Roles are intentionally worded as collaboration, never as "signed artist".
 * `releases[].placeholder` marks rows that exist to show the layout only —
 * swap them for real, artist-approved releases before launch. Connect links
 * stay `null` until each artist supplies the URL they want published.
 */

export type ConnectLink = {
  label: 'Spotify' | 'Apple Music' | 'Instagram'
  url: string | null
}

export type Release = {
  title: string
  type: string
  year: string
  /** True while this row is structural filler rather than an approved release. */
  placeholder: boolean
}

export type Artist = {
  slug: string
  name: string
  role: 'Founder / Artist' | 'Collaborating Artist' | 'Creative Partner'
  tag: string
  image: string
  /** Accent pulled from the artist's photography — drives per-profile color. */
  accent: string
  summary: string
  bio: string[]
  /** Drafted in-house; true until the artist has reviewed their own copy. */
  bioPendingReview: boolean
  releases: Release[]
  connect: ConnectLink[]
}

export const artists: Artist[] = [
  {
    slug: 'orlando-the-martyr',
    name: 'Orlando the Martyr',
    role: 'Founder / Artist',
    tag: 'South Jersey • Hip-Hop / Latin Urban',
    image: '/img/founder.jpg',
    accent: '#b5502a',
    summary:
      'The artist project of founder Orlando Ruiz — and the starting point for everything the company builds.',
    bio: [
      'Orlando the Martyr is the artist project of Orlando Ruiz, a writer and recording artist based in Wildwood, New Jersey. The music moves between hip-hop and Latin urban, built around direct writing and a heavy, low-lit sound.',
      'The project is also where the company began. Recording independently, releasing independently and learning the process step by step is what turned into Orlando the Martyr LLC — a company built to give other South Jersey artists a shorter path to the same thing.',
    ],
    bioPendingReview: false,
    releases: [
      { title: 'Single Title', type: 'Single', year: '2025', placeholder: true },
      { title: 'Single Title', type: 'Single', year: '2025', placeholder: true },
      { title: 'Project Title', type: 'EP', year: '2026', placeholder: true },
    ],
    connect: [
      { label: 'Spotify', url: null },
      { label: 'Apple Music', url: null },
      { label: 'Instagram', url: null },
    ],
  },
  {
    slug: 'yxngjj',
    name: 'YxngJj',
    role: 'Collaborating Artist',
    tag: 'South Jersey • Hip-Hop',
    image: '/img/artist-yxngjj.jpg',
    accent: '#4a6fa5',
    summary:
      'A hip-hop artist working with the company on records, sessions and live dates.',
    bio: [
      'YxngJj is a South Jersey hip-hop artist who works with Orlando the Martyr LLC on collaborative records, studio sessions and live dates.',
      'The collaboration covers recording, features and shows. YxngJj’s catalog, masters and merchandise remain entirely his own.',
    ],
    bioPendingReview: true,
    releases: [
      { title: 'Single Title', type: 'Single', year: '2025', placeholder: true },
      { title: 'Feature Title', type: 'Feature', year: '2026', placeholder: true },
    ],
    connect: [
      { label: 'Spotify', url: null },
      { label: 'Apple Music', url: null },
      { label: 'Instagram', url: null },
    ],
  },
  {
    slug: 'iceymac',
    name: 'Iceymac',
    role: 'Creative Partner',
    tag: 'South Jersey • Hip-Hop / Production',
    image: '/img/artist-iceymac.jpg',
    accent: '#2e8b84',
    summary:
      'A creative partner contributing to records, sessions and the visual side of releases.',
    bio: [
      'Iceymac is a creative partner of Orlando the Martyr LLC, contributing to records, sessions and the visual direction behind releases and events.',
      'The partnership is project-based: shared work, credited individually, with each side keeping ownership of what it brings.',
    ],
    bioPendingReview: true,
    releases: [
      { title: 'Collaboration Title', type: 'Single', year: '2026', placeholder: true },
    ],
    connect: [
      { label: 'Spotify', url: null },
      { label: 'Apple Music', url: null },
      { label: 'Instagram', url: null },
    ],
  },
  {
    slug: 'yari',
    name: 'Yari',
    role: 'Collaborating Artist',
    tag: 'South Jersey • Latin Urban / R&B',
    image: '/img/artist-yari.jpg',
    accent: '#b98a3c',
    summary:
      'A vocalist bringing Latin urban and R&B melody into the company’s collaborative work.',
    bio: [
      'Yari is a vocalist working across Latin urban and R&B, collaborating with Orlando the Martyr LLC on features, writing sessions and live performances.',
      'Her releases and recordings remain her own; the collaboration covers the work created together.',
    ],
    bioPendingReview: true,
    releases: [
      { title: 'Single Title', type: 'Single', year: '2026', placeholder: true },
      { title: 'Feature Title', type: 'Feature', year: '2026', placeholder: true },
    ],
    connect: [
      { label: 'Spotify', url: null },
      { label: 'Apple Music', url: null },
      { label: 'Instagram', url: null },
    ],
  },
]

export const artistsIntro =
  'Meet the independent artists and creative partners collaborating with Orlando the Martyr LLC. Each artist brings their own sound, identity, and vision to our growing creative community.'

export const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug)
