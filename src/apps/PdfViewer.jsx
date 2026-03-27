import { useState } from 'react'

export default function PdfViewer() {
  const [zoom, setZoom] = useState(100)

  return (
    <div className="h-full flex flex-col bg-[#525252]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
      {/* Toolbar — styled like Adobe Reader / XP document viewer */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#ece9d8] border-b border-gray-400 shrink-0">
        {/* File actions */}
        <button
          onClick={() => window.open('/Resume.pdf', '_blank')}
          className="flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8]"
          title="Open in new tab"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Open External
        </button>

        <button
          onClick={() => {
            const a = document.createElement('a')
            a.href = '/Resume.pdf'
            a.download = 'Sajitha_Liyanage_Resume.pdf'
            a.click()
          }}
          className="flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8]"
          title="Download"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Save As
        </button>

        <div className="w-px h-4 bg-gray-400 mx-1" />

        {/* Zoom controls */}
        <button
          onClick={() => setZoom(z => Math.max(50, z - 25))}
          className="px-1.5 py-0.5 text-[11px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8] font-bold"
          title="Zoom Out"
        >
          −
        </button>
        <span className="text-[10px] text-gray-700 min-w-[35px] text-center">{zoom}%</span>
        <button
          onClick={() => setZoom(z => Math.min(200, z + 25))}
          className="px-1.5 py-0.5 text-[11px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8] font-bold"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => setZoom(100)}
          className="px-2 py-0.5 text-[10px] bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8]"
        >
          Fit
        </button>

        <div className="ml-auto text-[10px] text-gray-500">
          Sajitha_Liyanage_Resume.pdf
        </div>
      </div>

      {/* PDF content area */}
      <div className="flex-1 overflow-auto flex justify-center" style={{ background: '#525252' }}>
        <iframe
          src="/Resume.pdf"
          title="Resume PDF"
          style={{
            width: `${zoom}%`,
            height: '100%',
            border: 'none',
            background: 'white',
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-0.5 bg-[#ece9d8] border-t border-gray-400 text-[10px] text-gray-600 shrink-0">
        <span>Ready</span>
        <span>Adobe Reader — Portfolio SL Edition</span>
      </div>
    </div>
  )
}
