export const createChatHeaderStore = (set) => ({
  headerName: "",
  imageSource: "",
  changeheaderName: (name, img) => set((state) => ({ headerName: name, imageSource:img })),
});
