import type { AvatarProps, ChipProps } from '@bitrix24/b24ui-nuxt';
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from 'vue-router';

export type UserSize = 'md' | '3xs' | '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl';

export type UserOrientation = 'horizontal' | 'vertical';

export interface UserModel {
  as?: any;
  name?: string;
  description?: string;
  avatar?: Omit<AvatarProps, 'size'> & { [key: string]: any };
  chip?: boolean | Omit<ChipProps, 'size' | 'inset'>;
  size?: UserSize;
  orientation?: UserOrientation;
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  onClick?: ((event: MouseEvent) => void | Promise<void>);
  b24ui?: {
    root?: any;
    wrapper?: any;
    name?: any;
    description?: any;
    avatar?: any;
  };
}
