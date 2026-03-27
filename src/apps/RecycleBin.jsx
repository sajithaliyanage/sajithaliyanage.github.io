import { useState } from 'react'
import { useSound } from '../hooks/useSound'
import useStore from '../store/useStore'

const initialItems = [
  { id: 1, name: 'old_resume_v1.doc', type: 'Word Document', size: '156 KB', deleted: '2024-01-05', icon: '📄' },
  { id: 2, name: 'my_first_php_site/', type: 'Folder', size: '2.3 MB', deleted: '2023-12-20', icon: '📁' },
  { id: 3, name: 'spaghetti_monolith.java', type: 'Java File', size: '42 KB', deleted: '2024-01-28', icon: '☕' },
  { id: 4, name: 'kubernetes_yaml_hell/', type: 'Folder', size: '999 KB', deleted: '2024-03-01', icon: '⚙️' },
  { id: 5, name: 'docker-compose-v47.yml', type: 'YAML', size: '8 KB', deleted: '2024-02-14', icon: '🐳' },
  { id: 6, name: 'sleep_schedule.ics', type: 'Calendar', size: '1 KB', deleted: '2024-02-01', icon: '😴' },
  { id: 7, name: 'stackoverflow_copypaste/', type: 'Folder', size: '∞', deleted: '2024-01-15', icon: '📚' },
  { id: 8, name: 'css_is_easy.lie', type: 'Unknown', size: '0 KB', deleted: '2024-03-10', icon: '🤥' },
  { id: 9, name: 'node_modules_backup.zip', type: 'Archive', size: '4.7 GB', deleted: '2023-11-30', icon: '📦' },
  { id: 10, name: 'definitely_not_a_virus.exe', type: 'Application', size: '666 KB', deleted: '2024-01-01', icon: '🦠' },
  { id: 11, name: 'blockchain_get_rich_quick.sol', type: 'Solidity', size: '12 KB', deleted: '2024-02-20', icon: '💰' },
  { id: 12, name: 'unused_gsoc_proposal_draft3.md', type: 'Markdown', size: '24 KB', deleted: '2023-06-15', icon: '📝' },
]

export default function RecycleBin() {
  const [items, setItems] = useState(initialItems)
  const [selected, setSelected] = useState(null)
  const [confirmEmpty, setConfirmEmpty] = useState(false)
  const play = useSound()
  const { showNotification } = useStore()

  const handleRestore = (id) => {
    const item = items.find(i => i.id === id)
    play('restore')
    setItems(items.filter(i => i.id !== id))
    setSelected(null)
    if (item) {
      showNotification('Item Restored', `"${item.name}" has been restored to its original location.`, '♻️')
    }
  }

  const handleDelete = (id) => {
    play('recycle')
    setItems(items.filter(i => i.id !== id))
    setSelected(null)
  }

  const handleEmpty = () => {
    if (!confirmEmpty) {
      play('exclamation')
      setConfirmEmpty(true)
      return
    }
    play('emptyBin')
    setItems([])
    setSelected(null)
    setConfirmEmpty(false)
    showNotification('Recycle Bin', 'The Recycle Bin has been emptied.', '🗑️')
  }

  return (
    <div className="h-full flex flex-col bg-white" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-1.5 border-b border-gray-300 bg-[#ece9d8] flex-wrap">
        <button
          className="text-[10px] px-2 py-0.5 bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => selected && handleRestore(selected)}
          disabled={!selected}
        >
          ♻️ Restore
        </button>
        <button
          className="text-[10px] px-2 py-0.5 bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => selected && handleDelete(selected)}
          disabled={!selected}
        >
          ❌ Delete
        </button>
        <div className="w-px h-4 bg-gray-400" />
        <button
          className={`text-[10px] px-2 py-0.5 border border-gray-400 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            confirmEmpty ? 'bg-red-100 hover:bg-red-200 border-red-400 text-red-700 font-bold' : 'bg-[#d4d0c8] hover:bg-[#e4e0d8]'
          }`}
          onClick={handleEmpty}
          disabled={items.length === 0}
        >
          {confirmEmpty ? '⚠️ Confirm Empty?' : '🗑️ Empty Recycle Bin'}
        </button>
        {confirmEmpty && (
          <button
            className="text-[10px] px-2 py-0.5 bg-[#d4d0c8] border border-gray-400 rounded-sm cursor-pointer hover:bg-[#e4e0d8]"
            onClick={() => { play('click'); setConfirmEmpty(false) }}
          >
            Cancel
          </button>
        )}
        <span className="text-[10px] text-gray-500 ml-auto">
          {items.length} item(s)
        </span>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-auto">
        {/* Column headers */}
        <div className="flex items-center gap-4 px-3 py-1.5 bg-[#f5f4f0] border-b border-gray-300 text-[10px] font-bold text-gray-600 sticky top-0">
          <span className="w-52">Name</span>
          <span className="w-24">Type</span>
          <span className="w-16">Size</span>
          <span className="w-24">Date Deleted</span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <span className="text-3xl mb-2">🗑️</span>
            <span className="text-[11px]">Recycle Bin is empty</span>
            <span className="text-[10px] mt-1 text-gray-300">Nothing to see here!</span>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 px-3 py-1 cursor-pointer text-[11px] border-b border-gray-100 ${
                selected === item.id ? 'bg-blue-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => { play('click'); setSelected(item.id) }}
              onDoubleClick={() => handleRestore(item.id)}
            >
              <span className="w-52 flex items-center gap-2 truncate">
                <span>{item.icon}</span>
                <span className={`${selected === item.id ? 'text-blue-800' : 'text-gray-800'}`}>{item.name}</span>
              </span>
              <span className="w-24 text-gray-600">{item.type}</span>
              <span className="w-16 text-gray-600">{item.size}</span>
              <span className="w-24 text-gray-600">{item.deleted}</span>
            </div>
          ))
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#ece9d8] border-t border-gray-300 text-[10px] text-gray-600">
        <span>{selected ? 'Double-click to restore | Right-click for options' : `${items.length} item(s) in Recycle Bin`}</span>
        <span>♻️ Recycle Bin</span>
      </div>
    </div>
  )
}
