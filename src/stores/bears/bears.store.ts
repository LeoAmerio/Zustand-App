import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];


  totalBears: () => number;
  

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  Nothing: () => void;
  addBears: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist((set, get, store) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,

    bears: [{ id: 1, name: 'Oso #1'}],

    totalBears: ( ) => {
      console.log(store);
      
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
    

    increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
    increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
    Nothing: () => set((state) => ({ bears: [...state.bears] })),
    addBears: () => set((state) => ({
      bears: [...state.bears, {id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`}]
    })),
    clearBears: () => set({ bears: [] })
  }), { name: 'bears-store'}
  )
);

