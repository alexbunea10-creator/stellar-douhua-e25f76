import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { SectionHead, ConceptNote, Placeholder } from '@/components/Bits'
import { btnOnDark, btnOnDarkOutline, btnOutline, btnSolid, shell } from '@/components/ui'
import { company } from '@/data/company'
import { artists } from '@/data/artists'
import { services, pricingNote } from '@/data/studio'
import { events, eventSeries } from '@/data/events'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/')({
  component: Home,
})

const featured = artists[0]
const upcoming = events.filter((event) => event.status === 'upcoming').slice(0, 2)

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-ink text-paper">
        <img
          src={img('/img/hero.jpg', { w: 1800, h: 1000, fit: 'cover' })}
          srcSet={imgSet('/img/hero.jpg', [768, 1200, 1800, 2400], 1.8)}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />

        <div className={`${shell} pb-16 pt-32 sm:pb-24`}>
          <Reveal>
            <p className="eyebrow text-paper/55">
              Independent Music &amp; Creative Company — {company.base}
            </p>
            <h1 className="h-display mt-7 max-w-[20ch] text-[2.75rem] uppercase sm:text-[4.5rem] lg:text-[6rem]">
              Built in South Jersey.
              <span className="mt-2 block text-paper/55">
                Driven by independent music.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
              {company.positioning}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/artists" hash="releases" className={btnOnDark}>
                Explore the Music
              </Link>
              <Link to="/artists" className={btnOnDarkOutline}>
                Meet the Artists
              </Link>
              <Link to="/studio" hash="request" className={btnOnDarkOutline}>
                Book the Studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Company introduction */}
      <section className={`${shell} py-20 sm:py-28`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-silver">The Company</p>
            <p className="h-editorial mt-5 text-[1.75rem] sm:text-[2.25rem]">
              A platform where creativity and community come together.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-6 text-base leading-relaxed text-ink/70 sm:text-lg">
              <p>
                Orlando the Martyr LLC is an independent music and creative company founded by
                Orlando Ruiz in Wildwood, New Jersey. It exists to connect independent artists,
                create opportunities, and contribute to the development of South Jersey’s music
                scene.
              </p>
              <p>
                The work runs across four lanes: original releases, artist collaborations, live
                events, and accessible recording services through the OTM Mobile Studio.
              </p>
              <Link to="/about" className={`${btnOutline} mt-2`}>
                Read our story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={shell}>
        <hr className="rule" />
      </div>

      {/* Featured artist / featured music */}
      <section id="featured" className={`${shell} py-20 sm:py-28`}>
        <Reveal>
          <SectionHead
            eyebrow="Featured"
            title="The music starts at home."
            lede="Featured artist and releases from inside the OTM creative community."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Link
              to="/artists/$artistSlug"
              params={{ artistSlug: featured.slug }}
              className="group block"
            >
              <div className="relative overflow-hidden bg-paper-dim">
                <img
                  src={img(featured.image, { w: 1000, h: 1250, fit: 'cover' })}
                  srcSet={imgSet(featured.image, [600, 900, 1200], 0.8)}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  alt="Concept portrait representing the artist Orlando the Martyr"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ backgroundColor: featured.accent }}
                />
              </div>
            </Link>
            <div className="mt-3">
              <ConceptNote />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow" style={{ color: featured.accent }}>
              {featured.role}
            </p>
            <h3 className="h-display mt-4 text-[2.5rem] uppercase sm:text-[3.25rem]">
              {featured.name}
            </h3>
            <p className="eyebrow mt-4 text-silver">{featured.tag}</p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70">
              {featured.bio[0]}
            </p>

            <div id="releases" className="mt-10">
              <p className="eyebrow text-silver">Featured Releases</p>
              <ul className="mt-4 divide-y divide-hairline border-t border-hairline">
                {featured.releases.map((release, index) => (
                  <li
                    key={`${release.title}-${index}`}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold">{release.title}</p>
                      <p className="mt-1 text-xs text-silver">
                        {release.type} · {release.year}
                      </p>
                    </div>
                    {release.placeholder ? <Placeholder>Pending approval</Placeholder> : null}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-silver">
                Only releases an artist has approved for promotion are published here.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/artists/$artistSlug"
                params={{ artistSlug: featured.slug }}
                className={btnSolid}
              >
                View artist profile
              </Link>
              <Link to="/artists" className={btnOutline}>
                All artists &amp; partners
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile studio preview */}
      <section className="bg-ink text-paper">
        <div className={`${shell} py-20 sm:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-silver">OTM Mobile Studio</p>
              <h2 className="h-display mt-5 text-[2.25rem] uppercase sm:text-[3.25rem]">
                Your sound. Your space.
                <span className="block text-paper/55">We come to you.</span>
              </h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/70">
                A portable recording setup brought to your home, rehearsal space or wherever you
                work best — with someone in the room to guide the take.
              </p>

              <dl className="mt-10 divide-y divide-paper/12 border-t border-paper/12">
                {services.map((service) => (
                  <div key={service.id} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-sm font-semibold text-paper/85">{service.name}</dt>
                    <dd className="whitespace-nowrap text-sm text-paper/55">
                      {service.priceLabel}
                      {service.unit === 'hour' ? ' / hour' : ''}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 max-w-lg text-xs leading-relaxed text-paper/40">{pricingNote}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/studio" hash="request" className={btnOnDark}>
                  Request a session
                </Link>
                <Link to="/studio" className={btnOnDarkOutline}>
                  Pricing &amp; policies
                </Link>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <img
                src={img('/img/studio.jpg', { w: 1000, h: 1250, fit: 'cover' })}
                srcSet={imgSet('/img/studio.jpg', [600, 900, 1200], 0.8)}
                sizes="(min-width: 1024px) 40vw, 92vw"
                alt="Concept image of a portable recording rig set up in a living room"
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
              <div className="mt-3">
                <ConceptNote tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section className={`${shell} py-20 sm:py-28`}>
        <Reveal>
          <SectionHead
            eyebrow="Events"
            title="Showcases, sessions and nights out."
            lede="Live dates hosted and supported by Orlando the Martyr LLC across South Jersey."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {upcoming.map((event, index) => (
            <Reveal key={event.id} delay={index * 70} as="article">
              <div className="flex h-full flex-col border border-hairline p-7 transition-colors duration-300 hover:border-ink/40">
                <p className="eyebrow text-silver">{event.dateLabel}</p>
                <h3 className="h-display mt-4 text-[1.5rem]">{event.title}</h3>
                <p className="mt-2 text-sm text-ink/55">{event.location}</p>
                <p className="mt-5 text-sm leading-relaxed text-ink/65">{event.description}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={140} as="article">
            <div className="flex h-full flex-col justify-between border border-dashed border-hairline bg-paper-dim/40 p-7">
              <div>
                <p className="eyebrow text-silver">{eventSeries.status}</p>
                <h3 className="h-display mt-4 text-[1.5rem]">{eventSeries.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-ink/65">
                  A recurring night built around Jersey club and Latin urban sound. Dates posted as
                  the series is confirmed.
                </p>
              </div>
              <Link to="/events" className="link-underline mt-7 self-start text-sm font-semibold">
                All events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-hairline">
        <div className={`${shell} py-20 sm:py-24`}>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-silver">Working with us</p>
                <p className="h-display mt-5 max-w-[18ch] text-[2rem] uppercase sm:text-[2.75rem]">
                  Making something in South Jersey?
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className={btnSolid}>
                  Get in touch
                </Link>
                <Link to="/studio" hash="request" className={btnOutline}>
                  Book the studio
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
