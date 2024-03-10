import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useMessageStore = create(subscribeWithSelector((set) => ({
  message: {},
  setMessage: (msg) => {
    set((state) => ({ message: msg }));
  },
})));
