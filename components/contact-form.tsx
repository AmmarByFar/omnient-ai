'use client'

import { useState } from 'react'
import { sendEmail } from './utils/email'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await sendEmail({
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@omniant.studio',
        from: formData.email,
        subject: `Contact Form Submission from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`,
        message: `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      })

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again later.')
      console.error('Error sending message:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="name">
            Name <span className="text-rose-500">*</span>
          </label>
          <input id="name" className="form-input w-full bg-slate-800/30 border border-slate-700 focus:border-purple-500 text-slate-300" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="email">
            Email <span className="text-rose-500">*</span>
          </label>
          <input id="email" className="form-input w-full bg-slate-800/30 border border-slate-700 focus:border-purple-500 text-slate-300" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="company">
            Company
          </label>
          <input id="company" className="form-input w-full bg-slate-800/30 border border-slate-700 focus:border-purple-500 text-slate-300" type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="message">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea id="message" className="form-textarea w-full bg-slate-800/30 border border-slate-700 focus:border-purple-500 text-slate-300" rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
        </div>
      </div>
      <div className="mt-6">
        {status === 'error' && <div className="text-rose-500 text-sm mb-4">{errorMessage}</div>}
        {status === 'success' && <div className="text-green-500 text-sm mb-4">Message sent successfully!</div>}
        <button disabled={status === 'loading'} className={`btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
          {status !== 'loading' && <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>}
        </button>
      </div>
    </form>
  )
}
