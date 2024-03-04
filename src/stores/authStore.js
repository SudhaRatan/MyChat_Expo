import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../DL/MMKV_Storage";
import socket from "../Sockets/Socket";

export const createAuthStore = persist(
  (set) => ({
    isSignedIn: false,
    token: null,
    number: null,
    name: null,
    id: null,
    signIn: ({ token, number, name, id }) => {
      socket.connect();
      set((state) => ({
        isSignedIn: true,
        token: token,
        number: number,
        name: name,
        id: id,
      }));
    },
    signOut: () => {
      socket.disconnect();
      set(() => ({
        isSignedIn: false,
        token: null,
        number: null,
        name: null,
        id: null,
      }));
    },
  }),
  {
    name: "auth-storage",
    storage: createJSONStorage(() => zustandStorage),
  }
);
