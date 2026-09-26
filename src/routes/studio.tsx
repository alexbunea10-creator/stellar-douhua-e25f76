import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ConceptNote, SectionHead } from '@/components/Bits'
import { BookingRequest } from '@/components/BookingRequest'
import { btnOnDark, btnOnDarkOutline, shell } from '@/components/ui'
import { company } from '@/data/company'
import { exclusions, policies, pricingNote, services } from '@/data/studio'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/studio')({
  component: Studio,
  head: () => ({
    meta: [
      { title: 'OTM Mobile Studio — Orlando the Martyr LLC' },
      {
        name: 'description',
        content:
          'Your sound. Your space. We come to you. Mobile recording sessions across South Jersey, with request-to-book scheduling and introductory rates.',
      },
    ],
  }),
})

const howItWorks = [
  {
    title: 'You send a request',
    body: 'Pick a service, a date and a location. Takes a couple of minutes and costs nothing.',
  },
  {
    title: 'We review and confirm',
    body: 'We check availability and travel, then reply with a confirmation and the final quote.',
  },
  {
    title: 'A deposit secures the date',
    body: '50% up front through a secure payment link. The balance is due at the session.',
  },
  {
    title: 'We come to you and record',
    body: 'Setup, tracking and guidance in your space. Files are delivered after the session.',
  },
]

function Studio() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <img
          src={img('/img/studio.jpg', { w: 1800, h: 1100, fit: 'cover' })}
          srcSet={imgSet('/img/studio.jpg', [768, 1200, 1800], 1.6)}
          sizes="100vw"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        <div className={`${shell} pb-20 pt-20 sm:pb-24 sm:pt-28`}>
          <Reveal>
            <p className="eyebrow text-silver">OTM Mobile Studio</p>
            <h1 className="h-display mt-6 max-w-[22ch] text-[2.5rem] uppercase sm:text-[4rem] lg:text-[5rem]">
              Your sound. Your space.
              <span className="block text-paper/55">We come to you.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
              A portable recording rig brought to your place anywhere in {company.serviceArea} — mic,
              interface, headphones, treatment and someone in the room who knows how to get the take
              out of you.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#request" className={btnOnDark}>
                Request a session
              </a>
              <a href="#pricing" className={btnOnDarkOutline}>
                See pricing
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`${shell} py-20 sm:py-28`}>
        <Reveal>
          <SectionHead
            eyebrow="Pricing"
            title="Introductory rates, stated plainly."
            lede="Three ways to book. No packages hidden behind a quote form."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 70}>
              <div
                className={`flex h-full flex-col p-8 sm:p-10 ${
                  service.featured ? 'bg-ink text-paper' : 'bg-paper'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="h-display text-[1.5rem] sm:text-[1.75rem]">{service.name}</h3>
                  {service.featured ? (
                    <span className="eyebrow rounded-full border border-paper/30 px-3 py-1.5 text-paper/80">
                      Flagship
                    </span>
                  ) : null}
                </div>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="h-display text-[2.75rem]">{service.priceLabel}</span>
                  <span
                    className={`text-sm ${service.featured ? 'text-paper/55' : 'text-silver'}`}
                  >
                    {service.unit === 'hour' ? '/ hour' : 'flat'}
                  </span>
                </p>
                <p
                  className={`mt-2 text-xs ${service.featured ? 'text-paper/50' : 'text-silver'}`}
                >
                  {service.meta}
                </p>

                <p
                  className={`mt-6 text-sm leading-relaxed ${
                    service.featured ? 'text-paper/70' : 'text-ink/65'
                  }`}
                >
                  {service.summary}
                </p>

                <ul className="mt-7 space-y-3 text-sm">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className={service.featured ? 'text-paper/40' : 'text-silver'}
                      >
                        —
                      </span>
                      <span className={service.featured ? 'text-paper/80' : 'text-ink/70'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  {service.bookable ? (
                    <a
                      href="#request"
                      className={
                        service.featured
                          ? 'inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-[0.8125rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-px'
                          : 'inline-flex items-center justify-center rounded-full border border-ink/25 px-6 py-3 text-[0.8125rem] font-semibold transition-all duration-300 hover:-translate-y-px hover:border-ink'
                      }
                    >
                      Request this session
                    </a>
                  ) : (
                    <p className="text-xs leading-relaxed text-silver">
                      Added to an existing session — just ask on the day or mention it in your
                      request.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-7 max-w-2xl text-xs leading-relaxed text-silver">{pricingNote}</p>
        </Reveal>
      </section>

      {/* What's not included */}
      <section className="border-y border-hairline bg-paper-dim/35">
        <div className={`${shell} py-16 sm:py-20`}>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-silver">What a session is not</p>
              <p className="h-editorial mt-5 text-[1.5rem] sm:text-[2rem]">
                Clear limits, so nobody is guessing.
              </p>
            </Reveal>
            <Reveal delay={70}>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {exclusions.map((item) => (
                  <li
                    key={item}
                    className="border-t border-hairline pt-4 text-sm leading-relaxed text-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-silver">
                Need full mixing, mastering or production? Ask in your request and we’ll quote it
                separately or point you to someone who does it well.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`${shell} py-20 sm:py-24`}>
        <Reveal>
          <SectionHead eyebrow="How booking works" title="Request first. Nothing auto-books." />
        </Reveal>
        <ol className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} as="li">
              <div className="h-full bg-paper p-7">
                <p className="eyebrow text-silver">0{index + 1}</p>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Booking request flow */}
      <section id="request" className="scroll-mt-20 bg-ink text-paper">
        <div className={`${shell} py-20 sm:py-28`}>
          <Reveal>
            <p className="eyebrow text-silver">Request to book</p>
            <h2 className="h-display mt-5 max-w-[20ch] text-[2.25rem] uppercase sm:text-[3rem]">
              Send a session request.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/65">
              This sends a request only — it does not reserve your date or take payment. We review
              every request and reply with a confirmation and a deposit link.
            </p>
          </Reveal>

          <Reveal delay={70} className="mt-12">
            <BookingRequest />
          </Reveal>

          {/* Policies sit next to the form on purpose. */}
          <Reveal className="mt-16">
            <p className="eyebrow text-silver">Session policies</p>
            <dl className="mt-8 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
              {policies.map((policy) => (
                <div key={policy.title} className="bg-ink p-6">
                  <dt className="text-sm font-semibold text-paper/90">{policy.title}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-paper/55">{policy.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-2xl text-xs leading-relaxed text-paper/40">
              {pricingNote} Payments are handled through a secure third-party payment link after
              confirmation — no card details are ever collected on this site.
            </p>
            <div className="mt-8">
              <ConceptNote tone="dark" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className={`${shell} py-16 sm:py-20`}>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="h-display max-w-[24ch] text-[1.75rem] uppercase sm:text-[2.25rem]">
                Not sure which session fits?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[0.8125rem] font-semibold text-paper transition-transform duration-300 hover:-translate-y-px"
              >
                Ask us first
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
