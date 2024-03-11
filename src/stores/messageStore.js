import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useMessageStore = create((set) => ({
  currentScreen:"",
  setCurrentScreen:(cs) => set({currentScreen: cs})
}));
