import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export type SeparatorAccent = 'default' | 'accent' | 'less';

export type SeparatorSize = 'thin' | 'thick';

export type SeparatorType = 'solid' | 'double' | 'dashed' | 'dotted';

export interface SeparatorModel {
  as?: any;
  label?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  accent?: SeparatorAccent;
  size?: SeparatorSize;
  type?: SeparatorType;
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  b24ui?: {
    root?: any;
    border?: any;
    container?: any;
    icon?: any;
    avatar?: any;
    avatarSize?: any;
    label?: any;
  };
}
