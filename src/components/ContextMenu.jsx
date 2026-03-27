import { useEffect, useRef } from 'react'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

export default function ContextMenu() {
  const { contextMenu, hideContextMenu } = useStore()
  const play = useSound()
  const ref = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        hideContextMenu()
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [hideContextMenu])

  if (!contextMenu) return null

  // Adjust position if menu would go off screen
  let { x, y } = contextMenu
  const menuWidth = 180
  const menuHeight = contextMenu.items.length * 26 + 8
  if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 4
  if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 4

  return (
    <div
      ref={ref}
      className="fixed"
      style={{
        left: x,
        top: y,
        zIndex: 99999,
        width: menuWidth,
        background: '#fff',
        border: '1px solid #808080',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.25)',
        padding: '2px 0',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
      }}
    >
      {contextMenu.items.map((item, i) => {
        if (item.separator) {
          return <div key={i} className="mx-1 my-1 h-px bg-gray-300" />
        }
        return (
          <button
            key={i}
            className={`w-full flex items-center gap-3 px-6 py-1 text-left bg-transparent border-none cursor-pointer ${
              item.disabled
                ? 'text-gray-400 cursor-default'
                : 'text-gray-800 hover:bg-[#316ac5] hover:text-white'
            }`}
            onClick={() => {
              if (item.disabled) return
              play('click')
              hideContextMenu()
              if (item.action) item.action()
            }}
            disabled={item.disabled}
          >
            {item.icon && <span className="w-4 text-center text-[10px]">{item.icon}</span>}
            <span>{item.label}</span>
            {item.checked && <span className="ml-auto">✓</span>}
          </button>
        )
      })}
    </div>
  )
}
