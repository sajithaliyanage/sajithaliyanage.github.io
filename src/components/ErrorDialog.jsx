import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

const typeConfig = {
  error: {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#cc0000" strokeWidth="1"/>
        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif">✕</text>
      </svg>
    ),
    sound: 'error',
  },
  warning: {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <polygon points="16,2 30,28 2,28" fill="#ffcc00" stroke="#cc9900" strokeWidth="1"/>
        <text x="16" y="24" textAnchor="middle" fill="black" fontSize="18" fontWeight="bold" fontFamily="sans-serif">!</text>
      </svg>
    ),
    sound: 'exclamation',
  },
  info: {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="16" cy="16" r="14" fill="#3474d4" stroke="#2060b0" strokeWidth="1"/>
        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="serif">i</text>
      </svg>
    ),
    sound: 'ding',
  },
}

export default function ErrorDialog() {
  const { errorDialog, hideErrorDialog } = useStore()
  const play = useSound()

  if (!errorDialog) return null

  const config = typeConfig[errorDialog.type] || typeConfig.error

  // Play sound on mount
  if (config.sound) {
    // Use setTimeout to avoid playing during render
    setTimeout(() => play(config.sound), 0)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 99998 }}>
      {/* Semi-transparent overlay - not full dim like modern, XP didn't do that */}
      <div className="absolute inset-0" onClick={hideErrorDialog} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
        className="relative flex flex-col"
        style={{
          minWidth: '340px',
          maxWidth: '450px',
          background: '#ece9d8',
          border: '2px solid #0054e3',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          fontFamily: 'Tahoma, sans-serif',
        }}
      >
        {/* Title bar */}
        <div className="xp-title-active flex items-center justify-between px-2 py-1 rounded-t-md">
          <span className="text-white text-[12px]" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>
            {errorDialog.title}
          </span>
          <button
            className="xp-btn-close"
            onClick={hideErrorDialog}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-3 p-4">
          <div className="shrink-0">{config.icon}</div>
          <p className="text-[12px] text-gray-800 leading-relaxed pt-1">{errorDialog.message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2 pb-4 px-4">
          <button
            className="px-6 py-1 text-[11px] bg-[#d4d0c8] border border-gray-500 rounded-sm cursor-pointer hover:bg-[#e4e0d8] active:bg-[#c4c0b8] min-w-[75px]"
            onClick={hideErrorDialog}
            autoFocus
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  )
}
