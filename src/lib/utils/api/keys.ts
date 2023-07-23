import { prisma } from "#/lib/db/prisma";
import { z } from "zod";

export const DecodedJwtSchema = z.object({ linkfy: z.boolean() });
export const DecodedJwtSchemaWithUser = z.object({ linkfy: z.boolean(), userId: z.string() });

export const authenticateRequest = async(request: Request): Promise<{ userId: string | undefined; success: boolean}> => {
  const apiKey = request.headers.get("apiKey");
  if (apiKey) {
    const userId = await isValidKey(apiKey);
    if (!userId) return { userId: undefined, success: false };
    if (userId) return { userId, success: true };
  }

  return { userId: undefined, success: false };
};

export const isValidKey = async(apiKey: string): Promise<string | false> => {
  const result = await prisma.user.findUnique({ where: { apiKey } });
  if (!result) return false;
  return result.id;
};

export const isPaidUser = async(userId: string): Promise<boolean> => {
  const result = await prisma.user.findUnique({ where: { id: userId } });
  if (!result) return false;
  return result.isPaid;
};