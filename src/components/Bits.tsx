import { conceptImageryNote } from '@/data/company'

/** Small repeated pieces: section headers, notes, tags. */

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
}: {
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="eyebrow text-silver">{eyebrow}</p> : null}
      <h2 className="h-display mt-4 text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">{title}</h2>
      {lede ? (
        <p className="mt-6 text-base leading-relaxed text-ink/65 sm:text-lg">{lede}</p>
      ) : null}
    </div>
  )
}

export function ConceptNote({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`text-[0.6875rem] leading-relaxed ${
        tone === 'dark' ? 'text-paper/40' : 'text-silver'
      }`}
    >
      {conceptImageryNote}
    </p>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow rounded-full border border-ink/15 px-3 py-1.5 text-ink/60">
      {children}
    </span>
  )
}

export function Placeholder({ children = 'Placeholder' }: { children?: React.ReactNode }) {
  return (
    <span className="eyebrow rounded-sm bg-paper-dim px-2 py-1 text-[0.5625rem] text-silver">
      {children}
    </span>
  )
}
