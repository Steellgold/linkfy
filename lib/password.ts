import { env } from "@/env.mjs";
import { createCipheriv, createDecipheriv } from "crypto";

export const decryptData = (data: string): string => {
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex");
  const iv = Buffer.from(env.ENCRYPTION_IV, "hex");

  const decipher = createDecipheriv(env.ENCRYPTION_ALGORITHM, key, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const encryptData = (data: string): string => {
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex");
  const iv = Buffer.from(env.ENCRYPTION_IV, "hex");

  const cipher = createCipheriv(env.ENCRYPTION_ALGORITHM, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};