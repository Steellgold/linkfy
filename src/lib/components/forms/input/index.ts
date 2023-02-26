export { default as Input } from './input.svelte';
export { default as InputIndicator } from './input-indicator.svelte';

export type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  label?: string;
  indicator?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  size: 'small' | 'large';
};

export const SizeClasses = {
  small: 'w-auto',
  large: 'w-full'
};