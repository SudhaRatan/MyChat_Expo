import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../DL/MMKV_Storage";
import { create } from "zustand";

export const useContactStore = create(
  persist(
    (set) => ({
      permissionGranted: false,
      contacts: [],
      tempContacts: [],
      searchInput: "",
      setSearchInput: (inp) => {
        set((state) => ({
          searchInput: inp,
          contacts: state.tempContacts.filter(
            (item) => item.name.toLowerCase().includes(inp.toLowerCase()) || item.number.includes(inp)
          ),
        }));
      },
      fetchingUsers: false,
      setContacts: (conts) =>
        set((state) => ({
          contacts: conts,
        })),
      setTempContacts: (conts) =>
        set((state) => ({
          tempContacts: conts,
        })),
      setPermissionGranted: (val) =>
        set((state) => ({ permissionGranted: val })),
      setFetchingUsers: (val) =>
        set((state) => ({ fetchingUsers: val })),
    }),
    {
      name: "contact-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
