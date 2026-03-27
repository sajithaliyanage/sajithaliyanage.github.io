import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function NotificationBalloon() {
  const { notification, hideNotification } = useStore()

  if (!notification) return null

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[99997]"
          style={{
            bottom: '40px',
            right: '8px',
            width: '250px',
            fontFamily: 'Tahoma, sans-serif',
          }}
        >
          {/* Balloon body */}
          <div
            style={{
              background: '#ffffe1',
              border: '1px solid #000',
              borderRadius: '5px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
              padding: '8px 10px',
              position: 'relative',
            }}
          >
            {/* Close X */}
            <button
              className="absolute top-1 right-2 text-gray-500 hover:text-black bg-transparent border-none cursor-pointer text-[12px] font-bold"
              onClick={hideNotification}
            >
              ✕
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 mb-1">
              {notification.icon && <span className="text-[14px]">{notification.icon}</span>}
              <span className="text-[11px] font-bold text-gray-900">{notification.title}</span>
            </div>

            {/* Message */}
            <p className="text-[11px] text-gray-700 leading-relaxed pr-4">{notification.message}</p>

            {/* Balloon tail/pointer */}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '20px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #000',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '21px',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid #ffffe1',
            }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
