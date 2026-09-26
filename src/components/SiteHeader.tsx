import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { nav } from '@/data/company'
import { shell } from './ui'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className={`${shell} flex h-16 items-center justify-between gap-6 sm:h-20`}>
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-2"
          aria-label="Orlando the Martyr LLC — home"
        >
          <span className="h-display text-[0.9375rem] uppercase leading-none sm:text-[1.0625rem]">
            Orlando the Martyr
          </span>
          <span className="eyebrow text-silver transition-colors duration-300 group-hover:text-ink">
            LLC
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow text-ink/55 transition-colors duration-300 hover:text-ink"
              activeProps={{ className: 'eyebrow text-ink' }}
              activeOptions={{ exact: item.to === '/' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/studio"
            hash="request"
            className="eyebrow rounded-full bg-ink px-4 py-2.5 text-paper transition-colors duration-300 hover:bg-ink-soft"
          >
            Book the Studio
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="eyebrow -mr-2 px-2 py-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile: full-height black sheet, one tap per destination. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-50 bg-ink px-5 pt-10 text-paper sm:top-20 lg:hidden"
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {nav.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="h-display border-b border-paper/12 py-5 text-[2rem] uppercase text-paper/85 transition-colors duration-300 active:text-paper"
              activeProps={{ className: 'h-display border-b border-paper/12 py-5 text-[2rem] uppercase text-paper' }}
              activeOptions={{ exact: item.to === '/' }}
              style={{ transitionDelay: `${index * 15}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/studio"
          hash="request"
          onClick={() => setOpen(false)}
          className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-paper px-6 py-4 text-[0.8125rem] font-semibold text-ink"
        >
          Request a Session
        </Link>
      </div>
    </header>
  )
}
