import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../DL/MMKV_Storage";

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [],
      setChats: (chats) => set((state) => ({ ...state, chats })),
      insertChat: (chat) => {
        var cs = get().chats;
        let existingChat = cs.find((item) => item.number == chat.number);
        if (!existingChat) {
          set((state) => ({ chats: [chat, ...state.chats] }));
        }
      },
      clearChats: () => set((state) => ({ ...state, chats: [] })),
    }),
    {
      name: "chats-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);