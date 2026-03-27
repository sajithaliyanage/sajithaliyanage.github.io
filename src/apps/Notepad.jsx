import { useState } from 'react'

export default function Notepad() {
  const [text, setText] = useState('Welcome to Notepad!\n\nThis is a simple text editor, just like the one in Windows SL.\n\nFeel free to type anything here...')
  const [wordWrap, setWordWrap] = useState(true)

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Menu bar */}
      <div className="flex items-center bg-[#ece9d8] border-b border-gray-300 px-1">
        {['File', 'Edit', 'Format', 'View', 'Help'].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 text-[11px] text-gray-800 hover:bg-[#316ac5] hover:text-white bg-transparent border-none cursor-pointer rounded-sm"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Text area */}
      <textarea
        className="flex-1 p-1 resize-none outline-none border-none bg-white text-gray-900"
        style={{
          fontFamily: "'Lucida Console', 'Courier New', monospace",
          fontSize: '13px',
          lineHeight: '1.4',
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowWrap: wordWrap ? 'break-word' : 'normal',
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      {/* Status bar */}
      <div className="flex items-center justify-between px-2 py-0.5 bg-[#ece9d8] border-t border-gray-300 text-[10px] text-gray-600">
        <span>Ln 1, Col 1</span>
        <span>{text.length} characters</span>
      </div>
    </div>
  )
}
