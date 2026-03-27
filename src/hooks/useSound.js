import { useCallback } from 'react'
import useStore from '../store/useStore'

// Audio cache to avoid creating new Audio objects every time
const audioCache = {}

function getAudio(src) {
  if (!audioCache[src]) {
    audioCache[src] = new Audio(src)
  }
  return audioCache[src]
}

function playFile(src, volume = 1.0) {
  try {
    const audio = getAudio(src)
    const state = useStore.getState()
    audio.volume = Math.min(1, volume * (state.volumeLevel / 100))
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch (e) {
    // Silently fail if audio can't play
  }
}

// Synthesized click sound (Web Audio API) — snappy and instant
let audioCtx = null
function getAudioCtx() {
  if (!audioCtx && typeof window !== 'undefined') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  const ctx = getAudioCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

// Map sound names — WAV files for major sounds, synthesized for quick UI clicks
export const sounds = {
  startup: () => playFile('/sounds/Windows XP Startup.wav', 0.7),
  login: () => playFile('/sounds/Windows XP Startup.wav', 0.5),
  click: () => playTone(1000, 0.05, 'square', 0.08),
  error: () => playFile('/sounds/Windows XP Error.wav', 0.6),
  exclamation: () => playFile('/sounds/Windows XP Error.wav', 0.4),
  notify: () => {
    playTone(880, 0.08, 'sine', 0.12)
    setTimeout(() => playTone(1100, 0.08, 'sine', 0.1), 80)
  },
  shutdown: () => playFile('/sounds/Windows XP Shutdown.wav', 0.7),
  logoff: () => playFile('/sounds/Windows XP Logoff Sound.wav', 0.7),
  minimize: () => {
    playTone(600, 0.08, 'sine', 0.1)
    setTimeout(() => playTone(400, 0.08, 'sine', 0.08), 50)
  },
  maximize: () => {
    playTone(400, 0.08, 'sine', 0.1)
    setTimeout(() => playTone(600, 0.08, 'sine', 0.08), 50)
  },
  open: () => {
    playTone(500, 0.08, 'sine', 0.1)
    setTimeout(() => playTone(700, 0.1, 'sine', 0.08), 60)
  },
  close: () => {
    playTone(600, 0.06, 'sine', 0.08)
    setTimeout(() => playTone(400, 0.08, 'sine', 0.06), 40)
  },
  recycle: () => playFile('/sounds/Windows XP Recycle.wav', 0.6),
  emptyBin: () => playFile('/sounds/Windows XP Recycle.wav', 0.8),
  restore: () => {
    playTone(300, 0.1, 'triangle', 0.1)
    setTimeout(() => playTone(500, 0.1, 'triangle', 0.08), 80)
  },
  navigate: () => playTone(800, 0.06, 'sine', 0.06),
  menuOpen: () => playTone(700, 0.04, 'sine', 0.06),
  menuClose: () => playTone(500, 0.04, 'sine', 0.04),
  ding: () => playTone(1200, 0.3, 'sine', 0.12),
}

export function useSound() {
  const soundEnabled = useStore(state => state.soundEnabled)

  const play = useCallback((soundName) => {
    if (!soundEnabled) return
    const soundFn = sounds[soundName]
    if (soundFn) soundFn()
  }, [soundEnabled])

  return play
}
