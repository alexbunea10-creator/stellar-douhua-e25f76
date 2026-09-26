/**
 * Events are placeholder structure for now — real dates replace these rows
 * without any layout change.
 */

export type Event = {
  id: string
  date: string
  dateLabel: string
  title: string
  location: string
  description: string
  status: 'upcoming' | 'past' | 'series'
}

export const events: Event[] = [
  {
    id: 'showcase-spring',
    date: '2026-11-14',
    dateLabel: 'Nov 14, 2026',
    title: 'OTM Independent Showcase',
    location: 'Wildwood, NJ',
    description:
      'A short-set night for South Jersey independent artists, hosted by Orlando the Martyr LLC. Lineup to be announced.',
    status: 'upcoming',
  },
  {
    id: 'open-session',
    date: '2026-12-05',
    dateLabel: 'Dec 5, 2026',
    title: 'Open Session — Writers & Vocalists',
    location: 'Cape May County, NJ',
    description:
      'An informal writing and recording session for collaborating artists and new faces. Details posted closer to the date.',
    status: 'upcoming',
  },
  {
    id: 'summer-boardwalk',
    date: '2026-08-16',
    dateLabel: 'Aug 16, 2026',
    title: 'Boardwalk Set',
    location: 'Wildwood, NJ',
    description: 'Placeholder entry for a past performance. Replace with confirmed event details.',
    status: 'past',
  },
]

export const eventSeries = {
  title: 'Jersey Club & Latin Night',
  status: 'In development',
  description:
    'A recurring night built around Jersey club and Latin urban sound, pairing South Jersey DJs with independent artists. Venue and dates are being worked out — this page updates as the series is confirmed.',
}
