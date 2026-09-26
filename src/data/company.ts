/**
 * Single source of truth for company-level copy.
 * The company (Orlando the Martyr LLC) is deliberately kept distinct from the
 * artist project (Orlando the Martyr) everywhere it appears in the UI.
 */

export const company = {
  legalName: 'Orlando the Martyr LLC',
  shortName: 'OTM',
  tagline: 'Built in South Jersey. Driven by independent music.',
  positioning:
    'A modern independent music company connecting artists, creating music, and building opportunities.',
  base: 'Wildwood, New Jersey',
  serviceArea: 'Cape May County and the surrounding South Jersey area',
  email: 'hello@orlandothemartyr.com',
  bookingEmail: 'studio@orlandothemartyr.com',
  storyTitle: 'Built in South Jersey.',
  story:
    'Orlando the Martyr LLC is an independent music and creative company founded by Orlando Ruiz in Wildwood, New Jersey. What began as a personal journey in music has grown into a vision of connecting independent artists, creating opportunities, and contributing to the development of South Jersey’s music scene. Through original releases, artist collaborations, live events, and accessible recording services, the company aims to provide a platform where creativity and community come together. Rooted in South Jersey and influenced by a diverse range of musical styles, Orlando the Martyr LLC is building a space for independent artists to create, connect, and grow.',
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Artists & Partners', to: '/artists' },
  { label: 'Mobile Studio', to: '/studio' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
] as const

export const socials = [
  { label: 'Instagram', handle: '@orlandothemartyr', url: null },
  { label: 'Spotify', handle: 'Orlando the Martyr', url: null },
  { label: 'Apple Music', handle: 'Orlando the Martyr', url: null },
  { label: 'YouTube', handle: 'Orlando the Martyr', url: null },
] as const

/** Trust/ownership language reused across the artists and contact pages. */
export const trustNotes = [
  'Artists retain full ownership of their pre-existing music, masters and merchandise rights.',
  'Collaborating with Orlando the Martyr LLC does not create a label, management or distribution relationship.',
  'Only releases an artist has approved for promotion are displayed on this site.',
] as const

export const conceptImageryNote =
  'Concept imagery only. Replace with each artist’s approved promotional photography.'
