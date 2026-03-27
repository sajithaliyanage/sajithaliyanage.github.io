import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

export default function ShutdownScreen() {
  const setSystemState = useStore((s) => s.setSystemState)
  const closeAllWindows = useStore((s) => s.closeAllWindows)
  const play = useSound()
  const [phase, setPhase] = useState('shutting') // 'shutting' | 'off'

  useEffect(() => {
    closeAllWindows()
    play('shutdown')
    const timer = setTimeout(() => setPhase('off'), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (phase === 'off') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full bg-black flex flex-col items-center justify-center"
      >
        <p className="text-gray-600 text-sm mb-4">It is now safe to close your browser.</p>
        <button
          onClick={() => setSystemState('boot')}
          className="px-6 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors border border-gray-600 text-sm cursor-pointer"
        >
          Restart
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #1a3c8f 0%, #2d5dbe 50%, #1a3c8f 100%)',
      }}
    >
      <div className="text-white text-2xl font-light mb-4" style={{ fontFamily: 'Franklin Gothic Medium, Tahoma, sans-serif' }}>
        Windows is shutting down...
      </div>
      <div className="text-white/50 text-sm">Saving your settings...</div>
    </motion.div>
  )
}
