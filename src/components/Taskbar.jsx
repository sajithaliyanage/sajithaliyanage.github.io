import { useState, useEffect, useRef } from 'react'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

function XPFlagMini() {
  return <img src="/xp-logo.png" alt="" width="20" height="20" style={{ objectFit: 'contain' }} />
}

function VolumePopup({ onClose }) {
  const { soundEnabled, toggleSound, volumeLevel, setVolumeLevel } = useStore()
  const play = useSound()
  const ref = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute bottom-full right-0 mb-1"
      style={{
        width: '60px',
        background: '#ece9d8',
        border: '1px solid #808080',
        borderRadius: '3px',
        boxShadow: '2px -2px 6px rgba(0,0,0,0.2)',
        padding: '8px 6px',
        fontFamily: 'Tahoma, sans-serif',
        zIndex: 9999,
      }}
    >
      <div className="text-[9px] text-gray-600 text-center mb-1">Volume</div>

      {/* Vertical slider */}
      <div className="flex flex-col items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={volumeLevel}
          onChange={(e) => setVolumeLevel(Number(e.target.value))}
          className="cursor-pointer"
          style={{
            writingMode: 'vertical-lr',
            direction: 'rtl',
            height: '80px',
            width: '20px',
            appearance: 'auto',
          }}
        />
      </div>

      {/* Mute checkbox */}
      <label className="flex items-center gap-1 mt-2 cursor-pointer justify-center">
        <input
          type="checkbox"
          checked={!soundEnabled}
          onChange={() => {
            toggleSound()
            if (soundEnabled) {
              // Will be muted after toggle
            } else {
              play('click')
            }
          }}
          className="cursor-pointer"
          style={{ width: '12px', height: '12px' }}
        />
        <span className="text-[9px] text-gray-700">Mute</span>
      </label>
    </div>
  )
}

function ClockPopup({ time, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div
      ref={ref}
      className="absolute bottom-full right-0 mb-1"
      style={{
        width: '220px',
        background: '#ece9d8',
        border: '1px solid #808080',
        borderRadius: '3px',
        boxShadow: '2px -2px 6px rgba(0,0,0,0.2)',
        padding: '8px',
        fontFamily: 'Tahoma, sans-serif',
        zIndex: 9999,
      }}
    >
      {/* Date display */}
      <div className="text-center mb-2">
        <div className="text-[11px] font-bold text-gray-800">
          {dayNames[time.getDay()]}
        </div>
        <div className="text-[10px] text-gray-600">
          {monthNames[time.getMonth()]} {time.getDate()}, {time.getFullYear()}
        </div>
      </div>

      {/* Simple analog clock face */}
      <div className="flex justify-center mb-2">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="white" stroke="#808080" strokeWidth="2"/>
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * Math.PI / 180
            const x1 = 50 + 38 * Math.cos(angle)
            const y1 = 50 + 38 * Math.sin(angle)
            const x2 = 50 + 42 * Math.cos(angle)
            const y2 = 50 + 42 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2"/>
          })}
          {/* Hour hand */}
          {(() => {
            const h = time.getHours() % 12
            const m = time.getMinutes()
            const angle = ((h + m / 60) * 30 - 90) * Math.PI / 180
            const x = 50 + 25 * Math.cos(angle)
            const y = 50 + 25 * Math.sin(angle)
            return <line x1="50" y1="50" x2={x} y2={y} stroke="#333" strokeWidth="3" strokeLinecap="round"/>
          })()}
          {/* Minute hand */}
          {(() => {
            const angle = (time.getMinutes() * 6 - 90) * Math.PI / 180
            const x = 50 + 35 * Math.cos(angle)
            const y = 50 + 35 * Math.sin(angle)
            return <line x1="50" y1="50" x2={x} y2={y} stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          })()}
          {/* Second hand */}
          {(() => {
            const angle = (time.getSeconds() * 6 - 90) * Math.PI / 180
            const x = 50 + 37 * Math.cos(angle)
            const y = 50 + 37 * Math.sin(angle)
            return <line x1="50" y1="50" x2={x} y2={y} stroke="red" strokeWidth="1" strokeLinecap="round"/>
          })()}
          <circle cx="50" cy="50" r="3" fill="#333"/>
        </svg>
      </div>

      <div className="text-center text-[10px] text-gray-600">
        {time.toLocaleTimeString()}
      </div>
    </div>
  )
}

