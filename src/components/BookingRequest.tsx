import { useMemo, useState } from 'react'
import { bookingSteps, depositRate, services } from '@/data/studio'
import { company } from '@/data/company'
import { btnOnDark, btnOnDarkOutline } from './ui'

/**
 * Request-to-book flow for the OTM Mobile Studio.
 *
 * Deliberately NOT instant booking: the form gathers everything needed to
 * quote and confirm a session, shows an estimated total, and submits a
 * *request*. No date is held and no payment is taken here — the deposit is
 * collected after the company reviews and confirms. Submissions go to Netlify
 * Forms (see public/__forms.html for the build-time form registration).
 */

const FORM_NAME = 'studio-booking-request'
const bookable = services.filter((service) => service.bookable)
const minHours = 2

type Fields = {
  service: string
  hours: string
  preferredDate: string
  alternateDate: string
  locationCity: string
  locationAddress: string
  locationType: string
  name: string
  email: string
  phone: string
  artistName: string
  needs: string
}

const emptyFields: Fields = {
  service: 'Song Recording Session',
  hours: '3',
  preferredDate: '',
  alternateDate: '',
  locationCity: '',
  locationAddress: '',
  locationType: 'Home / apartment',
  name: '',
  email: '',
  phone: '',
  artistName: '',
  needs: '',
}

const locationTypes = [
  'Home / apartment',
  'Rehearsal or practice space',
  'Business or office',
  'Other / to be discussed',
]

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

const money = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

const today = () => new Date().toISOString().slice(0, 10)

