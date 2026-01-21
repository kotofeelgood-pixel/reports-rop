import type { IconComponent, ChipProps } from '@bitrix24/b24ui-nuxt';

export type AvatarSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface AvatarModel {
  as?: any;
  src?: string;
  alt?: string;
  icon?: IconComponent;
  text?: string;
  size?: AvatarSize;
  chip?: boolean | ChipProps;
  b24ui?: {
    root?: any;
    image?: any;
    fallback?: any;
    icon?: any;
  };
  // HTML img attributes
  crossorigin?: '' | 'anonymous' | 'use-credentials';
  decoding?: 'async' | 'auto' | 'sync';
  height?: number | string;
  loading?: 'lazy' | 'eager';
  referrerpolicy?: string;
  sizes?: string;
  srcset?: string;
  usemap?: string;
  width?: number | string;
}
