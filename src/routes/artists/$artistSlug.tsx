import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ConceptNote, Placeholder } from '@/components/Bits'
import { btnOutline, btnSolid, shell } from '@/components/ui'
import { artists, getArtist } from '@/data/artists'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/artists/$artistSlug')({
  loader: ({ params }) => {
    const artist = getArtist(params.artistSlug)
    if (!artist) throw notFound()
    return { artist }
  },
  component: ArtistProfile,
  notFoundComponent: () => (
    <div className={`${shell} py-28`}>
      <p className="eyebrow text-silver">Not found</p>
      <h1 className="h-display mt-5 text-[2.5rem] uppercase">No such artist profile.</h1>
      <Link to="/artists" className={`${btnSolid} mt-8`}>
        Back to artists &amp; partners
      </Link>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.artist.name} — ${loaderData.artist.role} — Orlando the Martyr LLC` },
          { name: 'description', content: loaderData.artist.summary },
        ]
      : [],
  }),
})

function ArtistProfile() {
  const { artist } = Route.useLoaderData()
  const others = artists.filter((entry) => entry.slug !== artist.slug)

  return (
    <>
      <section className={`${shell} pt-10 sm:pt-14`}>
        <Link to="/artists" className="eyebrow text-silver transition-colors hover:text-ink">
          ← Artists &amp; Partners
        </Link>
      </section>

      <section className={`${shell} grid gap-12 pb-16 pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-14`}>
        <Reveal>
          <div className="relative overflow-hidden bg-paper-dim">
            <img
              src={img(artist.image, { w: 1000, h: 1250, fit: 'cover' })}
              srcSet={imgSet(artist.image, [520, 800, 1200], 0.8)}
              sizes="(min-width: 1024px) 45vw, 92vw"
              alt={`Concept portrait representing ${artist.name}`}
              fetchPriority="high"
              className="aspect-4/5 w-full object-cover"
            />
            <span
              className="absolute inset-x-0 bottom-0 h-1.5"
              style={{ backgroundColor: artist.accent }}
            />
          </div>
          <div className="mt-3">
            <ConceptNote />
          </div>
        </Reveal>

        <Reveal delay={70}>
          <p className="eyebrow" style={{ color: artist.accent }}>
            {artist.role}
          </p>
          <h1 className="h-display mt-5 text-[2.75rem] uppercase sm:text-[4rem]">{artist.name}</h1>
          <p className="eyebrow mt-5 text-silver">{artist.tag}</p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            {artist.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {artist.bioPendingReview ? (
            <p className="mt-6 text-xs leading-relaxed text-silver">
              Draft bio written in-house — to be replaced with copy {artist.name} approves.
            </p>
          ) : null}

          <div className="mt-10">
            <p className="eyebrow text-silver">Connect</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {artist.connect.map((link) => (
                <li key={link.label}>
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-[0.8125rem] font-semibold transition-all duration-300 hover:-translate-y-px hover:border-ink"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-silver">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex items-center gap-2 rounded-full border border-dashed border-hairline px-4 py-2.5 text-[0.8125rem] font-semibold text-silver"
                    >
                      {link.label}
                      <span className="text-[0.625rem] font-medium uppercase tracking-[0.16em]">
                        link pending
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Featured releases — approved promotion only */}
      <section className="border-y border-hairline bg-paper-dim/35">
        <div className={`${shell} py-16 sm:py-20`}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
              <div>
                <p className="eyebrow text-silver">Featured Releases</p>
                <p className="mt-5 text-sm leading-relaxed text-ink/60">
                  Only releases {artist.name} has approved for promotion appear here.
                </p>
              </div>
              <div>
                {artist.releases.length > 0 ? (
                  <ul className="divide-y divide-hairline border-t border-hairline">
                    {artist.releases.map((release, index) => (
                      <li
                        key={`${release.title}-${index}`}
                        className="flex items-center justify-between gap-5 py-5"
                      >
                        <div className="flex min-w-0 items-baseline gap-5">
                          <span className="eyebrow w-6 shrink-0 text-silver">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold sm:text-lg">
                              {release.title}
                            </p>
                            <p className="mt-1 text-xs text-silver">
                              {release.type} · {release.year}
                            </p>
                          </div>
                        </div>
                        {release.placeholder ? (
                          <Placeholder>Pending approval</Placeholder>
                        ) : (
                          <span
                            className="eyebrow"
                            style={{ color: artist.accent }}
                          >
                            Listen
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="border-t border-hairline pt-5 text-sm text-ink/60">
                    No approved releases listed yet.
                  </p>
                )}
                <p className="mt-6 text-xs leading-relaxed text-silver">
                  {artist.name} retains full ownership of their pre-existing music, masters and
                  merchandise rights. Collaborating with Orlando the Martyr LLC does not create a
                  label, management or distribution relationship.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Merch placeholder — structured now, built later */}
      <section className={`${shell} py-16 sm:py-20`}>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border border-dashed border-hairline p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="eyebrow text-silver">Artist Merchandise</p>
              <p className="h-display mt-3 text-[1.5rem] sm:text-[1.75rem]">
                Future collection, coming later.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
                Merch rights stay with the artist. When a collection is ready, it will appear here.
              </p>
            </div>
            <Placeholder>Not yet available</Placeholder>
          </div>
        </Reveal>
      </section>

      {/* Other artists */}
      <section className="border-t border-hairline">
        <div className={`${shell} py-16 sm:py-20`}>
          <Reveal>
            <p className="eyebrow text-silver">More of the community</p>
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {others.map((entry) => (
                <Link
                  key={entry.slug}
                  to="/artists/$artistSlug"
                  params={{ artistSlug: entry.slug }}
                  className="group block"
                >
                  <img
                    src={img(entry.image, { w: 600, h: 450, fit: 'cover', position: 'top' })}
                    alt={`Concept portrait representing ${entry.name}`}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover object-top grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0"
                  />
                  <p className="eyebrow mt-4" style={{ color: entry.accent }}>
                    {entry.role}
                  </p>
                  <p className="h-display mt-2 text-[1.25rem] uppercase">{entry.name}</p>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/studio" hash="request" className={btnSolid}>
                Book the studio
              </Link>
              <Link to="/contact" className={btnOutline}>
                Collaborate with us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
