import { PUBLIC_URL } from "$env/static/public";
import type { Link } from "$lib/types/link.type";
import { z } from "zod";
import { restRequest } from "./request/request";

export function minimize(url: string, lengthMax = 21, end = "[...]") : string {
  if (url.length > lengthMax) return url.substring(0, lengthMax) + end;
  return url;
}

export function formatNumbers(number: number) : string {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return number.toString();
}

export function generateSlug(length = 5) : string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function createLink(url: string, visitorId: string | null, userId: string | null) : Promise<Link | boolean> {
  const response = await restRequest<Link>("post", PUBLIC_URL + "api/link/create", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url,
      slug: generateSlug(),
      userId,
      visitorId
    })
  });

  if (!response.success) {
    return false;
  }

  return response.data;
}

export async function getLink(slug: string) : Promise<Link | boolean> {
  const response = await restRequest<Link>("get", PUBLIC_URL + "api/link/" + slug);

  if (!response.success) {
    return false;
  }

  return response.data;
}

export function isAlreadyGenerated(url: string, links: Link[]) : boolean {
  return links.some(link => link.url === url);
}
