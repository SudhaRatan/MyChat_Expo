export const createAuthStore = (set) => ({
  isSignedIn: false,
  token: null,
  number: null,
  signIn: ({ token, number }) =>
    set((state) => ({ isSignedIn: true, token: token, number: number })),
  signOut: () => set(() => ({ isSignedIn: false, token: null, number: null })),
});
