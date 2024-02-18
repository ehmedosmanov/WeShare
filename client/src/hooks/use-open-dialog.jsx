import { create } from 'zustand'

const useOpenDialog = create(set => ({
  isOpenDialog: false,
  openDialog: () => set(state => ({ isOpenDialog: !state.isOpenDialog }))
}))

export default useOpenDialog
