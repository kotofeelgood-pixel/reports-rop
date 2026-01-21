import type { Meta } from '@storybook/vue3-vite'

export const commonMeta = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
} satisfies Partial<Meta>

export function createMeta<T extends Meta>(
  title: string,
  component: T['component'],
  customMeta?: Partial<T>
): Meta {
  return {
    ...commonMeta,
    title,
    component,
    ...(customMeta || {}),
  } satisfies Meta
}
