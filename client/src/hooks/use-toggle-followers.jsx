import { create } from 'zustand'

export const useToggleFollowers = create(set => ({
  open: false,
  setOpen: () => set(state => ({ open: !state.open }))
}))

export const useToggleFollowings = create(set => ({
  toggle: false,
  setToggle: () => set(state => ({ toggle: !state.toggle }))
}))
