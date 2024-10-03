import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkspaceState {
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: (id: string) => void;
}

export const useWorkspaceStore = create(
  persist<WorkspaceState>(
    (set) => ({
      selectedWorkspaceId: null,
      setSelectedWorkspaceId: (id) => set({ selectedWorkspaceId: id }),
    }),
    {
      name: "workspace",
    }
  )
)