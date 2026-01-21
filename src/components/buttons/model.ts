import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from 'vue-router';

// Размеры кнопок
export type ButtonSize = "xs" | "md" | "xss" | "sm" | "lg" | "xl"

// Цветовая схема кнопок
export type ButtonColor = "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-secondary" | "air-secondary-alert" | "air-secondary-accent" | "air-secondary-accent-1" | "air-secondary-accent-2" | "air-secondary-no-accent" | "air-tertiary" | "air-tertiary-accent" | "air-tertiary-no-accent" | "air-selection" | "air-boost" | "link"

export interface ButtonModel {
  label: string;
  icon?: IconComponent;
  size?: ButtonSize;
  color?: ButtonColor;
  useDropdown?: boolean;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  block?: boolean;
  activeColor?: ButtonColor;
  avatar?: AvatarProps
  useClock?: boolean;
  useWait?: boolean;
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  activeClass?: string;
  inactiveClass?: string;
  type?: 'button' | 'submit' | 'reset';
}
