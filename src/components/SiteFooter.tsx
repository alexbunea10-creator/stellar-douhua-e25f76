import { Link } from '@tanstack/react-router'
import { company, nav, socials, trustNotes } from '@/data/company'
import { shell } from './ui'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className={`${shell} py-16 sm:py-20`}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="h-display text-[1.25rem] uppercase">Orlando the Martyr</span>
              <span className="eyebrow text-silver">LLC</span>
            </div>
            <p className="h-editorial mt-5 max-w-sm text-[1.5rem] text-paper/80">
              {company.tagline}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-paper/45">
              {company.base} · Serving {company.serviceArea}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-silver">Site</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm text-paper/70 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-silver">Connect</p>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.label} className="text-sm">
                  {social.url ? (
                    <a
                      href={social.url}
                      className="link-underline text-paper/70 transition-colors duration-300 hover:text-paper"
                    >
                      {social.label}
                    </a>
                  ) : (
                    <span className="text-paper/70">
                      {social.label}
                      <span className="ml-2 text-xs text-paper/35">link pending</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${company.email}`}
              className="link-underline mt-6 inline-block text-sm text-paper/70 hover:text-paper"
            >
              {company.email}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/12 pt-8">
          <ul className="grid gap-3 text-xs leading-relaxed text-paper/40 md:grid-cols-3">
            {trustNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-2 text-xs text-paper/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Orlando the Martyr LLC. All rights reserved.</p>
            <p>
              Orlando the Martyr (artist) and Orlando the Martyr LLC (company) are related but
              separate identities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
