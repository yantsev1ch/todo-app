import React, { FC, useEffect } from 'react';

import 'components/App/App.style.scss';
import { observer } from 'mobx-react-lite';

import { AppView } from 'components/App/App.view';
import { useStores } from 'hooks/useStores';
import { AuthUserType } from 'types/AuthUserType';

const App: FC = observer(() => {
  const { authStore, todoStore } = useStores();
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      authStore.setUser({
        email: localStorage.getItem('email' || ''),
      } as AuthUserType);
      authStore.setAuth(true);
    }
    todoStore.getTasks();
    authStore.fetchUsers();
  }, []);

  return <AppView isLoading={authStore.isLoading} />;
});

export default App;
