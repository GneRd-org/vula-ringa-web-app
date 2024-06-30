import { create } from "zustand";

export interface LangStore {
  fromLang: string;
  toLang: string;
  textMode: boolean;
  setFromLang: (fromLang: string) => void;
  setToLang: (toLang: string) => void;
  setTextMode: (textMode: boolean) => void;
}

export const useLangStore = create((set) => ({
  textMode: true,
  fromLang: "English",
  toLang: "isiZulu",
  setFromLang: (fromLang: string) => set({ fromLang }),
  setToLang: (toLang: string) => set({ toLang }),
  setTextMode: (textMode: boolean) => set({ textMode }),
}));