export default function Taskbar() {
  const { windows, activeWindowId, focusWindow, minimizeWindow, toggleStartMenu, startMenuOpen, soundEnabled } = useStore()
  const play = useSound()
  const [time, setTime] = useState(new Date())
  const [showVolume, setShowVolume] = useState(false)
  const [showClock, setShowClock] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (d) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const handleTaskClick = (win) => {
    play('click')
    if (activeWindowId === win.id && !win.minimized) {
      minimizeWindow(win.id)
    } else {
      focusWindow(win.id)
    }
  }

  return (
    <div className="flex items-stretch relative shrink-0" style={{ height: '30px', zIndex: 9000 }}>
      {/* Full taskbar background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #3168d5 0%, #4e8cea 3%, #2456c7 6%, #1a4abe 10%, #1950c3 15%, #1d57ca 25%, #1f5bce 40%, #2060d1 55%, #1f5dce 65%, #1c56c8 78%, #1a50c1 85%, #1a4fbd 92%, #1b4ec0 100%)',
      }} />

      {/* Start Button */}
      <button
        className="xp-start-btn relative flex items-center gap-1.5 px-4 border-none cursor-pointer shrink-0"
        onClick={() => { play('click'); toggleStartMenu() }}
        style={{
          height: '30px',
          fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
          background: startMenuOpen
            ? 'linear-gradient(180deg, #2c8a2c 0%, #288428 5%, #237e23 10%, #1e7a1e 30%, #1a751a 50%, #197419 60%, #177117 80%, #146e14 90%, #126a12 100%)'
            : undefined,
        }}
      >
        <XPFlagMini />
        <span className="text-white font-bold text-[13px] italic" style={{
          textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
          letterSpacing: '0.5px',
        }}>
          start
        </span>
      </button>

      {/* Quick Launch separator */}
      <div className="relative flex items-center px-1">
        <div className="h-5" style={{ width: '2px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
      </div>

      {/* Window buttons area */}
      <div className="flex-1 relative flex items-center gap-[2px] px-1 overflow-hidden">
        {windows.map((win) => {
          const isActive = activeWindowId === win.id && !win.minimized
          return (
            <button
              key={win.id}
              onClick={() => handleTaskClick(win)}
              className="flex items-center gap-1.5 cursor-pointer border-none shrink-0"
              title={win.title}
              style={{
                height: '22px',
                padding: '0 8px',
                minWidth: '140px',
                maxWidth: '180px',
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif',
                color: 'white',
                textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
                background: isActive
                  ? 'linear-gradient(180deg, #3c8aef 0%, #2e6ed8 20%, #2462cc 40%, #2258c2 60%, #1f50b8 80%, #1c4ab0 100%)'
                  : 'linear-gradient(180deg, #2c6ad5 0%, #2460c8 30%, #1d54bc 60%, #1a4eb5 100%)',
                border: isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(0,0,0,0.15)',
                boxShadow: isActive ? 'inset 0 1px 3px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              <span className="truncate">{win.title}</span>
            </button>
          )
        })}
      </div>

      {/* System Tray / Notification Area */}
      <div
        className="relative flex items-center gap-2 px-2 shrink-0"
        style={{
          background: 'linear-gradient(180deg, #1290e9 0%, #1080d8 20%, #0c70c4 50%, #0b68ba 80%, #0962b1 100%)',
          borderLeft: '1px solid rgba(0,60,150,0.5)',
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(100,160,255,0.3)' }} />

        {/* Volume icon */}
        <div className="relative">
          <button
            className="bg-transparent border-none cursor-pointer p-0 flex items-center"
            onClick={() => { setShowVolume(!showVolume); setShowClock(false) }}
            title={soundEnabled ? 'Volume' : 'Muted'}
          >
            {soundEnabled ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-70 hover:opacity-100">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-50 hover:opacity-80">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" strokeWidth="2.5"/><line x1="17" y1="9" x2="23" y2="15" strokeWidth="2.5"/>
              </svg>
            )}
          </button>
          {showVolume && <VolumePopup onClose={() => setShowVolume(false)} />}
        </div>

        {/* Network icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-60 cursor-pointer hover:opacity-90">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>

        {/* Clock */}
        <div className="relative flex items-center gap-1 ml-1">
          <button
            className="bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
            onClick={() => { setShowClock(!showClock); setShowVolume(false) }}
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(180deg, #5cb8ff 0%, #2888e0 100%)',
              border: '1px solid #1a70c0',
            }}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M8 4v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white text-[11px] cursor-pointer" style={{
              fontFamily: 'Tahoma, sans-serif',
              textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
            }}>
              {formatTime(time)}
            </span>
          </button>
          {showClock && <ClockPopup time={time} onClose={() => setShowClock(false)} />}
        </div>
      </div>
    </div>
  )
}
