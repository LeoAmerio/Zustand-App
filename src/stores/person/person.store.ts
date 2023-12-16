import { type StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { useWeddingBoundStore } from '../wedding';
// import { customFirebaseStorage } from '../storages/firebase.storage';
// import { logger } from '../middlewares/logger.middleware';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set( state => ({ firstName: value }), false, 'setFirstName' ),
  setLastName: (value: string) => set( state => ({ lastName: value }), false, 'setLastName')
})


export const usePersonStore = create<PersonState & Actions>()(
  // logger(
  devtools(
    persist(
      storeAPI
    , { name: 'person-storage',
      // storage: customFirebaseStorage
    })
  )
  // )
);

usePersonStore.subscribe((nextSatate) => {
  const { firstName, lastName } = nextSatate;
  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});