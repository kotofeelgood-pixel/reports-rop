import { ref } from 'vue'

export type NotifyType = 'info' | 'success' | 'warning' | 'error'

export interface NotifyItem {
  id: string
  title: string
  description?: string
  type?: NotifyType
  /** 0–100, показывать прогресс-бар */
  progress?: number
  open: boolean
}

const toasts = ref<NotifyItem[]>([])
const MAX_TOASTS = 5

function generateId(): string {
  return `notify-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Плагин уведомлений (тосты) с поддержкой прогресса.
 * Использовать для экспорта XLSX и других операций с отображением прогресса.
 */
export function useNotify() {
  function add(options: {
    title: string
    description?: string
    type?: NotifyType
    progress?: number
  }): NotifyItem {
    const item: NotifyItem = {
      id: generateId(),
      title: options.title,
      description: options.description,
      type: options.type ?? 'info',
      progress: options.progress,
      open: true,
    }
    toasts.value = [...toasts.value, item].slice(-MAX_TOASTS)
    return item
  }

  function update(
    id: string,
    patch: Partial<Pick<NotifyItem, 'title' | 'description' | 'type' | 'progress'>>
  ): void {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value = toasts.value.map((t) =>
        t.id === id ? { ...t, ...patch } : t
      )
    }
  }

  function remove(id: string): void {
    toasts.value = toasts.value.map((t) =>
      t.id === id ? { ...t, open: false } : t
    )
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 300)
  }

  /** Показать уведомление с прогрессом; возвращает id для последующего update */
  function progress(options: {
    title: string
    description?: string
    percent?: number
  }): NotifyItem {
    return add({
      title: options.title,
      description: options.description,
      type: 'info',
      progress: options.percent ?? 0,
    })
  }

  return {
    toasts,
    add,
    update,
    remove,
    progress,
  }
}
