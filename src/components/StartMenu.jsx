import { useRef, useEffect, useState } from 'react'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

// SVG icons that mimic the XP start menu icons
const icons = {
  internet: (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <circle cx="16" cy="16" r="14" fill="url(#ieGrad)"/>
      <path d="M6 16 C6 16 10 8 16 8 C22 8 26 16 26 16 C26 16 22 24 16 24 C10 24 6 16 6 16Z" fill="#00a0e4" stroke="white" strokeWidth="1"/>
      <ellipse cx="16" cy="16" rx="5" ry="10" fill="none" stroke="white" strokeWidth="1"/>
      <line x1="4" y1="16" x2="28" y2="16" stroke="white" strokeWidth="0.8"/>
      <line x1="16" y1="4" x2="16" y2="28" stroke="white" strokeWidth="0.8"/>
      <defs><radialGradient id="ieGrad"><stop offset="0%" stopColor="#44b8ff"/><stop offset="100%" stopColor="#0068d6"/></radialGradient></defs>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="2" y="7" width="28" height="18" rx="2" fill="#5b8fcc"/>
      <path d="M2 9 L16 18 L30 9" fill="none" stroke="#f0e8d0" strokeWidth="2"/>
      <rect x="4" y="9" width="24" height="14" rx="1" fill="#f5edd8"/>
      <path d="M4 9 L16 19 L28 9" fill="none" stroke="#c0a870" strokeWidth="1"/>
    </svg>
  ),
  mediaplayer: (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <circle cx="16" cy="16" r="13" fill="#1a1a2e"/>
      <circle cx="16" cy="16" r="12" fill="url(#mpGrad)" stroke="#444" strokeWidth="0.5"/>
      <polygon points="13,10 23,16 13,22" fill="white"/>
      <circle cx="16" cy="16" r="12" fill="none" stroke="#ff6600" strokeWidth="1.5"/>
      <defs><radialGradient id="mpGrad"><stop offset="0%" stopColor="#333"/><stop offset="100%" stopColor="#111"/></radialGradient></defs>
    </svg>
  ),
  myDocuments: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <path d="M3 8 L3 28 L29 28 L29 12 L16 12 L13 8 Z" fill="#f7c948" stroke="#c9a020" strokeWidth="0.5"/>
      <path d="M3 12 L29 12 L29 28 L3 28 Z" fill="#ffe588"/>
      <rect x="8" y="15" width="12" height="2" rx="0.5" fill="rgba(0,0,0,0.08)"/>
      <rect x="8" y="19" width="8" height="2" rx="0.5" fill="rgba(0,0,0,0.06)"/>
    </svg>
  ),
  myPictures: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <path d="M3 8 L3 28 L29 28 L29 12 L16 12 L13 8 Z" fill="#48b748" stroke="#2a8a2a" strokeWidth="0.5"/>
      <path d="M3 12 L29 12 L29 28 L3 28 Z" fill="#7dd87d"/>
      <circle cx="12" cy="19" r="3" fill="#ffd700" opacity="0.5"/>
      <path d="M8 26 L16 18 L20 22 L24 17 L28 26 Z" fill="#2a8a2a" opacity="0.4"/>
    </svg>
  ),
  myMusic: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <path d="M3 8 L3 28 L29 28 L29 12 L16 12 L13 8 Z" fill="#c75050" stroke="#a03030" strokeWidth="0.5"/>
      <path d="M3 12 L29 12 L29 28 L3 28 Z" fill="#e88888"/>
      <path d="M20 15 L20 24" stroke="#a03030" strokeWidth="1.5"/>
      <circle cx="16" cy="24" r="3" fill="#a03030" opacity="0.6"/>
      <circle cx="20" cy="15" r="1.5" fill="#a03030" opacity="0.6"/>
    </svg>
  ),
  myComputer: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <rect x="4" y="3" width="24" height="17" rx="1.5" fill="#1a5fb4" stroke="#0d3573" strokeWidth="1"/>
      <rect x="6" y="5" width="20" height="13" fill="#87ceeb"/>
      <rect x="10" y="20" width="12" height="3" fill="#888"/>
      <rect x="6" y="23" width="20" height="2.5" rx="1" fill="#aaa"/>
    </svg>
  ),
  controlPanel: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <rect x="3" y="3" width="26" height="26" rx="3" fill="#6b8fc7" stroke="#4a6ea0" strokeWidth="1"/>
      <rect x="6" y="6" width="8" height="8" rx="1" fill="#fff" opacity="0.8"/>
      <rect x="18" y="6" width="8" height="8" rx="1" fill="#fff" opacity="0.8"/>
      <rect x="6" y="18" width="8" height="8" rx="1" fill="#fff" opacity="0.8"/>
      <rect x="18" y="18" width="8" height="8" rx="1" fill="#fff" opacity="0.8"/>
      <circle cx="10" cy="10" r="2" fill="#e05050"/>
      <circle cx="22" cy="10" r="2" fill="#50a050"/>
      <circle cx="10" cy="22" r="2" fill="#5070d0"/>
      <circle cx="22" cy="22" r="2" fill="#d0a030"/>
    </svg>
  ),
  helpSupport: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="13" fill="#3474d4"/>
      <circle cx="16" cy="16" r="11" fill="url(#helpGrad)" stroke="#2060b0" strokeWidth="0.5"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="serif">?</text>
      <defs><radialGradient id="helpGrad"><stop offset="0%" stopColor="#5090e8"/><stop offset="100%" stopColor="#2060b0"/></radialGradient></defs>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="13" cy="13" r="8" fill="none" stroke="#d4a020" strokeWidth="3"/>
      <line x1="19" y1="19" x2="28" y2="28" stroke="#8b6914" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="13" cy="13" r="5" fill="#f5f0e0" opacity="0.3"/>
    </svg>
  ),
}

