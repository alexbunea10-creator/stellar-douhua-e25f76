import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ConceptNote, Placeholder, SectionHead } from '@/components/Bits'
import { btnOnDark, btnOutline, shell } from '@/components/ui'
import { eventSeries, events } from '@/data/events'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/events')({
  component: Events,
  head: () => ({
    meta: [
      { title: 'Events — Orlando the Martyr LLC' },
      {
        name: 'description',
        content:
          'Upcoming showcases, sessions and event series hosted by Orlando the Martyr LLC across South Jersey.',
      },
    ],
  }),
})

const upcoming = events.filter((event) => event.status === 'upcoming')
const past = events.filter((event) => event.status === 'past')

function Events() {
  return (
    <>
      <section className={`${shell} pb-12 pt-20 sm:pt-28`}>
        <Reveal>
          <p className="eyebrow text-silver">Events</p>
          <h1 className="h-display mt-6 max-w-[18ch] text-[2.75rem] uppercase sm:text-[4rem] lg:text-[5rem]">
            Rooms to play in.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Showcases, open sessions and event nights built to put South Jersey independent artists
            in front of an audience. Dates below are placeholders while the calendar is confirmed.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <div className={shell}>
          <img
            src={img('/img/events.jpg', { w: 1800, h: 900, fit: 'cover' })}
            srcSet={imgSet('/img/events.jpg', [768, 1200, 1800], 2)}
            sizes="100vw"
            alt="Concept image of a small independent live music night"
            className="aspect-16/9 w-full object-cover sm:aspect-2/1"
          />
          <div className="mt-3">
            <ConceptNote />
          </div>
        </div>
      </Reveal>

      <section className={`${shell} py-20 sm:py-24`}>
        <Reveal>
          <SectionHead eyebrow="Upcoming" title="On the calendar." />
        </Reveal>
        <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
          {upcoming.map((event, index) => (
            <Reveal key={event.id} delay={index * 60} as="li">
              <div className="grid gap-4 py-8 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
                <p className="eyebrow text-silver">{event.dateLabel}</p>
                <div>
                  <h3 className="h-display text-[1.5rem] sm:text-[1.875rem]">{event.title}</h3>
                  <p className="mt-2 text-sm text-ink/55">{event.location}</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
                    {event.description}
                  </p>
                </div>
                <Placeholder>Details TBA</Placeholder>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Future series — structured now so it can go live without a redesign. */}
      <section className="bg-ink text-paper">
        <div className={`${shell} py-20 sm:py-24`}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className="eyebrow text-silver">{eventSeries.status} — event series</p>
                <h2 className="h-display mt-5 text-[2.25rem] uppercase sm:text-[3rem]">
                  {eventSeries.title}
                </h2>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/70">
                  {eventSeries.description}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/contact" className={btnOnDark}>
                    Perform or host with us
                  </Link>
                </div>
              </div>
              <div className="border border-paper/15 p-7">
                <p className="eyebrow text-silver">Looking for</p>
                <ul className="mt-6 space-y-4 text-sm text-paper/70">
                  {[
                    'South Jersey DJs working in Jersey club',
                    'Latin urban and hip-hop artists with short live sets',
                    'Venues and promoters in Cape May and Atlantic County',
                  ].map((item) => (
                    <li key={item} className="border-t border-paper/12 pt-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${shell} py-20 sm:py-24`}>
        <Reveal>
          <SectionHead eyebrow="Past" title="Previously." />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((event, index) => (
            <Reveal key={event.id} delay={index * 60} as="li">
              <div className="flex h-full flex-col border border-hairline p-7">
                <p className="eyebrow text-silver">{event.dateLabel}</p>
                <h3 className="h-display mt-4 text-[1.375rem]">{event.title}</h3>
                <p className="mt-2 text-sm text-ink/55">{event.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{event.description}</p>
                <div className="mt-6">
                  <Placeholder>Placeholder entry</Placeholder>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={120} as="li">
            <div className="flex h-full flex-col justify-between border border-dashed border-hairline bg-paper-dim/40 p-7">
              <div>
                <p className="eyebrow text-silver">Coming later</p>
                <h3 className="h-display mt-4 text-[1.375rem]">Photo gallery &amp; recaps</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  Event photography and recaps will live here once there are shows to document.
                </p>
              </div>
              <Link to="/contact" className={`${btnOutline} mt-7 self-start`}>
                Shoot an event with us
              </Link>
            </div>
          </Reveal>
        </ul>
      </section>
    </>
  )
}
