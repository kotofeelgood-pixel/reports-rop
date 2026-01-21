import type { AvatarSize } from '../avatar/model';

export interface AvatarGroupModel {
  as?: any;
  size?: AvatarSize;
  max?: string | number;
  b24ui?: {
    root?: any;
    base?: any;
  };
}
