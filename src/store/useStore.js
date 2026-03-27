import { create } from 'zustand'

const useStore = create((set, get) => ({
  // System state: 'boot' | 'login' | 'desktop' | 'shutdown' | 'logoff'
  systemState: 'boot',
  setSystemState: (state) => set({ systemState: state }),

  // Windows management
  windows: [],
  activeWindowId: null,
  nextZIndex: 10,

  openWindow: (windowConfig) => {
    const state = get()
    const existing = state.windows.find(w => w.id === windowConfig.id)
    if (existing) {
      if (existing.minimized) {
        set({
          windows: state.windows.map(w =>
            w.id === windowConfig.id ? { ...w, minimized: false, zIndex: state.nextZIndex } : w
          ),
          activeWindowId: windowConfig.id,
          nextZIndex: state.nextZIndex + 1,
        })
      } else {
        set({
          windows: state.windows.map(w =>
            w.id === windowConfig.id ? { ...w, zIndex: state.nextZIndex } : w
          ),
          activeWindowId: windowConfig.id,
          nextZIndex: state.nextZIndex + 1,
        })
      }
      return
    }
    const newWindow = {
      id: windowConfig.id,
      title: windowConfig.title,
      icon: windowConfig.icon,
      component: windowConfig.component,
      x: 80 + (state.windows.length * 30) % 200,
      y: 50 + (state.windows.length * 30) % 150,
      width: windowConfig.width || 700,
      height: windowConfig.height || 500,
      minimized: false,
      maximized: false,
      zIndex: state.nextZIndex,
    }
    set({
      windows: [...state.windows, newWindow],
      activeWindowId: newWindow.id,
      nextZIndex: state.nextZIndex + 1,
    })
  },

  closeWindow: (id) => {
    const state = get()
    const filtered = state.windows.filter(w => w.id !== id)
    set({
      windows: filtered,
      activeWindowId: filtered.length > 0
        ? filtered.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id
        : null,
    })
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, minimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    }))
  },

  focusWindow: (id) => {
    const state = get()
    set({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: state.nextZIndex, minimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      ),
    }))
  },

  updateWindowSize: (id, width, height) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, width, height } : w
      ),
    }))
  },

  // Desktop icons
  iconPositions: {},
  setIconPosition: (id, x, y) => {
    set((state) => ({
      iconPositions: { ...state.iconPositions, [id]: { x, y } },
    }))
  },

  // Start menu
  startMenuOpen: false,
  toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),

  // Sound
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Volume level 0-100
  volumeLevel: 75,
  setVolumeLevel: (level) => set({ volumeLevel: Math.max(0, Math.min(100, level)) }),

  // Context menu
  contextMenu: null, // { x, y, items: [{ label, action, icon?, separator?, disabled? }] }
  showContextMenu: (x, y, items) => set({ contextMenu: { x, y, items } }),
  hideContextMenu: () => set({ contextMenu: null }),

  // Error/alert dialog
  errorDialog: null, // { title, message, type: 'error' | 'warning' | 'info' }
  showErrorDialog: (title, message, type = 'error') => set({ errorDialog: { title, message, type } }),
  hideErrorDialog: () => set({ errorDialog: null }),

  // Notification balloon
  notification: null, // { title, message, icon? }
  showNotification: (title, message, icon) => {
    set({ notification: { title, message, icon } })
    setTimeout(() => {
      if (get().notification?.title === title) set({ notification: null })
    }, 5000)
  },
  hideNotification: () => set({ notification: null }),

  // Turn off / Log off dialogs
  turnOffDialogOpen: false,
  showTurnOffDialog: () => set({ turnOffDialogOpen: true, startMenuOpen: false }),
  hideTurnOffDialog: () => set({ turnOffDialogOpen: false }),

  logOffDialogOpen: false,
  showLogOffDialog: () => set({ logOffDialogOpen: true, startMenuOpen: false }),
  hideLogOffDialog: () => set({ logOffDialogOpen: false }),

  // Close all windows (for logout/shutdown)
  closeAllWindows: () => set({
    windows: [],
    activeWindowId: null,
    nextZIndex: 10,
    startMenuOpen: false,
    contextMenu: null,
    errorDialog: null,
    turnOffDialogOpen: false,
    logOffDialogOpen: false,
  }),
}))

export default useStore
