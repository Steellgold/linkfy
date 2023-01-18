import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export interface ILink {
  id?: number;
  createdAt?: Date;
  userId?: string;
  visitorId: string;
  baseUrl: string;
  shortUrl: string;
  clicksCount: number;
  fromClicks: Array<{ key: string, value: number }>;
}

export function patch(data: any) {
  return JSON.parse(JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() : value));
}

/**
 * @param type { "visitorId" | "userId" }
 * @param id 
 * @returns {Promise<ILink[]>}
 */
export async function getLinks(type: "visitorId" | "userId", id: number) : Promise<ILink[]> {
  return patch(await prisma.links.findMany({
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
  return patch(await prisma.links.findMany({
    where: {
      shortUrl: shortUrl,
    }
  }));
}

/**
 * @param data 
 * @returns {Promise<any>}
 */
export async function createLink(data: ILink) : Promise<any> {
  return patch(await prisma.links.create({
    data: data,
  }));
}

/**
 * @param shortUrl 
 * @param data 
 * @returns {Promise<any>}
 */
export async function updateLink(linkId: number, data: any) : Promise<any> {
  return await prisma.links.update({
    where: {
      id: linkId,
    },
    data: data,
  });
}

/**
 * @param shortUrl 
 * @returns {Promise<any>}
 */
export async function deleteLink(linkId: number) : Promise<any> {
  return patch(await prisma.links.delete({
    where: {
      id: linkId,
    }
  }));
}

// Users
// TODO

export default prisma;