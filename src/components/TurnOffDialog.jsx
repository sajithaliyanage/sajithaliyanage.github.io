import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

function XPFlagSmall() {
  return <img src="/xp-logo.png" alt="Windows SL" width="40" height="40" style={{ objectFit: 'contain' }} />
}

function ActionButton({ icon, label, hoverColor, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      className="flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer px-6 py-3 rounded"
      style={{
        transition: 'all 0.15s',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center"
        style={{
          background: hovered ? hoverColor : icon.bg,
          border: `2px solid ${hovered ? icon.borderHover : icon.border}`,
          boxShadow: hovered
            ? `0 0 12px ${hoverColor}60, 0 2px 8px rgba(0,0,0,0.3)`
            : '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'all 0.15s',
        }}
      >
        {icon.svg}
      </div>
      <span className="text-white text-[12px]" style={{
        fontFamily: 'Tahoma, sans-serif',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      }}>
        {label}
      </span>
    </button>
  )
}

export default function TurnOffDialog() {
  const { turnOffDialogOpen, hideTurnOffDialog, setSystemState, closeAllWindows } = useStore()
  const play = useSound()

  if (!turnOffDialogOpen) return null

  const handleStandBy = () => {
    play('click')
    hideTurnOffDialog()
    // Simulate standby - just dim screen briefly then return
    useStore.getState().showNotification('Stand By', 'Computer is entering standby mode...', '💤')
  }

  const handleTurnOff = () => {
    hideTurnOffDialog()
    closeAllWindows()
    setSystemState('shutdown')
  }

  const handleRestart = () => {
    hideTurnOffDialog()
    closeAllWindows()
    setTimeout(() => setSystemState('boot'), 2000)
  }

  const handleCancel = () => {
    play('click')
    hideTurnOffDialog()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 99990 }}>
      {/* Click-away overlay (transparent — grayscale is on the desktop wrapper) */}
      <div
        className="absolute inset-0"
        onClick={handleCancel}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        className="relative"
        style={{
          width: '400px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(100,150,255,0.3)',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: 'linear-gradient(180deg, #3e7ad5 0%, #2e60b8 40%, #1e4a9e 100%)',
            borderBottom: '1px solid #1a3a7a',
          }}
        >
          <span className="text-white text-[16px] font-normal" style={{
            fontFamily: "'Franklin Gothic Medium', Tahoma, sans-serif",
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
          }}>
            Turn off computer
          </span>
          <XPFlagSmall />
        </div>

        {/* Body */}
        <div
          className="flex items-center justify-center gap-4 py-8 px-6"
          style={{
            background: 'linear-gradient(180deg, #6e9ecf 0%, #5a8ac2 20%, #4a7ab8 50%, #5585bf 80%, #6090c8 100%)',
          }}
        >
          {/* Stand By */}
          <ActionButton
            label="Stand By"
            hoverColor="#e8a020"
            icon={{
              bg: 'linear-gradient(180deg, #f0c050 0%, #d89818 50%, #c08010 100%)',
              border: '#a06800',
              borderHover: '#f0d060',
              svg: <img src="/icons/LogOff.ico" alt="Stand By" width="28" height="28" style={{ objectFit: 'contain' }} />,
            }}
            onClick={handleStandBy}
          />

          {/* Turn Off */}
          <ActionButton
            label="Turn Off"
            hoverColor="#e03020"
            icon={{
              bg: 'linear-gradient(180deg, #e85040 0%, #cc2810 50%, #a82008 100%)',
              border: '#881000',
              borderHover: '#ff5040',
              svg: <img src="/icons/TurnOff.ico" alt="Turn Off" width="28" height="28" style={{ objectFit: 'contain' }} />,
            }}
            onClick={handleTurnOff}
          />

          {/* Restart */}
          <ActionButton
            label="Restart"
            hoverColor="#30a830"
            icon={{
              bg: 'linear-gradient(180deg, #50b850 0%, #289828 50%, #188018 100%)',
              border: '#106810',
              borderHover: '#60d060',
              svg: <img src="/icons/Restart.png" alt="Restart" width="28" height="28" style={{ objectFit: 'contain' }} />,
            }}
            onClick={handleRestart}
          />
        </div>

        {/* Footer with Cancel */}
        <div
          className="flex justify-end px-4 py-2"
          style={{
            background: 'linear-gradient(180deg, #3a6ab4 0%, #2a56a0 50%, #1e468e 100%)',
            borderTop: '1px solid #1a3a7a',
          }}
        >
          <button
            className="px-5 py-1 text-[11px] rounded-sm cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #f0f0ea 0%, #e0e0d8 50%, #d0d0c8 100%)',
              border: '1px solid #808080',
              fontFamily: 'Tahoma, sans-serif',
              color: '#333',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
