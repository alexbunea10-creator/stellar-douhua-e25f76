import { useState } from 'react'
import { field, fieldLabel, btnSolid } from './ui'
import { company } from '@/data/company'

/**
 * General inquiries form. Submits to Netlify Forms via the static skeleton at
 * public/__forms.html (a fetch to '/' would be swallowed by SSR).
 */

const FORM_NAME = 'general-inquiry'

const topics = [
  'General inquiry',
  'Collaboration / feature',
  'Studio session question',
  'Event or booking a performance',
  'Press or media',
]

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

export function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    topic: topics[0],
    artistName: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [error, setError] = useState<string | null>(null)

  const update = (key: keyof typeof fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFields((current) => ({ ...current, [key]: event.target.value }))
    setError(null)
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!fields.name.trim()) return setError('Add your name.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email))
      return setError('Add a valid email address.')
    if (!fields.message.trim()) return setError('Add a message.')

    setStatus('sending')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': FORM_NAME,
          name: fields.name,
          email: fields.email,
          topic: fields.topic,
          'artist-name': fields.artistName,
          message: fields.message,
        }),
      })
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-hairline p-8">
        <p className="eyebrow text-silver">Message sent</p>
        <p className="h-display mt-4 text-[1.75rem]">Thanks — we’ll be in touch.</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          Replies usually come from {company.email} within a few days. For anything time-sensitive,
          email us directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-7" noValidate>
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={fieldLabel}>Name *</span>
          <input type="text" value={fields.name} onChange={update('name')} className={field} />
        </label>
        <label className="block">
          <span className={fieldLabel}>Email *</span>
          <input type="email" value={fields.email} onChange={update('email')} className={field} />
        </label>
        <label className="block">
          <span className={fieldLabel}>What’s this about?</span>
          <select value={fields.topic} onChange={update('topic')} className={field}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={fieldLabel}>Artist / company name (optional)</span>
          <input
            type="text"
            value={fields.artistName}
            onChange={update('artistName')}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className={fieldLabel}>Message *</span>
        <textarea
          rows={5}
          value={fields.message}
          onChange={update('message')}
          className={`${field} resize-y`}
          placeholder="A few lines about what you’re working on or what you need."
        />
      </label>

      {error ? (
        <p role="alert" className="text-sm text-[#a8442a]">
          {error}
        </p>
      ) : null}
      {status === 'failed' ? (
        <p role="alert" className="text-sm text-[#a8442a]">
          Something went wrong sending that. Email{' '}
          <a href={`mailto:${company.email}`} className="underline">
            {company.email}
          </a>{' '}
          instead.
        </p>
      ) : null}

      <button type="submit" disabled={status === 'sending'} className={`${btnSolid} disabled:opacity-60`}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