export function BookingRequest() {
  const [step, setStep] = useState(0)
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  const service = useMemo(
    () => bookable.find((entry) => entry.name === fields.service) ?? bookable[0],
    [fields.service],
  )

  const hours = Math.max(minHours, Number(fields.hours) || minHours)

  /** Song Recording Session is a flat package with up to 3 hours included. */
  const estimate = useMemo(() => {
    if (service.unit === 'flat') {
      const included = 3
      const extra = Math.max(0, hours - included)
      return { base: service.price, extraHours: extra, extra: extra * 30 }
    }
    return { base: service.price * hours, extraHours: 0, extra: 0 }
  }, [service, hours])

  const total = estimate.base + estimate.extra
  const deposit = Math.round(total * depositRate)

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    setError(null)
  }

  const validate = (index: number): string | null => {
    if (index === 1 && !fields.preferredDate) return 'Choose a preferred date to continue.'
    if (index === 2 && !fields.locationCity.trim())
      return 'Add at least the town or city where the session would happen.'
    if (index === 3) {
      if (!fields.name.trim()) return 'Add your name so we know who we’re replying to.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email))
        return 'Add a valid email address for the reply.'
      if (!fields.needs.trim()) return 'Tell us briefly what you want to record.'
    }
    return null
  }

  const next = () => {
    const problem = validate(step)
    if (problem) {
      setError(problem)
      return
    }
    setError(null)
    setStep((value) => Math.min(value + 1, bookingSteps.length - 1))
  }

  const back = () => {
    setError(null)
    setStep((value) => Math.max(value - 1, 0))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!terms) {
      setError('Please acknowledge the session policies before sending your request.')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': FORM_NAME,
          service: service.name,
          hours: String(hours),
          'preferred-date': fields.preferredDate,
          'alternate-date': fields.alternateDate,
          'location-city': fields.locationCity,
          'location-address': fields.locationAddress,
          'location-type': fields.locationType,
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          'artist-name': fields.artistName,
          needs: fields.needs,
          'estimated-total': money(total),
          'estimated-deposit': money(deposit),
          'terms-acknowledged': 'yes',
        }),
      })
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-ink-soft p-8 text-paper sm:p-12">
        <p className="eyebrow text-silver">Request received</p>
        <h3 className="h-display mt-5 text-[2rem] sm:text-[2.5rem]">
          Thanks — nothing is booked yet.
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/70">
          Your request is in. It does not reserve {fields.preferredDate || 'your date'} and no
          payment has been taken. We’ll review availability, confirm travel to{' '}
          {fields.locationCity || 'your location'}, and reply by email with a confirmation and a
          deposit link.
        </p>
        <dl className="mt-10 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3">
          {[
            { term: '01 — Review', detail: 'We check the date, travel and what you want to record.' },
            {
              term: '02 — Confirmation',
              detail: 'You get an email confirming the session and the final quote.',
            },
            {
              term: `03 — Deposit (${Math.round(depositRate * 100)}%)`,
              detail: 'Paying the deposit secures the date. Balance is due at the session.',
            },
          ].map((item) => (
            <div key={item.term} className="bg-ink-soft p-6">
              <dt className="eyebrow text-paper/80">{item.term}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-paper/55">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-paper/50">
          <span>Questions in the meantime?</span>
          <a href={`mailto:${company.bookingEmail}`} className="link-underline text-paper">
            {company.bookingEmail}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ink-soft text-paper">
      {/* Step rail */}
      <ol className="flex flex-wrap gap-x-6 gap-y-2 border-b border-paper/12 px-6 py-5 sm:px-10">
        {bookingSteps.map((label, index) => (
          <li
            key={label}
            aria-current={index === step ? 'step' : undefined}
            className={`eyebrow flex items-center gap-2 transition-colors duration-300 ${
              index === step ? 'text-paper' : index < step ? 'text-paper/55' : 'text-paper/25'
            }`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={submit} className="p-6 sm:p-10" noValidate>
        {/* Netlify Forms needs the form name with the submission. */}
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div className="min-h-[22rem]">
            {step === 0 ? (
              <fieldset>
                <legend className="h-display text-[1.75rem] sm:text-[2rem]">
                  Which session do you want?
                </legend>
                <div className="mt-7 space-y-3">
                  {bookable.map((entry) => {
                    const selected = entry.name === service.name
                    return (
                      <label
                        key={entry.id}
                        className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors duration-300 ${
                          selected
                            ? 'border-paper bg-paper/8'
                            : 'border-paper/18 hover:border-paper/45'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service-choice"
                          value={entry.name}
                          checked={selected}
                          onChange={() => {
                            update('service', entry.name)
                            update('hours', entry.unit === 'flat' ? '3' : '2')
                          }}
                          className="mt-1.5 h-4 w-4 accent-[#f4f2ee]"
                        />
                        <span className="flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-3">
                            <span className="text-base font-semibold">{entry.name}</span>
                            <span className="text-base text-paper/70">
                              {entry.priceLabel}
                              {entry.unit === 'hour' ? ' / hour' : ' flat'}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-xs text-paper/45">{entry.meta}</span>
                          <span className="mt-3 block text-sm leading-relaxed text-paper/65">
                            {entry.summary}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>

                <label className="mt-8 block">
                  <span className="eyebrow text-silver">
                    {service.unit === 'flat'
                      ? 'Hours to hold (3 included in the package)'
                      : 'Hours to book (2-hour minimum)'}
                  </span>
                  <select
                    value={String(hours)}
                    onChange={(event) => update('hours', event.target.value)}
                    className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                  >
                    {[2, 3, 4, 5, 6].map((option) => (
                      <option key={option} value={option} className="bg-ink text-paper">
                        {option} hours
                      </option>
                    ))}
                  </select>
                </label>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <fieldset>
                <legend className="h-display text-[1.75rem] sm:text-[2rem]">
                  When would you like to record?
                </legend>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/55">
                  Requesting a date does not hold it. Adding a backup date usually gets you
                  confirmed faster.
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-silver">Preferred date</span>
                    <input
                      type="date"
                      min={today()}
                      value={fields.preferredDate}
                      onChange={(event) => update('preferredDate', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Backup date (optional)</span>
                    <input
                      type="date"
                      min={today()}
                      value={fields.alternateDate}
                      onChange={(event) => update('alternateDate', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <fieldset>
                <legend className="h-display text-[1.75rem] sm:text-[2rem]">
                  Where are we setting up?
                </legend>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/55">
                  Travel is included within {company.serviceArea}. Anywhere further is quoted
                  separately before confirmation.
                </p>
                <div className="mt-8 space-y-6">
                  <label className="block">
                    <span className="eyebrow text-silver">Town / city *</span>
                    <input
                      type="text"
                      value={fields.locationCity}
                      onChange={(event) => update('locationCity', event.target.value)}
                      placeholder="Wildwood, NJ"
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base placeholder:text-paper/30 focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Street address (optional for now)</span>
                    <input
                      type="text"
                      value={fields.locationAddress}
                      onChange={(event) => update('locationAddress', event.target.value)}
                      placeholder="Shared after the session is confirmed if you prefer"
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base placeholder:text-paper/30 focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Type of space</span>
                    <select
                      value={fields.locationType}
                      onChange={(event) => update('locationType', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    >
                      {locationTypes.map((option) => (
                        <option key={option} value={option} className="bg-ink text-paper">
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>
            ) : null}

            {step === 3 ? (
              <fieldset>
                <legend className="h-display text-[1.75rem] sm:text-[2rem]">
                  Tell us about you and the session.
                </legend>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-silver">Your name *</span>
                    <input
                      type="text"
                      value={fields.name}
                      onChange={(event) => update('name', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Artist name (optional)</span>
                    <input
                      type="text"
                      value={fields.artistName}
                      onChange={(event) => update('artistName', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Email *</span>
                    <input
                      type="email"
                      value={fields.email}
                      onChange={(event) => update('email', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-silver">Phone (optional)</span>
                    <input
                      type="tel"
                      value={fields.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      className="mt-3 w-full border-b border-paper/25 bg-transparent py-3 text-base focus:border-paper focus:outline-none"
                    />
                  </label>
                </div>
                <label className="mt-6 block">
                  <span className="eyebrow text-silver">What do you want to record? *</span>
                  <textarea
                    rows={4}
                    value={fields.needs}
                    onChange={(event) => update('needs', event.target.value)}
                    placeholder="One song, beat already picked, need help with the hook and ad-libs…"
                    className="mt-3 w-full resize-y border-b border-paper/25 bg-transparent py-3 text-base placeholder:text-paper/30 focus:border-paper focus:outline-none"
                  />
                </label>
              </fieldset>
            ) : null}

            {step === 4 ? (
              <fieldset>
                <legend className="h-display text-[1.75rem] sm:text-[2rem]">
                  Review and send your request.
                </legend>

                <dl className="mt-8 divide-y divide-paper/12 border-y border-paper/12 text-sm">
                  {[
                    ['Service', service.name],
                    ['Time requested', `${hours} hours`],
                    ['Preferred date', fields.preferredDate || '—'],
                    ['Backup date', fields.alternateDate || '—'],
                    [
                      'Location',
                      [fields.locationAddress, fields.locationCity].filter(Boolean).join(', ') ||
                        '—',
                    ],
                    ['Type of space', fields.locationType],
                    ['Name', fields.artistName ? `${fields.name} (${fields.artistName})` : fields.name],
                    ['Email', fields.email],
                    ['Phone', fields.phone || '—'],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex gap-6 py-3.5">
                      <dt className="w-36 shrink-0 text-paper/45">{term}</dt>
                      <dd className="min-w-0 break-words text-paper/90">{detail}</dd>
                    </div>
                  ))}
                  <div className="flex gap-6 py-3.5">
                    <dt className="w-36 shrink-0 text-paper/45">Recording needs</dt>
                    <dd className="min-w-0 whitespace-pre-line break-words text-paper/90">
                      {fields.needs}
                    </dd>
                  </div>
                </dl>

                <label className="mt-8 flex cursor-pointer items-start gap-4 border border-paper/18 p-5 transition-colors duration-300 hover:border-paper/40">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(event) => {
                      setTerms(event.target.checked)
                      setError(null)
                    }}
                    className="mt-1 h-4 w-4 accent-[#f4f2ee]"
                  />
                  <span className="text-sm leading-relaxed text-paper/75">
                    I understand this is a <strong className="text-paper">request</strong>, not a
                    confirmed booking. It does not reserve the date or process payment. I’ve read
                    the session policies — 2-hour minimum, {Math.round(depositRate * 100)}% deposit
                    to confirm, 24–48 hours’ notice to cancel or reschedule, $30/hour for extra
                    time, and travel outside the service area quoted separately.
                  </span>
                </label>

                <p className="mt-6 text-xs leading-relaxed text-paper/40">
                  No card details are collected on this site. After we confirm your session, the
                  deposit is paid through a secure payment link sent by email.
                </p>
              </fieldset>
            ) : null}

            {error ? (
              <p role="alert" className="mt-6 text-sm text-[#e8a07a]">
                {error}
              </p>
            ) : null}
            {status === 'failed' ? (
              <p role="alert" className="mt-4 text-sm text-[#e8a07a]">
                Something went wrong sending the request. Email{' '}
                <a href={`mailto:${company.bookingEmail}`} className="underline">
                  {company.bookingEmail}
                </a>{' '}
                and we’ll pick it up from there.
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {step > 0 ? (
                <button type="button" onClick={back} className={btnOnDarkOutline}>
                  Back
                </button>
              ) : null}
              {step < bookingSteps.length - 1 ? (
                <button type="button" onClick={next} className={btnOnDark}>
                  Continue
                </button>
              ) : (
                <button type="submit" disabled={status === 'sending'} className={`${btnOnDark} disabled:opacity-60`}>
                  {status === 'sending' ? 'Sending…' : 'Send booking request'}
                </button>
              )}
              <span className="text-xs text-paper/35">
                Step {step + 1} of {bookingSteps.length}
              </span>
            </div>
          </div>

          {/* Live estimate — sticky on desktop so the number is always visible. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-paper/15 p-6">
              <p className="eyebrow text-silver">Estimated session total</p>
              <p className="h-display mt-4 text-[2.75rem] leading-none">{money(total)}</p>
              <dl className="mt-6 space-y-2.5 text-sm text-paper/60">
                <div className="flex justify-between gap-4">
                  <dt>{service.name}</dt>
                  <dd>{money(estimate.base)}</dd>
                </div>
                {service.unit === 'hour' ? (
                  <div className="flex justify-between gap-4">
                    <dt>{hours} hours × $30</dt>
                    <dd>included</dd>
                  </div>
                ) : null}
                {estimate.extraHours > 0 ? (
                  <div className="flex justify-between gap-4">
                    <dt>
                      {estimate.extraHours} extra hour{estimate.extraHours > 1 ? 's' : ''} × $30
                    </dt>
                    <dd>{money(estimate.extra)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 border-t border-paper/12 pt-3 text-paper/80">
                  <dt>Deposit to confirm ({Math.round(depositRate * 100)}%)</dt>
                  <dd>{money(deposit)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Balance at session</dt>
                  <dd>{money(total - deposit)}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-paper/12 pt-5 text-xs leading-relaxed text-paper/40">
                Estimate only. Travel outside {company.serviceArea} is quoted separately, and
                nothing is charged until your session is confirmed.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}
