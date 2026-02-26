import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const STORAGE_KEY = 'call-analytics-theme'
const B24_OPTION_KEY = 'call-analytics-theme'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false

  // 1) Пробуем взять тему из Bitrix24 (BX24.userOption)
  try {
    const w = window as unknown as {
      BX24?: {
        userOption?: {
          get?: (name: string) => unknown
          set?: (name: string, value: unknown) => void
        }
      }
    }
    const userOption = w.BX24?.userOption
    if (userOption && typeof userOption.get === 'function') {
      const stored = userOption.get(B24_OPTION_KEY)
      if (stored === 'dark') return true
      if (stored === 'light') return false
    }
  } catch {
    // ignore Bitrix errors
  }

  // 2) Фоллбек на localStorage (режим разработки/вне Bitrix)
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {
    // ignore
  }

  // 3) По умолчанию — системная тема
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function applyTheme(isDark: boolean) {
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
      const themeValue = value ? 'dark' : 'light'

      // Сохраняем настройку у пользователя в Bitrix24
      try {
        const w = window as unknown as {
          BX24?: {
            userOption?: {
              set?: (name: string, value: unknown) => void
            }
          }
        }
        const userOption = w.BX24?.userOption
        if (userOption && typeof userOption.set === 'function') {
          userOption.set(B24_OPTION_KEY, themeValue)
        }
      } catch {
        // ignore Bitrix errors
      }

      // Фоллбек на localStorage
      try {
        if (typeof window.localStorage !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, themeValue)
        }
      } catch {
        // ignore
      }
    },
    { immediate: false },
  )

  return {
    isDark,
    toggleTheme,
  }
})

export const useThemeStoreRefs = () => storeToRefs(useThemeStore())

