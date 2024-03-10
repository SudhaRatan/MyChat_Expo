import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "../DL/MMKV_Storage"

export const useThemeStore = create(persist((set) => ({
    theme:'light',
    setTheme: (t) => set({theme: t})
}),{
    name: 'theme-store',
    storage: createJSONStorage(() => zustandStorage)
}))