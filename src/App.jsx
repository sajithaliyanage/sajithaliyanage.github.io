import { AnimatePresence } from 'framer-motion'
import useStore from './store/useStore'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import ShutdownScreen from './components/ShutdownScreen'

function App() {
  const systemState = useStore((s) => s.systemState)

  return (
    <div className="w-screen h-screen overflow-hidden no-select" style={{ cursor: 'default' }}>
      <AnimatePresence mode="wait">
        {systemState === 'boot' && <BootScreen key="boot" />}
        {systemState === 'login' && <LoginScreen key="login" />}
        {(systemState === 'desktop' || systemState === 'logoff') && <Desktop key="desktop" />}
        {systemState === 'shutdown' && <ShutdownScreen key="shutdown" />}
      </AnimatePresence>
      {/* Mobile warning */}
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center text-white text-center p-8 md:hidden">
        <div>
          <div className="text-4xl mb-4">🖥️</div>
          <h2 className="text-xl font-bold mb-2">Best Experienced on Desktop</h2>
          <p className="text-gray-400">This portfolio simulates Windows SL and requires a larger screen for the full experience.</p>
        </div>
      </div>
    </div>
  )
}

export default App
