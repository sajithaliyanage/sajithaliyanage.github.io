import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

export default function BootScreen() {
  const setSystemState = useStore((s) => s.setSystemState)
  const play = useSound()
  const [phase, setPhase] = useState('bios') // 'bios' | 'loading'
  const [biosLines, setBiosLines] = useState([])
  const [memCount, setMemCount] = useState(0)
  const skipRef = useRef(false)

  const biosText = [
    { text: 'Award Modular BIOS v4.51PG, An Energy Star Ally', color: '#aaa', delay: 0 },
    { text: 'Copyright (C) 1984-97, Award Software, Inc.', color: '#aaa', delay: 100 },
    { text: '', delay: 200 },
    { text: '(55XWUQ0E) AMD VanGogh PCIset(TM)', color: '#fff', delay: 400 },
    { text: '', delay: 500 },
    { text: 'AMD Custom 0405 at 3500Mhz', color: '#fff', delay: 600 },
    { text: 'MEMORY_COUNT', color: '#fff', delay: 700 },
    { text: '', delay: 1400 },
    { text: 'Award Plug and Play BIOS Extension  v1.0A', color: '#aaa', delay: 1500 },
    { text: 'Copyright (C) 1997, Award Software, Inc.', color: '#aaa', delay: 1600 },
    { text: '   Detecting IDE Primary Master  ... PortfolioHD', color: '#aaa', delay: 1800 },
    { text: '   Detecting IDE Primary Slave   ... SkillsCD', color: '#aaa', delay: 2000 },
    { text: '   Detecting IDE Secondary Master... ProjectsDVD', color: '#aaa', delay: 2200 },
    { text: '   Detecting IDE Secondary Slave ... None', color: '#aaa', delay: 2400 },
  ]

  useEffect(() => {
    // Typewriter effect for BIOS lines
    const timers = biosText.map((line, i) => {
      if (line.text === 'MEMORY_COUNT') return null
      return setTimeout(() => {
        if (!skipRef.current) {
          setBiosLines(prev => [...prev, line])
        }
      }, line.delay)
    }).filter(Boolean)

    // Memory counter animation
    const memTarget = 15167656
    const memStart = setTimeout(() => {
      let count = 0
      const step = Math.ceil(memTarget / 30)
      const memInterval = setInterval(() => {
        count = Math.min(count + step, memTarget)
        if (!skipRef.current) setMemCount(count)
        if (count >= memTarget) clearInterval(memInterval)
      }, 25)
      return () => clearInterval(memInterval)
    }, 700)

    // Transition to loading screen
    const bootTimer = setTimeout(() => {
      if (!skipRef.current) setPhase('loading')
    }, 3000)

    // Transition to login
    const loginTimer = setTimeout(() => {
      if (!skipRef.current) setSystemState('login')
    }, 6500)

    return () => {
      timers.forEach(t => clearTimeout(t))
      clearTimeout(memStart)
      clearTimeout(bootTimer)
      clearTimeout(loginTimer)
    }
  }, [])

  const handleSkip = () => {
    skipRef.current = true
    setSystemState('login')
  }

  // ===== BIOS SCREEN =====
  if (phase === 'bios') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full bg-black flex cursor-pointer overflow-hidden"
        onClick={handleSkip}
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {/* Main BIOS text area */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="space-y-0">
            {biosLines.map((line, i) => (
              <p
                key={i}
                className="text-[13px] leading-[1.4]"
                style={{ color: line.color || '#aaa' }}
              >
                {line.text || '\u00A0'}
              </p>
            ))}
            {/* Memory counter line — always visible after delay */}
            {memCount > 0 && (
              <p className="text-[13px] text-white leading-[1.4]">
                Memory Test :    {memCount.toLocaleString()}K OK
              </p>
            )}
          </div>

          {/* Bottom section */}
          <div className="mt-auto">
            <p className="text-gray-500 text-[13px]">
              Press <span className="text-white font-bold">DEL</span> to enter SETUP
            </p>
            <p className="text-gray-600 text-[11px] mt-1">
              03/24/26-i430VX,SL8669-2A59GH2BC-00
            </p>
          </div>
        </div>

        {/* Energy Star logo area (top right) */}
        <div className="p-8 pt-6 shrink-0" style={{ width: '320px' }}>
          <svg viewBox="0 0 120 100" className="w-full">
            {/* Arc */}
            <path
              d="M15 75 Q60 5 105 75"
              fill="none"
              stroke="#c8c800"
              strokeWidth="1.5"
            />
            {/* Star */}
            <polygon
              points="75,20 80,40 100,40 84,52 90,72 75,60 60,72 66,52 50,40 70,40"
              fill="none"
              stroke="#c8c800"
              strokeWidth="1.5"
            />
            {/* energy text */}
            <text x="30" y="55" fill="#c8c800" fontSize="14" fontFamily="'Times New Roman', serif" fontStyle="italic">
              energy
            </text>
            {/* EPA text */}
            <text x="20" y="90" fill="#00aa00" fontSize="9" fontFamily="'Courier New', monospace" letterSpacing="1">
              EPA POLLUTION PREVENTER
            </text>
          </svg>
        </div>
      </motion.div>
    )
  }

  // ===== LOADING SCREEN =====
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleSkip}
      onKeyDown={handleSkip}
      tabIndex={0}
    >
      {/* Logo + rnicrosoft + Windows SL */}
      <div className="flex flex-col items-start relative" style={{ marginBottom: '8px' }}>
        {/* Logo positioned above "dows" */}
        <div style={{ paddingLeft: '110px', marginBottom: '-30px' }}>
          <img src="/xp-logo.png" alt="Windows SL" width="140" height="140" style={{ objectFit: 'contain' }} />
        </div>

        {/* rnicrosoft text */}
        <div style={{ paddingLeft: '4px', marginBottom: '-2px' }}>
          <span className="text-white text-[13px] tracking-wide" style={{ fontFamily: "'Franklin Gothic Medium', 'Segoe UI', Tahoma, sans-serif" }}>
            rnicrosoft<sup className="text-[8px] ml-0.5">®</sup>
          </span>
        </div>

        {/* Windows SL text */}
        <div className="flex items-baseline gap-0">
          <span
            className="text-white font-bold tracking-tight"
            style={{
              fontFamily: "'Franklin Gothic Medium', 'Segoe UI', Tahoma, sans-serif",
              fontSize: '52px',
              lineHeight: 1,
              letterSpacing: '-1px',
            }}
          >
            Windows
          </span>
          <span
            className="font-bold"
            style={{
              fontFamily: "'Franklin Gothic Medium', 'Segoe UI', Tahoma, sans-serif",
              fontSize: '38px',
              lineHeight: 1,
              color: '#FF8C00',
              marginLeft: '2px',
              position: 'relative',
              top: '-8px',
            }}
          >
            SL
          </span>
        </div>

        {/* Liyanage Edition */}
        <div style={{ paddingLeft: '4px', marginTop: '2px' }}>
          <span
            className="text-white tracking-widest"
            style={{
              fontFamily: "'Franklin Gothic Medium', 'Segoe UI', Tahoma, sans-serif",
              fontSize: '18px',
              letterSpacing: '3px',
            }}
          >
            Liyanage Edition
          </span>
        </div>
      </div>

      {/* XP-style loading bar */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '200px',
          height: '18px',
          background: '#000',
          border: '1px solid #3a3a5c',
          borderRadius: '2px',
          padding: '2px',
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ background: '#0a0a2e', borderRadius: '1px' }}
        >
          <div
            className="absolute h-full flex gap-[2px]"
            style={{ animation: 'xpBlocks 2s linear infinite' }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #5c8aff 0%, #2850e0 30%, #1a3ccc 50%, #2850e0 70%, #5c8aff 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-[10px] mt-12 tracking-wide">Click anywhere to skip</p>

      <style>{`
        @keyframes xpBlocks {
          0% { left: -50px; }
          100% { left: 200px; }
        }
      `}</style>
    </motion.div>
  )
}
