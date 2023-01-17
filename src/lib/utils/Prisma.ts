import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export interface ILink {
  createdAt: Date;
  baseUrl: string;
  shortUrl: string;
  clicksCount: number;
  fromClicks: Array<{ key: string, value: number }>;
  userId: string | null;
  visitorId: string;
}

export function patch(data: any) {
  return JSON.parse(JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() : value));
}

/**
 * @param type { "visitorId" | "userId" }
 * @param id 
 * @returns {Promise<ILink[]>}
 */
export async function getLinks(type: "visitorId" | "userId", id: string) : Promise<ILink[]> {
  return patch(await prisma.links_dev.findMany({
    where: {
      [type]: id,
    }
  }));
}

/**
 * @param shortUrl 
 * @returns {Promise<ILink>}
 */
export async function getLink(shortUrl: string) : Promise<ILink> {
  return patch(await prisma.links_dev.findMany({
    where: {
      shortUrl: shortUrl,
    }
  }));
}

/**
 * @param data 
 * @returns {Promise<any>}
 */
export async function createLink(data: any) : Promise<any> {
  return patch(await prisma.links_dev.create({
    data: data,
  }));
}

/**
 * @param shortUrl 
 * @param data 
 * @returns {Promise<any>}
 */
export async function updateLink(shortUrl: string, data: any) : Promise<any> {
  return patch(await prisma.links_dev.update({
    where: {
      shortUrl: shortUrl,
    },
    data: data,
  }));
}

/**
 * @param shortUrl 
 * @returns {Promise<any>}
 */
export async function deleteLink(shortUrl: string) : Promise<any> {
  return patch(await prisma.links_dev.delete({
    where: {
      shortUrl: shortUrl,
    }
  }));
}

// Users
// TODO

export default prisma;