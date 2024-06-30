import { create } from "zustand";

export interface AppStore {
  showNav: boolean;
  active: boolean;
  setShowNav: (showNav: boolean) => void;
  setActive: (showNav: boolean) => void;
}

export const useAppStore = create((set) => ({
  active: false,
  showNav: false,
  setShowNav: (showNav: boolean) => set({ showNav }),
  setActive: (active: boolean) => set({ active }),
}));
