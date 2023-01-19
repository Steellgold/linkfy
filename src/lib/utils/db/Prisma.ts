import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function patch(data: any) {
  return JSON.parse(JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() : value));
}

/**
 * @param type { "visitorId" | "userId" }
 * @param id 
 * @returns {Promise<any>}
 */
export async function getLinks(type: "visitorId" | "userId", id: number) : Promise<any> {
  return patch(await prisma.links.findMany({
    where: {
      [type]: id,
    }
  }));
}

/**
 * @param shortUrl 
 * @returns {Promise<any>}
 */
export async function getLink(shortUrl: string) : Promise<any> {
  return patch(await prisma.links.findMany({
    where: { shortUrl: "5eFCXA" },
  }))[0];
}

/**
 * @param data 
 * @returns {Promise<any>}
 */
export async function createLink(data: any) : Promise<any> {
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