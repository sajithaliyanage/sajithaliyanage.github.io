import { useState } from 'react'
import useStore from '../store/useStore'
import { useSound } from '../hooks/useSound'

const knownCommands = {
  'notepad': { id: 'notepad', title: 'Untitled - Notepad', icon: 'notepad', component: 'notepad', width: 600, height: 400 },
  'explorer': { id: 'my-computer', title: 'My Computer', icon: 'computer', component: 'my-computer' },
  'myprojects': { id: 'my-projects', title: 'My Projects', icon: 'projects', component: 'my-projects' },
  'about': { id: 'about-me', title: 'About Me', icon: 'about', component: 'about-me' },
  'calc': null,
  'cmd': null,
}

export default function RunDialog() {
  const [command, setCommand] = useState('')
  const { openWindow, closeWindow, showErrorDialog } = useStore()
  const play = useSound()

  const handleRun = () => {
    const cmd = command.trim().toLowerCase()
    if (!cmd) return

    const config = knownCommands[cmd]
    if (config) {
      play('open')
      openWindow(config)
      closeWindow('run-dialog')
    } else if (cmd in knownCommands) {
      // Known but not implemented
      play('error')
      showErrorDialog(
        cmd + '.exe',
        `Windows cannot find '${cmd}'. Make sure you typed the name correctly, and then try again.`,
        'error'
      )
    } else {
      play('error')
      showErrorDialog(
        'Run',
        `Windows cannot find '${command}'. Make sure you typed the name correctly, and then try again.`,
        'error'
      )
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRun()
    if (e.key === 'Escape') closeWindow('run-dialog')
  }

  return (
    <div className="h-full flex flex-col p-4 bg-[#ece9d8]" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <div className="flex gap-3 mb-4">
        {/* Run icon */}
        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-8 h-8">
            <rect x="2" y="4" width="28" height="24" rx="2" fill="#ece9d8" stroke="#808080" strokeWidth="1"/>
            <rect x="4" y="6" width="24" height="16" fill="#000080"/>
            <text x="8" y="18" fill="#ccc" fontSize="8" fontFamily="monospace">C:\&gt;_</text>
            <rect x="4" y="24" width="12" height="2" rx="0.5" fill="#808080"/>
          </svg>
        </div>
        <div>
          <p className="text-gray-800 text-[12px] mb-1">
            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="text-[12px] text-gray-800 shrink-0">Open:</label>
        <input
          type="text"
          className="flex-1 px-2 py-1 border border-gray-400 bg-white text-[12px] outline-none focus:border-blue-500"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="notepad"
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-1 text-[11px] bg-[#d4d0c8] border border-gray-500 rounded-sm cursor-pointer hover:bg-[#e4e0d8] active:bg-[#c4c0b8]"
          onClick={handleRun}
        >
          OK
        </button>
        <button
          className="px-4 py-1 text-[11px] bg-[#d4d0c8] border border-gray-500 rounded-sm cursor-pointer hover:bg-[#e4e0d8] active:bg-[#c4c0b8]"
          onClick={() => closeWindow('run-dialog')}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 text-[11px] bg-[#d4d0c8] border border-gray-500 rounded-sm cursor-pointer hover:bg-[#e4e0d8] active:bg-[#c4c0b8]"
          onClick={() => {
            play('navigate')
            setCommand('')
          }}
        >
          Browse...
        </button>
      </div>

      <div className="mt-3 text-[10px] text-gray-500">
        Try: notepad, explorer, myprojects, about
      </div>
    </div>
  )
}
