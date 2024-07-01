import { create } from "zustand";

export interface AppStore {
  showNav: boolean;
  active: boolean;
  uploadId: string;
  setShowNav: (showNav: boolean) => void;
  setActive: (showNav: boolean) => void;
  setUploadId: (uploadId: string) => void;
}

export const useAppStore = create((set) => ({
  active: false,
  showNav: false,
  uploadId: "",
  setShowNav: (showNav: boolean) => set({ showNav }),
  setActive: (active: boolean) => set({ active }),
  setUploadId: (uploadId: string) => set({ uploadId }),
}));
