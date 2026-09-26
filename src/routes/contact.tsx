import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'
import { shell } from '@/components/ui'
import { company, socials, trustNotes } from '@/data/company'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      { title: 'Contact — Orlando the Martyr LLC' },
      {
        name: 'description',
        content:
          'General, collaboration and business inquiries for Orlando the Martyr LLC — an independent music and creative company in Wildwood, New Jersey.',
      },
    ],
  }),
})

function Contact() {
  return (
    <>
      <section className={`${shell} pb-12 pt-20 sm:pt-28`}>
        <Reveal>
          <p className="eyebrow text-silver">Contact</p>
          <h1 className="h-display mt-6 max-w-[16ch] text-[2.75rem] uppercase sm:text-[4rem] lg:text-[5rem]">
            Let’s talk.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Questions, collaborations, events, studio sessions — start here and we’ll route it to
            the right place.
          </p>
        </Reveal>
      </section>

      <section className={`${shell} pb-20 sm:pb-28`}>
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-silver">General inquiries</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="space-y-10">
              {/* Collaboration / business inquiries, called out separately. */}
              <div className="bg-ink p-7 text-paper">
                <p className="eyebrow text-silver">Collaboration &amp; business</p>
                <p className="h-display mt-4 text-[1.5rem]">
                  Working together, not signing anything.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/65">
                  For features, joint releases, events, partnerships or anything business-side,
                  email us directly with what you’re working on, links to your music, and what
                  you’re looking for. Reaching out doesn’t create a label, management or
                  distribution relationship — it starts a conversation.
                </p>
                <a
                  href={`mailto:${company.email}?subject=Collaboration%20inquiry`}
                  className="link-underline mt-6 inline-block text-sm font-semibold text-paper"
                >
                  {company.email}
                </a>
              </div>

              <div className="border border-hairline p-7">
                <p className="eyebrow text-silver">Studio sessions</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  Booking the OTM Mobile Studio? The request form collects everything we need to
                  check availability and travel.
                </p>
                <Link
                  to="/studio"
                  hash="request"
                  className="link-underline mt-5 inline-block text-sm font-semibold"
                >
                  Request a session
                </Link>
                <p className="mt-5 text-xs text-silver">
                  Session questions: {company.bookingEmail}
                </p>
              </div>

              <div>
                <p className="eyebrow text-silver">Follow</p>
                <ul className="mt-5 space-y-3">
                  {socials.map((social) => (
                    <li
                      key={social.label}
                      className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3 text-sm"
                    >
                      <span className="font-semibold">{social.label}</span>
                      {social.url ? (
                        <a href={social.url} className="link-underline text-ink/65">
                          {social.handle}
                        </a>
                      ) : (
                        <span className="text-xs text-silver">link pending</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow text-silver">Based in</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {company.base}
                  <br />
                  Serving {company.serviceArea}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-paper-dim/35">
        <div className={`${shell} py-16`}>
          <Reveal>
            <p className="eyebrow text-silver">Before you write</p>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {trustNotes.map((note) => (
                <li
                  key={note}
                  className="border-t border-hairline pt-5 text-sm leading-relaxed text-ink/70"
                >
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