export default function StartMenu() {
  const { closeStartMenu, openWindow, setSystemState, closeAllWindows, showErrorDialog, showTurnOffDialog, showLogOffDialog } = useStore()
  const play = useSound()
  const ref = useRef(null)
  const [showAllPrograms, setShowAllPrograms] = useState(false)

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !e.target.closest('.xp-start-btn')) {
        closeStartMenu()
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [closeStartMenu])

  const handleOpen = (id, label, iconKey) => {
    play('open')
    const iconMap = {
      'my-computer': 'computer',
      'my-documents': 'folder',
      'my-projects': 'projects',
      'about-me': 'about',
      'recycle-bin': 'recycle',
    }
    openWindow({ id, title: label, icon: iconMap[id] || 'folder', component: id })
    closeStartMenu()
  }

  const handleLogoff = () => {
    play('click')
    closeStartMenu()
    showLogOffDialog()
  }

  const handleShutdown = () => {
    play('click')
    closeStartMenu()
    showTurnOffDialog()
  }

  return (
    <div
      ref={ref}
      className="absolute left-0 z-[8999]"
      style={{
        bottom: '0px',
        width: '400px',
        borderRadius: '6px 6px 0 0',
        overflow: 'visible',
        boxShadow: '3px -2px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,50,120,0.5)',
        border: '2px solid #4080d0',
        borderBottom: 'none',
      }}
    >
      {/* ===== HEADER - User info ===== */}
      <div
        className="flex items-center gap-3 px-3 py-2"
        style={{
          background: 'linear-gradient(180deg, #2e6cda 0%, #1f5bc6 30%, #1a52bb 60%, #1a4fba 100%)',
          borderBottom: '1px solid #0e3a8c',
          borderRadius: '4px 4px 0 0',
        }}
      >
        {/* User avatar */}
        <div className="w-12 h-12 rounded overflow-hidden shrink-0" style={{
          border: '2px solid rgba(255,255,255,0.5)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}>
          <img src="/profile.jpeg" alt="Sajitha Liyanage" className="w-full h-full" style={{ objectFit: 'cover' }} draggable={false} />
        </div>
        <span className="text-white font-bold text-[14px]" style={{
          fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
          textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
        }}>
          Sajitha Liyanage
        </span>
      </div>

      {/* ===== MENU BODY - Two columns ===== */}
      <div className="flex">
        {/* ---- LEFT COLUMN (White) - Pinned programs ---- */}
        <div className="py-2" style={{ width: '210px', background: '#fff' }}>
          {/* Internet */}
          <MenuItem
            icon={icons.internet}
            label="Internet"
            sublabel="Internet Explorer"
            bold
            onClick={() => handleOpen('my-projects', 'My Projects')}
          />
          {/* E-mail */}
          <MenuItem
            icon={icons.email}
            label="E-mail"
            sublabel="Outlook Express"
            bold
            onClick={() => handleOpen('about-me', 'About Me')}
          />

          {/* Separator */}
          <div className="my-2 mx-3 h-px bg-gray-200" />

          {/* Windows Media Player */}
          <MenuItem
            icon={icons.mediaplayer}
            label="Windows Media Player"
            onClick={() => handleOpen('my-computer', 'My Computer')}
          />

          {/* Separator */}
          <div className="my-2 mx-3 h-px bg-gray-200" />

          {/* Social Links */}
          <SocialLink
            icon={<svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
            label="LinkedIn"
            url="https://linkedin.com/in/sajithaliyanage"
          />
          <SocialLink
            icon={<svg viewBox="0 0 24 24" className="w-5 h-5" fill="#e4405f"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>}
            label="Instagram"
            url="https://instagram.com/sajithaliyanage"
          />
          <SocialLink
            icon={<svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
            label="Facebook"
            url="https://facebook.com/sajithaliyanage"
          />

          {/* Spacer to push All Programs to bottom */}
          <div style={{ height: '60px' }} />

          {/* Separator before All Programs */}
          <div className="my-1 mx-3 h-px bg-gray-200" />

          {/* All Programs */}
          <div
            className="relative"
            onMouseEnter={() => setShowAllPrograms(true)}
            onMouseLeave={() => setShowAllPrograms(false)}
          >
            <div
              className={`flex items-center justify-between px-4 py-1.5 cursor-default ${showAllPrograms ? 'bg-[#2f71cd]' : ''}`}
              onClick={() => setShowAllPrograms(v => !v)}
            >
              <span className={`text-[12px] font-bold ${showAllPrograms ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
                All Programs
              </span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <polygon points="5,2 12,8 5,14" fill={showAllPrograms ? '#fff' : '#2d8e2d'}/>
              </svg>
            </div>

            {/* All Programs flyout */}
            {showAllPrograms && (
              <div
                className="absolute py-1"
                style={{
                  left: '100%',
                  bottom: 0,
                  width: '200px',
                  background: '#fff',
                  border: '2px solid #4080d0',
                  borderRadius: '0 4px 4px 0',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.3)',
                  zIndex: 9999,
                }}
              >
                <FlyoutItem
                  label="Notepad"
                  onClick={() => handleOpen('notepad', 'Notepad')}
                />
                <FlyoutItem
                  label="Calculator"
                  disabled
                  onClick={() => {
                    showErrorDialog('Calculator', 'Calculator is not yet implemented.', 'error')
                    closeStartMenu()
                  }}
                />
                <FlyoutItem
                  label="Command Prompt"
                  disabled
                  onClick={() => {
                    showErrorDialog('Command Prompt', 'Command Prompt is not yet implemented.', 'error')
                    closeStartMenu()
                  }}
                />
                {/* Separator */}
                <div className="my-1 mx-3 h-px bg-gray-200" />
                <FlyoutItem
                  label="My Projects"
                  onClick={() => handleOpen('my-projects', 'My Projects')}
                />
                <FlyoutItem
                  label="About Me"
                  onClick={() => handleOpen('about-me', 'About Me')}
                />
                {/* Separator */}
                <div className="my-1 mx-3 h-px bg-gray-200" />
                <FlyoutItem
                  label="Startup"
                  disabled
                />
              </div>
            )}
          </div>
        </div>

        {/* Column separator */}
        <div style={{ width: '1px', background: '#d6dce8' }} />

        {/* ---- RIGHT COLUMN (Light blue) ---- */}
        <div className="py-2" style={{ width: '189px', background: '#d3e5fa' }}>
          <RightMenuItem icon={icons.myDocuments} label="My Documents" bold onClick={() => handleOpen('my-documents', 'My Documents')} />
          <RightMenuItem icon={icons.myPictures} label="My Pictures" bold onClick={() => handleOpen('my-documents', 'My Documents')} />
          <RightMenuItem icon={icons.myMusic} label="My Music" bold onClick={() => handleOpen('my-documents', 'My Documents')} />
          <RightMenuItem icon={icons.myComputer} label="My Computer" bold onClick={() => handleOpen('my-computer', 'My Computer')} />

          {/* Separator */}
          <div className="my-2 mx-3 h-px" style={{ background: '#b0c4e0' }} />

          <RightMenuItem icon={icons.controlPanel} label="Control Panel" onClick={() => handleOpen('my-computer', 'My Computer')} />

          {/* Separator */}
          <div className="my-2 mx-3 h-px" style={{ background: '#b0c4e0' }} />

          <RightMenuItem icon={icons.helpSupport} label="Help and Support" onClick={() => handleOpen('about-me', 'About Me')} />
          <RightMenuItem icon={icons.search} label="Search" onClick={() => handleOpen('my-projects', 'My Projects')} />
          <RightMenuItem
            icon={
              <svg viewBox="0 0 32 32" className="w-7 h-7">
                <rect x="3" y="6" width="26" height="20" rx="2" fill="#e8e4d8" stroke="#888" strokeWidth="1"/>
                <rect x="5" y="8" width="22" height="14" rx="1" fill="#fff"/>
                <rect x="7" y="18" width="8" height="3" rx="1" fill="#ddd"/>
                <text x="16" y="15" textAnchor="middle" fill="#333" fontSize="7" fontFamily="Tahoma">Run</text>
              </svg>
            }
            label="Run..."
            onClick={() => {
              play('open')
              openWindow({ id: 'run-dialog', title: 'Run', icon: 'run', component: 'run-dialog' })
              closeStartMenu()
            }}
          />
        </div>
      </div>

      {/* ===== FOOTER - Log Off / Shut Down ===== */}
      <div
        className="flex items-center justify-center gap-4 py-2"
        style={{
          background: 'linear-gradient(180deg, #3474d4 0%, #2460c0 30%, #1a52b4 60%, #1a4eb0 100%)',
          borderTop: '1px solid #0e3a8c',
        }}
      >
        {/* Log Off button */}
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer hover:underline"
          onClick={handleLogoff}
        >
          <img src="/icons/LogOff.ico" alt="Log Off" width="24" height="24" style={{ objectFit: 'contain' }} />
          <span className="text-white text-[12px]" style={{
            fontFamily: 'Tahoma, sans-serif',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
          }}>Log Off</span>
        </button>

        {/* Turn Off Computer button */}
        <button
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer hover:underline"
          onClick={handleShutdown}
        >
          <img src="/icons/TurnOff.ico" alt="Turn Off" width="24" height="24" style={{ objectFit: 'contain' }} />
          <span className="text-white text-[12px]" style={{
            fontFamily: 'Tahoma, sans-serif',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
          }}>Turn Off Computer</span>
        </button>
      </div>
    </div>
  )
}

// ---- Left column menu item ----
function MenuItem({ icon, label, sublabel, bold, onClick }) {
  return (
    <button
      className="w-full flex items-center gap-2.5 px-3 py-1 hover:bg-[#2f71cd] group cursor-pointer bg-transparent border-none text-left"
      onClick={onClick}
    >
      <div className="shrink-0 w-8 h-8 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-[12px] group-hover:text-white truncate ${bold ? 'font-bold text-gray-900' : 'text-gray-800'}`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] text-gray-500 group-hover:text-blue-100 truncate" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {sublabel}
          </span>
        )}
      </div>
    </button>
  )
}

// ---- All Programs flyout item ----
function FlyoutItem({ label, disabled, onClick }) {
  return (
    <button
      className={`w-full flex items-center gap-2 px-4 py-1 hover:bg-[#2f71cd] group bg-transparent border-none text-left cursor-${disabled && !onClick ? 'default' : 'pointer'}`}
      onClick={onClick}
    >
      <span
        className={`text-[12px] group-hover:text-white truncate ${disabled ? 'text-gray-400' : 'text-gray-800'}`}
        style={{ fontFamily: 'Tahoma, sans-serif' }}
      >
        {label}
      </span>
    </button>
  )
}

// ---- Right column menu item ----
function RightMenuItem({ icon, label, bold, onClick }) {
  return (
    <button
      className="w-full flex items-center gap-2.5 px-3 py-1 hover:bg-[#2f71cd] group cursor-pointer bg-transparent border-none text-left"
      onClick={onClick}
    >
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {icon}
      </div>
      <span className={`text-[12px] group-hover:text-white truncate ${bold ? 'font-bold text-gray-800' : 'text-gray-700'}`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {label}
      </span>
    </button>
  )
}

// ---- Social link item for left column ----
function SocialLink({ icon, label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center gap-2.5 px-3 py-1 hover:bg-[#2f71cd] group cursor-pointer no-underline"
    >
      <div className="shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] text-gray-700 group-hover:text-white" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {label}
      </span>
    </a>
  )
}
