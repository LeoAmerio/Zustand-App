import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-leoamerio-default-rtdb.firebaseio.com/zustand';

const firebaseAPI: StateStorage = {
  getItem: async function ( name: string ): Promise<string | null> {
      const data = await fetch(`${firebaseUrl}/${ name }.json`).then(res => res.json());
      console.log(data)
      return JSON.stringify( data );
    
  },
  setItem: async function ( name: string, value: string ): Promise<void> {
    await fetch(`${firebaseUrl}/${ name }.json`, {
      method: 'PUT',
      body: value
    }).then(res => res.json());
    return;
  },
  removeItem: function ( name: string ): void | Promise<void> {
    console.log('removeItem', name);
  }
}

export const customFirebaseStorage = createJSONStorage(() => firebaseAPI)