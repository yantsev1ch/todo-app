import { useContext } from 'react';

import { rootStore, RootStoreContext } from 'stores/rootStore';

export const useStores = (): typeof rootStore => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
