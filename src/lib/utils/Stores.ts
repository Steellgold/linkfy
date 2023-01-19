import { writable } from "svelte/store";

export const visitorId = writable<string | null>(null);

export function getVisitorId() : string | null {
  let id = null;
  visitorId.subscribe((value) => {
    id = value;
  });
  return id;
}

export function setVisitorId(id: string) {
  visitorId.set(id);
}