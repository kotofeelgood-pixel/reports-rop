export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

export type ProgressColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot'
  | 'air-secondary';

export type ProgressOrientation = 'horizontal' | 'vertical';

export type ProgressAnimation = 'carousel' | 'loading' | 'carousel-inverse' | 'swing' | 'elastic';

export interface ProgressModel {
  as?: any;
  max?: number | any[] | Record<string, string>;
  status?: boolean;
  inverted?: boolean;
  size?: ProgressSize;
  color?: ProgressColor;
  orientation?: ProgressOrientation;
  animation?: ProgressAnimation;
  getValueLabel?: (value: number | null | undefined, max: number) => string | undefined;
  getValueText?: (value: number | null | undefined, max: number) => string | undefined;
  modelValue?: number | null;
  b24ui?: {
    root?: any;
    base?: any;
    indicator?: any;
    status?: any;
    steps?: any;
    step?: any;
  };
}
