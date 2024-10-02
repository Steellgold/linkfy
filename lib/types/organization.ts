import { Plan } from "@prisma/client"

export type Organization = {
  id: string;
  name: string;
  plan: Plan;
}