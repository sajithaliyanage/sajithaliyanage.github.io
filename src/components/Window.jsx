import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

const iconMiniSVGs = {
  computer: <svg viewBox="0 0 16 16" className="w-4 h-4"><rect x="1" y="1" width="14" height="10" rx="1" fill="#4a90d9"/><rect x="5" y="11" width="6" height="2" fill="#888"/><rect x="3" y="13" width="10" height="1.5" rx="0.5" fill="#999"/></svg>,
  folder: <svg viewBox="0 0 16 16" className="w-4 h-4"><path d="M1 4 L1 14 L15 14 L15 6 L8 6 L6 4 Z" fill="#f7c948"/></svg>,
  projects: <svg viewBox="0 0 16 16" className="w-4 h-4"><rect x="2" y="2" width="12" height="12" rx="1" fill="#2563eb"/><rect x="4" y="5" width="3" height="3" rx="0.5" fill="white" opacity="0.5"/><rect x="9" y="5" width="3" height="3" rx="0.5" fill="white" opacity="0.5"/></svg>,
  about: <svg viewBox="0 0 16 16" className="w-4 h-4"><circle cx="8" cy="8" r="7" fill="#3b82f6"/><circle cx="8" cy="6" r="2.5" fill="white" opacity="0.9"/><path d="M4 14 C4 11 6 10 8 10 C10 10 12 11 12 14" fill="white" opacity="0.7"/></svg>,
  recycle: <svg viewBox="0 0 16 16" className="w-4 h-4"><path d="M4 5 L5 14 L11 14 L12 5 Z" fill="#888"/><rect x="3" y="4" width="10" height="1.5" rx="0.5" fill="#999"/></svg>,
  notepad: <svg viewBox="0 0 16 16" className="w-4 h-4"><rect x="3" y="1" width="10" height="14" rx="1" fill="#f5f5dc"/><rect x="3" y="1" width="10" height="14" rx="1" stroke="#999" strokeWidth="0.5" fill="none"/><line x1="5" y1="4" x2="11" y2="4" stroke="#ccc" strokeWidth="0.5"/><line x1="5" y1="6" x2="11" y2="6" stroke="#ccc" strokeWidth="0.5"/><line x1="5" y1="8" x2="11" y2="8" stroke="#ccc" strokeWidth="0.5"/><line x1="5" y1="10" x2="11" y2="10" stroke="#ccc" strokeWidth="0.5"/><line x1="5" y1="12" x2="9" y2="12" stroke="#ccc" strokeWidth="0.5"/><rect x="3" y="1" width="10" height="2" rx="1" fill="#6b9bd2"/></svg>,
}

export default function Window({ window: win }) {
  const {
    closeWindow, minimizeWindow, maximizeWindow, focusWindow,
    updateWindowPosition, updateWindowSize, activeWindowId
  } = useStore()
  const play = useSound()
  const isActive = activeWindowId === win.id
  const dragRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 })
  const resizeStart = useRef({ x: 0, y: 0, winW: 0, winH: 0 })
  const lastClickTime = useRef(0)

  const handleMouseDown = useCallback((e) => {
    if (win.maximized) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, winX: win.x, winY: win.y }
    focusWindow(win.id)
  }, [win.id, win.x, win.y, win.maximized, focusWindow])

  const handleTitleBarClick = useCallback((e) => {
    const now = Date.now()
    if (now - lastClickTime.current < 400) {
      play('maximize')
      maximizeWindow(win.id)
      lastClickTime.current = 0
    } else {
      lastClickTime.current = now
    }
  }, [win.id, maximizeWindow, play])

  useEffect(() => {
    if (!isDragging) return
    const handleMove = (e) => {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      updateWindowPosition(win.id, dragStart.current.winX + dx, dragStart.current.winY + dy)
    }
    const handleUp = () => setIsDragging(false)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging, win.id, updateWindowPosition])

  // Resize handling
  const handleResizeMouseDown = useCallback((e) => {
    if (win.maximized) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStart.current = { x: e.clientX, y: e.clientY, winW: win.width, winH: win.height }
    focusWindow(win.id)
  }, [win.id, win.width, win.height, win.maximized, focusWindow])

  useEffect(() => {
    if (!isResizing) return
    const handleMove = (e) => {
      const dx = e.clientX - resizeStart.current.x
      const dy = e.clientY - resizeStart.current.y
      const newWidth = Math.max(200, resizeStart.current.winW + dx)
      const newHeight = Math.max(150, resizeStart.current.winH + dy)
      updateWindowSize(win.id, newWidth, newHeight)
    }
    const handleUp = () => setIsResizing(false)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [isResizing, win.id, updateWindowSize])

  const handleClose = (e) => {
    e.stopPropagation()
    play('close')
    closeWindow(win.id)
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    play('minimize')
    minimizeWindow(win.id)
  }

  const handleMaximize = (e) => {
    e.stopPropagation()
    play('maximize')
    maximizeWindow(win.id)
  }

  if (win.minimized) return null

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 0px)', zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute flex flex-col"
      style={{
        ...style,
        borderRadius: '8px 8px 0 0',
        boxShadow: isActive
          ? '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.2)'
          : '0 2px 10px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.15)',
      }}
      onClick={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-2 py-1 rounded-t-lg ${
          isActive ? 'xp-title-active' : 'xp-title-inactive'
        }`}
        onMouseDown={handleMouseDown}
        onClick={handleTitleBarClick}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', minHeight: '30px' }}
      >
        <div className="flex items-center gap-2 text-white text-sm font-normal truncate">
          {iconMiniSVGs[win.icon] || iconMiniSVGs.folder}
          <span className="truncate" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>{win.title}</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button className="xp-btn-minimize" onClick={handleMinimize} title="Minimize">
            <span style={{ marginBottom: '4px' }}>_</span>
          </button>
          <button className="xp-btn-maximize" onClick={handleMaximize} title={win.maximized ? 'Restore' : 'Maximize'}>
            {win.maximized ? '❐' : '□'}
          </button>
          <button className="xp-btn-close" onClick={handleClose} title="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Window content */}
      <div
        className="flex-1 overflow-auto relative"
        style={{
          background: '#ece9d8',
          borderLeft: '2px solid #0054e3',
          borderRight: '2px solid #0054e3',
          borderBottom: '2px solid #0054e3',
        }}
      >
        {win.component}
      </div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '16px',
            height: '16px',
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            style={{ display: 'block' }}
          >
            <line x1="14" y1="4" x2="4" y2="14" stroke="#999" strokeWidth="1" />
            <line x1="14" y1="7" x2="7" y2="14" stroke="#999" strokeWidth="1" />
            <line x1="14" y1="10" x2="10" y2="14" stroke="#999" strokeWidth="1" />
            <line x1="14" y1="13" x2="13" y2="14" stroke="#999" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
