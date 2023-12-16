import { StateCreator } from 'zustand';


export interface GuestSlice {
  guessCount: number;

  setGuestCount: (guessCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set, get, storeApi) => ({
  guessCount: 0,

  setGuestCount: (guessCount: number) => set({ guessCount: guessCount > 0 ? guessCount : 0 }),
})