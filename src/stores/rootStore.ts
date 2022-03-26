import { createContext } from 'react';

import { Instance } from 'mobx-state-tree';

import AuthStore from 'stores/authStore';
import TodoStore from 'stores/todoStore';

export const rootStore = {
  authStore: AuthStore,
  todoStore: TodoStore,
};
export const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export const StoreProvider = RootStoreContext.Provider;
