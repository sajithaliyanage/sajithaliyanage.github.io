import { useState } from 'react'
import { useSound } from '../hooks/useSound'
import useStore from '../store/useStore'

export default function ContactMe() {
  const play = useSound()
  const { showNotification } = useStore()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSend = (e) => {
    e.preventDefault()
    play('ding')
    setSent(true)
    showNotification('Message Sent!', 'Thanks for reaching out. I\'ll get back to you soon!', '✉️')
  }

  return (
    <div className="h-full flex flex-col bg-white" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Outlook Express-style toolbar */}
      <div className="flex items-center gap-1 p-1.5 border-b border-gray-300 bg-[#ece9d8]">
        <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-gray-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a5fb4" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
          </svg>
          <span className="font-bold">New Message</span>
        </div>
        <div className="w-px h-4 bg-gray-400 mx-1" />
        <span className="text-[10px] text-gray-500">Outlook Express</span>
      </div>

      {sent ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
          <div className="text-4xl">✅</div>
          <div className="text-[14px] font-bold text-gray-800">Message Sent Successfully!</div>
          <div className="text-[11px] text-gray-500 text-center">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </div>
          <button
            onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
            className="mt-2 px-4 py-1.5 text-[11px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8]"
          >
            Compose New Message
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          {/* Contact info header */}
          <div className="p-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
            <div className="text-[13px] font-bold text-gray-800 mb-2">Get in Touch</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📧</span>
                <a href="mailto:sajithaliyanage@gmail.com" className="text-blue-600 hover:underline">sajithaliyanage@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📱</span>
                <span className="text-gray-700">+971 505628400</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">💼</span>
                <a href="https://linkedin.com/in/sajithaliyanage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/sajithaliyanage</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🐙</span>
                <a href="https://github.com/sajithaliyanage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/sajithaliyanage</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📍</span>
                <span className="text-gray-700">Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Message form */}
          <form onSubmit={handleSend} className="p-3 space-y-2">
            <div className="text-[12px] font-bold text-gray-700 mb-1 border-b border-gray-200 pb-1">
              Send me a message
            </div>

            {/* To field (read-only) */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-600 w-14 text-right shrink-0">To:</label>
              <div className="flex-1 bg-gray-100 border border-gray-300 px-2 py-1 text-[11px] text-gray-600 rounded-sm">
                sajithaliyanage@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-600 w-14 text-right shrink-0">From:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="flex-1 border border-gray-300 px-2 py-1 text-[11px] rounded-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-600 w-14 text-right shrink-0">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="flex-1 border border-gray-300 px-2 py-1 text-[11px] rounded-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-600 w-14 text-right shrink-0">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="flex-1 border border-gray-300 px-2 py-1 text-[11px] rounded-sm outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex gap-2">
              <label className="text-[11px] text-gray-600 w-14 text-right shrink-0 pt-1">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                rows={6}
                className="flex-1 border border-gray-300 px-2 py-1 text-[11px] rounded-sm outline-none focus:border-blue-400 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-1 text-[11px] bg-[#316ac5] text-white border border-[#1a4a9e] rounded-sm cursor-pointer hover:bg-[#2860b8] flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#ece9d8] border-t border-gray-300 text-[10px] text-gray-600">
        <span>Ready</span>
        <span>Outlook Express</span>
      </div>
    </div>
  )
}
