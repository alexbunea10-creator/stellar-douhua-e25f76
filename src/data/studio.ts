/**
 * OTM Mobile Studio service data.
 *
 * Rates are suggested introductory rates, not confirmed company prices — that
 * caveat is rendered next to every price. `bookable` marks the two services a
 * customer can put a booking request in for.
 */

export type Service = {
  id: 'recording-session' | 'song-session' | 'additional-time'
  name: string
  price: number
  priceLabel: string
  unit: 'hour' | 'flat'
  meta: string
  summary: string
  includes: string[]
  bookable: boolean
  featured: boolean
}

export const services: Service[] = [
  {
    id: 'recording-session',
    name: 'Recording Session',
    price: 30,
    priceLabel: '$30',
    unit: 'hour',
    meta: '2-hour minimum for mobile visits',
    summary: 'Straight studio time at your place, with someone in the room guiding the take.',
    includes: [
      'Recording and vocal guidance',
      'Multiple takes within the booked time',
      'Basic session organization',
      'Raw vocal files delivered afterward',
    ],
    bookable: true,
    featured: false,
  },
  {
    id: 'song-session',
    name: 'Song Recording Session',
    price: 75,
    priceLabel: '$75',
    unit: 'flat',
    meta: 'Up to 3 hours • one song • introductory package',
    summary:
      'The flagship session: one song tracked end to end, with a rough mix to take away.',
    includes: [
      'Everything in the Recording Session',
      'Assistance with vocal delivery and arrangement',
      'Multiple takes and ad-libs as time allows',
      'Basic rough mix for reference',
      'Recording files delivered afterward',
    ],
    bookable: true,
    featured: true,
  },
  {
    id: 'additional-time',
    name: 'Additional Time',
    price: 30,
    priceLabel: '$30',
    unit: 'hour',
    meta: 'Subject to availability',
    summary:
      'Extra time added to a session in progress. Additional editing or mixing is quoted separately.',
    includes: [
      'Added to an active session when the schedule allows',
      'Billed in one-hour increments',
      'Additional editing or mixing quoted separately',
    ],
    bookable: false,
    featured: false,
  },
]

export const pricingNote =
  'These are suggested introductory rates, not confirmed company prices. Travel outside the designated service area is quoted separately.'

/** Stated plainly so expectations are set before a request is sent. */
export const exclusions = [
  'No full professional mixing or mastering',
  'No unlimited revisions or unlimited recording time',
  'No beat production or instrumental licensing',
  'No guaranteed song completion within a session',
  'No distribution, promotion or release services included',
]

export const policies = [
  {
    title: 'Minimum booking',
    body: 'Mobile sessions have a 2-hour minimum.',
  },
  {
    title: 'Deposit',
    body: 'A 50% deposit confirms your date. Nothing is charged when you send a request — the deposit is only collected after the session is reviewed and confirmed.',
  },
  {
    title: 'Cancellation',
    body: '24–48 hours’ notice is required to cancel or reschedule. Inside that window the deposit may be retained.',
  },
  {
    title: 'Travel',
    body: 'Travel is included within the designated South Jersey service area. Locations outside that radius are quoted separately before confirmation.',
  },
  {
    title: 'Extra time',
    body: 'Additional time beyond the booked block is $30 per hour, subject to availability.',
  },
  {
    title: 'Setup and teardown',
    body: 'Setup and teardown are not billed as session time. Recording time starts once the rig is ready.',
  },
  {
    title: 'Deliverables',
    body: 'Raw vocal files are delivered after every session. A basic rough mix is included with the Song Recording Session only.',
  },
]

export const bookingSteps = [
  'Choose a service',
  'Pick a preferred date',
  'Tell us where',
  'Your details',
  'Review & send',
]

export const depositRate = 0.5
