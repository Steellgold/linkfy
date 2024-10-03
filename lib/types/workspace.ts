import { Plan } from "@prisma/client"

export type Workspace = {
  id: string;
  name: string;
  plan: Plan;
}