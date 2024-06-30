import { create } from "zustand";

export interface AppStore {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

export const useAppStore = create((set) => ({
  showNav: false,
  setShowNav: (showNav: boolean) => set({ showNav }),
}));
