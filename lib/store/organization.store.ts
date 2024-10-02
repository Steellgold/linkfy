import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationState {
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (id: string) => void;
}

export const useOrganizationStore = create(
  persist<OrganizationState>(
    (set) => ({
      selectedOrganizationId: null,
      setSelectedOrganizationId: (id) => set({ selectedOrganizationId: id }),
    }),
    {
      name: "organization",
    }
  )
)