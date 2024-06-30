import { create } from "zustand";

export interface AppStore {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

const useAppStore = create((set) => ({
  showNav: false,
  setShowNav: (showNav: boolean) => set({ showNav }),
}));

export default useAppStore;
