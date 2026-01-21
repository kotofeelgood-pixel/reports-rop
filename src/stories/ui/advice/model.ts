import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type AdviceAngle = 'bottom' | 'top';

export interface AdviceModel {
  as?: any;
  description?: string;
  angle?: AdviceAngle;
  icon?: IconComponent;
  avatar?: AvatarProps;
  b24ui?: {
    root?: any;
    descriptionWrapper?: any;
    descriptionBorder?: any;
    descriptionBg?: any;
    descriptionAngle?: any;
    description?: any;
    leading?: any;
    leadingIcon?: any;
    leadingAvatar?: any;
    leadingAvatarIcon?: any;
    leadingAvatarSize?: any;
  };
}
