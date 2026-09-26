import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ConceptNote } from '@/components/Bits'
import { btnOutline, shell } from '@/components/ui'
import { artists, artistsIntro } from '@/data/artists'
import { trustNotes } from '@/data/company'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/artists/')({
  component: ArtistsIndex,
  head: () => ({
    meta: [
      { title: 'Artists & Partners — Orlando the Martyr LLC' },
      { name: 'description', content: artistsIntro },
    ],
  }),
})

function ArtistsIndex() {
  return (
    <>
      <section className={`${shell} pb-14 pt-20 sm:pt-28`}>
        <Reveal>
          <p className="eyebrow text-silver">Artists &amp; Partners</p>
          <h1 className="h-display mt-6 max-w-[18ch] text-[2.75rem] uppercase sm:text-[4rem] lg:text-[5rem]">
            A growing creative community.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            {artistsIntro}
          </p>
        </Reveal>
      </section>

      <section id="releases" className={`${shell} pb-20 sm:pb-28`}>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, index) => (
            <Reveal key={artist.slug} delay={index * 70} as="article">
              <Link
                to="/artists/$artistSlug"
                params={{ artistSlug: artist.slug }}
                className="group block"
              >
                <div className="relative overflow-hidden bg-paper-dim">
                  <img
                    src={img(artist.image, { w: 700, h: 875, fit: 'cover' })}
                    srcSet={imgSet(artist.image, [400, 700, 1000], 0.8)}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    alt={`Concept portrait representing ${artist.name}`}
                    loading={index > 1 ? 'lazy' : undefined}
                    className="aspect-4/5 w-full object-cover grayscale-[0.35] transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
                    style={{ backgroundColor: artist.accent }}
                  />
                </div>

                <p className="eyebrow mt-5" style={{ color: artist.accent }}>
                  {artist.role}
                </p>
                <h2 className="h-display mt-3 text-[1.625rem] uppercase">{artist.name}</h2>
                <p className="mt-2 text-xs tracking-wide text-silver">{artist.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{artist.summary}</p>
                <span className="link-underline mt-5 inline-block text-[0.8125rem] font-semibold">
                  View profile
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <ConceptNote />
        </div>
      </section>

      <section className="border-t border-hairline bg-paper-dim/35">
        <div className={`${shell} py-16 sm:py-20`}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-silver">Collaboration, not contracts</p>
                <p className="h-editorial mt-5 text-[1.5rem] sm:text-[2rem]">
                  Everyone keeps what they came in with.
                </p>
              </div>
              <div>
                <ul className="space-y-5">
                  {trustNotes.map((note) => (
                    <li
                      key={note}
                      className="border-t border-hairline pt-5 text-sm leading-relaxed text-ink/70"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`${btnOutline} mt-9`}>
                  Collaboration inquiries
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
