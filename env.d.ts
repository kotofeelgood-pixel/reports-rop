/// <reference types="vite/client" />

declare global {
  interface Window {
    BX24?: {
      selectUsers?: (callback: (users: Array<{ id: number; name: string }>) => void) => void
    }
  }
}

export {}
