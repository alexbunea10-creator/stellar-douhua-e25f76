import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ConceptNote, SectionHead } from '@/components/Bits'
import { btnOutline, btnSolid, shell } from '@/components/ui'
import { company, trustNotes } from '@/data/company'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      { title: 'Our Story — Orlando the Martyr LLC' },
      {
        name: 'description',
        content:
          'Orlando the Martyr LLC is an independent music and creative company founded by Orlando Ruiz in Wildwood, New Jersey.',
      },
    ],
  }),
})

const lanes = [
  {
    title: 'Original Releases',
    body: 'Music written and recorded under the Orlando the Martyr artist project and released independently.',
  },
  {
    title: 'Artist Collaborations',
    body: 'Records, features and sessions made with independent artists and creative partners across the region.',
  },
  {
    title: 'Live Events',
    body: 'Showcases and event nights built to put South Jersey independent artists in front of a room.',
  },
  {
    title: 'Recording Services',
    body: 'The OTM Mobile Studio — accessible, come-to-you recording sessions at introductory rates.',
  },
]

function About() {
  return (
    <>
      <section className={`${shell} pb-16 pt-20 sm:pb-20 sm:pt-28`}>
        <Reveal>
          <p className="eyebrow text-silver">Our Story</p>
          <h1 className="h-display mt-6 max-w-[16ch] text-[3rem] uppercase sm:text-[4.5rem] lg:text-[5.5rem]">
            {company.storyTitle}
          </h1>
        </Reveal>
      </section>

      <Reveal>
        <div className={shell}>
          <img
            src={img('/img/about.jpg', { w: 1800, h: 900, fit: 'cover' })}
            srcSet={imgSet('/img/about.jpg', [768, 1200, 1800], 2)}
            sizes="100vw"
            alt="Concept image: notebook, headphones and keys on a hardwood floor"
            className="aspect-16/9 w-full object-cover sm:aspect-2/1"
          />
          <div className="mt-3">
            <ConceptNote />
          </div>
        </div>
      </Reveal>

      <section className={`${shell} py-20 sm:py-28`}>
        <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-silver">The Company</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-7 text-lg leading-relaxed text-ink/75 sm:text-xl">
              <p className="h-editorial text-[1.75rem] leading-[1.25] text-ink sm:text-[2.25rem]">
                Orlando the Martyr LLC is an independent music and creative company founded by
                Orlando Ruiz in Wildwood, New Jersey.
              </p>
              <p>
                What began as a personal journey in music has grown into a vision of connecting
                independent artists, creating opportunities, and contributing to the development of
                South Jersey’s music scene.
              </p>
              <p>
                Through original releases, artist collaborations, live events, and accessible
                recording services, the company aims to provide a platform where creativity and
                community come together.
              </p>
              <p>
                Rooted in South Jersey and influenced by a diverse range of musical styles, Orlando
                the Martyr LLC is building a space for independent artists to create, connect, and
                grow.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-hairline bg-paper-dim/35">
        <div className={`${shell} py-20 sm:py-24`}>
          <Reveal>
            <SectionHead eyebrow="What we do" title="Four lanes, one company." />
          </Reveal>
          <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {lanes.map((lane, index) => (
              <Reveal key={lane.title} delay={index * 60}>
                <div className="h-full bg-paper p-8 sm:p-10">
                  <p className="eyebrow text-silver">0{index + 1}</p>
                  <h3 className="h-display mt-4 text-[1.5rem] sm:text-[1.75rem]">{lane.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
                    {lane.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder — kept visibly separate from the company identity above. */}
      <section className={`${shell} py-20 sm:py-28`}>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden">
              <img
                src={img('/img/founder.jpg', { w: 900, h: 1125, fit: 'cover' })}
                srcSet={imgSet('/img/founder.jpg', [520, 800, 1100], 0.8)}
                sizes="(min-width: 1024px) 38vw, 92vw"
                alt="Concept portrait representing founder Orlando Ruiz"
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 h-1 bg-[#b5502a]" />
            </div>
            <div className="mt-3">
              <ConceptNote />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow text-silver">The Founder</p>
            <h2 className="h-display mt-5 text-[2.25rem] uppercase sm:text-[3rem]">
              Orlando Ruiz
            </h2>
            <p className="eyebrow mt-4 text-silver">Founder · Wildwood, NJ</p>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              <p>
                Orlando Ruiz founded Orlando the Martyr LLC out of his own work as an independent
                recording artist. Learning the process firsthand — writing, recording, releasing,
                performing — made the gaps obvious: not enough affordable places to record, not
                enough rooms to perform in, not enough connection between artists working a few
                towns apart.
              </p>
              <p>
                He runs the company’s releases, collaborations, events and studio sessions, and
                still records and performs as the artist Orlando the Martyr.
              </p>
            </div>

            {/* The company / the artist distinction, stated plainly. */}
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              <div className="bg-paper p-6">
                <p className="eyebrow text-silver">The Company</p>
                <p className="mt-3 text-sm font-semibold">Orlando the Martyr LLC</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Releases, collaborations, events and mobile recording services.
                </p>
              </div>
              <div className="bg-paper p-6">
                <p className="eyebrow text-silver">The Artist</p>
                <p className="mt-3 text-sm font-semibold">Orlando the Martyr</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  The personal artist project of founder Orlando Ruiz. Same name, different role.
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/artists/$artistSlug"
                params={{ artistSlug: 'orlando-the-martyr' }}
                className={btnSolid}
              >
                Artist profile: Orlando the Martyr
              </Link>
              <Link to="/contact" className={btnOutline}>
                Contact the company
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className={`${shell} py-16 sm:py-20`}>
          <Reveal>
            <p className="eyebrow text-silver">How we work</p>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {trustNotes.map((note) => (
                <li key={note} className="border-t border-paper/15 pt-5 text-sm leading-relaxed text-paper/70">
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
