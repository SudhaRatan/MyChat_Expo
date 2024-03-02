import { create } from "zustand";
import { createChatHeaderStore } from "./headerStore";
import { createAuthStore } from "./authStore";

export const useMainStore = create((...a) => ({
  ...createChatHeaderStore(...a),
  ...createAuthStore(...a),
}));
