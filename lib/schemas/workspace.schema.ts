import { z } from "zod";

export const Plan = z.enum(["FREE", "PLUS"]);
export type Plan = z.infer<typeof Plan>;

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: Plan,
});

export type Workspace = z.infer<typeof WorkspaceSchema>;