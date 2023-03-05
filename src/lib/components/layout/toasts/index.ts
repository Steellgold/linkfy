export { default as Toasts } from './toasts.svelte';

import { get, writable } from "svelte/store";
import type { ToastProps } from './toast.types';

export const toasts = writable<ToastProps[]>([]);

export function notify(toast: ToastProps) {
  if (get(toasts).length > 0) toasts.set([]);

  toasts.set([...get(toasts), toast]);
  setTimeout(() => toasts.set(get(toasts).slice(1)), 5000);
}