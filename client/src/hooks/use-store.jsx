import { create } from 'zustand'

const useStore = create(set => ({
  postId: null,
  openDialog: false,
  setPostId: id => set({ postId: id }),
  setOpenDialog: open => set({ openDialog: open })
}))

export default useStore
