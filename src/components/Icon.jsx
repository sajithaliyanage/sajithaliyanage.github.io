import { useState, useRef, useCallback } from 'react'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

// Map icon keys to image files in /public/icons/
const iconImages = {
  myComputer: '/icons/myComputer.ico',
  about: '/icons/about.webp',
  odf: '/icons/odf-previwer.webp',
  ie: '/icons/projects.webp',
  outlook: '/icons/outlook.webp',
  recycle: '/icons/RecycleBin.ico',
  folder: '/icons/folder.ico',
  info: '/icons/info.ico',
}

export default function Icon({ id, label, icon, appId, defaultX = 0, defaultY = 0 }) {
  const [selected, setSelected] = useState(false)
  const [pos, setPos] = useState({ x: defaultX, y: defaultY })
  const lastClickTime = useRef(0)
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 })
  const openWindow = useStore((s) => s.openWindow)
  const closeStartMenu = useStore((s) => s.closeStartMenu)
  const showContextMenu = useStore((s) => s.showContextMenu)
  const showErrorDialog = useStore((s) => s.showErrorDialog)
  const play = useSound()

  const handleOpen = useCallback(() => {
    play('open')
    closeStartMenu()
    openWindow({
      id: appId,
      title: appId === 'resume-pdf' ? 'Sajitha_Liyanage_Resume.pdf - Adobe Reader' : label,
      icon: icon,
      component: appId,
    })
  }, [appId, label, icon, openWindow, closeStartMenu, play])

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    closeStartMenu()
    setSelected(true)

    dragRef.current = {
      dragging: false,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    }

    const handleMouseMove = (ev) => {
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      // Only start dragging after 4px threshold to not interfere with clicks
      if (!dragRef.current.dragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        dragRef.current.dragging = true
      }
      if (dragRef.current.dragging) {
        setPos({
          x: dragRef.current.origX + dx,
          y: dragRef.current.origY + dy,
        })
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      if (!dragRef.current.dragging) {
        // It was a click, not a drag
        const now = Date.now()
        if (now - lastClickTime.current < 400) {
          handleOpen()
          lastClickTime.current = 0
        } else {
          play('click')
          lastClickTime.current = now
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [pos, handleOpen, closeStartMenu, play])

  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    showContextMenu(e.clientX, e.clientY, [
      { label: 'Open', action: handleOpen },
      { separator: true },
      {
        label: 'Properties',
        action: () => showErrorDialog(label, `Type: ${appId}\nIcon: ${icon}`, 'info'),
      },
    ])
  }, [showContextMenu, showErrorDialog, handleOpen, label, appId, icon])

  const imgSrc = iconImages[icon]

  return (
    <div
      className={`absolute flex flex-col items-center gap-1 p-2 rounded cursor-pointer transition-colors ${
        selected ? 'bg-blue-600/40' : 'hover:bg-white/10'
      }`}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      style={{
        width: '90px',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        userSelect: 'none',
        zIndex: selected ? 10 : 1,
      }}
    >
      <div className="pointer-events-none flex items-center justify-center" style={{ width: '56px', height: '56px' }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={label}
            style={{ width: '56px', height: '56px', objectFit: 'contain', imageRendering: 'auto' }}
            draggable={false}
          />
        ) : (
          <div className="w-14 h-14 bg-blue-500/30 rounded flex items-center justify-center text-white text-lg">?</div>
        )}
      </div>
      <span
        className="text-white text-[11px] text-center leading-tight icon-text pointer-events-none"
        style={{
          wordBreak: 'break-word',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
