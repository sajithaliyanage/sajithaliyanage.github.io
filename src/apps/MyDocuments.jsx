export default function MyDocuments() {
  const files = [
    { name: 'Resume_2024.pdf', type: 'PDF', size: '245 KB', date: '2024-01-15', icon: '📄' },
    { name: 'Cover_Letter.docx', type: 'Word', size: '128 KB', date: '2024-02-20', icon: '📝' },
    { name: 'Portfolio_Screenshots', type: 'Folder', size: '-', date: '2024-03-01', icon: '📁' },
    { name: 'Project_Notes.txt', type: 'Text', size: '12 KB', date: '2024-03-10', icon: '📋' },
    { name: 'Design_Mockups', type: 'Folder', size: '-', date: '2024-02-28', icon: '📁' },
    { name: 'Certifications', type: 'Folder', size: '-', date: '2023-12-15', icon: '📁' },
  ]

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-1.5 border-b border-gray-300 bg-[#ece9d8]">
        <span className="text-[11px] text-gray-600">📁 My Documents</span>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 p-1 border-b border-gray-300 bg-white">
        <span className="text-[10px] text-gray-500">Address</span>
        <div className="flex-1 border border-gray-300 px-2 py-0.5 text-[11px] bg-white">
          C:\Documents and Settings\Sajitha\My Documents
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 bg-white overflow-auto">
        {/* Column headers */}
        <div className="flex items-center gap-4 px-3 py-1.5 bg-[#f5f4f0] border-b border-gray-300 text-[10px] font-bold text-gray-600">
          <span className="w-48">Name</span>
          <span className="w-16">Type</span>
          <span className="w-16">Size</span>
          <span className="w-24">Date Modified</span>
        </div>

        {files.map((file, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-3 py-1 hover:bg-blue-100 cursor-pointer text-[11px] border-b border-gray-100"
          >
            <span className="w-48 flex items-center gap-2 truncate">
              <span>{file.icon}</span>
              <span className="text-gray-800">{file.name}</span>
            </span>
            <span className="w-16 text-gray-600">{file.type}</span>
            <span className="w-16 text-gray-600">{file.size}</span>
            <span className="w-24 text-gray-600">{file.date}</span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#ece9d8] border-t border-gray-300 text-[10px] text-gray-600">
        <span>{files.length} object(s)</span>
        <span>My Documents</span>
      </div>
    </div>
  )
}
