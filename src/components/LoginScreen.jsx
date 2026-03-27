import { useState } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

function XPFlag({ size = 80 }) {
  return <img src="/xp-logo.png" alt="Windows SL" width={size} height={size} style={{ objectFit: 'contain' }} />
}

function ProfileAvatar({ size = 48 }) {
  return (
    <div
      className="rounded overflow-hidden shrink-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid rgba(255,255,255,0.5)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
      }}
    >
      <img
        src="/profile.jpeg"
        alt="Sajitha Liyanage"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />
    </div>
  )
}

export default function LoginScreen() {
  const setSystemState = useStore((s) => s.setSystemState)
  const play = useSound()
  const [loggingIn, setLoggingIn] = useState(false)
  const [hoveredUser, setHoveredUser] = useState(null)

  const handleLogin = (user) => {
    if (loggingIn) return
    setLoggingIn(true)
    setTimeout(() => play('startup'), 1000)
    setTimeout(() => setSystemState('desktop'), 1200)
  }

  const users = [
    { id: 'sajitha', name: 'Sajitha Liyanage' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #0046a6 0%, #0052b8 5%, #2970cc 15%, #5a8ede 30%, #7eaaec 50%, #92b8f0 65%, #a0c0f2 80%, #8aade8 95%, #3a6cc8 100%)',
      }}
    >
      {/* Top dark blue bar */}
      <div style={{
        height: '4px',
        background: 'linear-gradient(180deg, #00257a 0%, #003399 100%)',
      }} />

      {/* Thin highlight line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, #1a50a0, #6a9ee0 30%, #8cb8f0 50%, #6a9ee0 70%, #1a50a0)',
      }} />

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={loggingIn ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-16"
        >
          {/* Left side - Logo above "dows" in Windows */}
          <div className="flex flex-col items-start relative">
            {/* Logo positioned above "dows" — shifted right */}
            <div style={{ paddingLeft: '80px', marginBottom: '-22px' }}>
              <XPFlag size={100} />
            </div>

            {/* Microsoft text */}
            <div style={{ paddingLeft: '3px', marginBottom: '-2px' }}>
              <span className="text-white text-[11px] tracking-wide" style={{ fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif" }}>
                rnicrosoft<sup className="text-[7px]">®</sup>
              </span>
            </div>

            {/* Windows XP text */}
            <div className="flex items-baseline">
              <span className="text-white font-bold" style={{
                fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
                fontSize: '36px',
                lineHeight: 1,
                letterSpacing: '-0.5px',
              }}>
                Windows
              </span>
              <span className="font-bold" style={{
                fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
                fontSize: '26px',
                lineHeight: 1,
                color: '#FF8C00',
                marginLeft: '2px',
                position: 'relative',
                top: '-6px',
              }}>
                SL
              </span>
            </div>

            {/* "To begin" text */}
            <div className="mt-6 text-white text-[13px]" style={{ fontFamily: "Tahoma, sans-serif" }}>
              To begin, click your user name
            </div>
          </div>

          {/* Vertical separator line */}
          <div style={{
            width: '1px',
            height: '200px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)',
          }} />

          {/* Right side - User list */}
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-all"
                style={{
                  background: hoveredUser === user.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                  minWidth: '200px',
                }}
                onClick={() => handleLogin(user.id)}
                onMouseEnter={() => setHoveredUser(user.id)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <ProfileAvatar size={48} />
                <div className="flex flex-col">
                  <span className="text-white text-[14px] font-medium" style={{
                    fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}>
                    {user.name}
                  </span>
                  <span className="text-white/60 text-[11px]" style={{
                    fontFamily: "Tahoma, sans-serif",
                  }}>
                    Administrator
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar area */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, #1a50a0, #6a9ee0 30%, #8cb8f0 50%, #6a9ee0 70%, #1a50a0)',
      }} />

      {/* Footer bar */}
      <div
        className="flex items-center justify-between px-6 py-2"
        style={{
          background: 'linear-gradient(180deg, #2a60b8 0%, #1a4a9e 50%, #0a3a8e 100%)',
        }}
      >
        {/* Turn off computer */}
        <button
          onClick={() => { play('click'); setSystemState('shutdown') }}
          className="flex items-center gap-2 text-white text-[12px] bg-transparent border-none cursor-pointer hover:underline"
          style={{ fontFamily: "Tahoma, sans-serif" }}
        >
          <img src="/icons/TurnOff.ico" alt="Turn Off" width="20" height="20" style={{ objectFit: 'contain' }} />
          Turn off computer
        </button>

        {/* Right side help text */}
        <div className="text-white/70 text-[11px] text-right" style={{ fontFamily: "Tahoma, sans-serif" }}>
          After you log on, you can add or change accounts.<br/>
          Just go to Control Panel and click User Accounts.
        </div>
      </div>
    </motion.div>
  )
}
