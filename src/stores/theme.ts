import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const STORAGE_KEY = 'call-analytics-theme'

function getInitialTheme (): boolean {
  if (typeof window === 'undefined') return false

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {
    // ignore
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function applyTheme (isDark: boolean) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(getInitialTheme())

  applyTheme(isDark.value)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(
    isDark,
    (value) => {
      applyTheme(value)
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light')
        }
      } catch {
        // ignore
      }
    },
    { immediate: false }
  )

  return {
    isDark,
    toggleTheme,
  }
})

export const useThemeStoreRefs = () => storeToRefs(useThemeStore())

