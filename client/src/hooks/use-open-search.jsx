import { create } from 'zustand'

const useOpenSearch = create(set => ({
  open: false,
  setOpen: () => set(state => ({ open: !state.open }))
}))

export default useOpenSearch
