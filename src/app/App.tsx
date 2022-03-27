import React, { FC, useEffect } from 'react';

import './App.scss';

import { LinearProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { AppRouter } from 'components/AppRouter';
import { Navbar } from 'components/Navbar';
import { useStores } from 'hooks/useStores';
import { AuthUserType } from 'models/AuthUserType';

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

  return (
    <div>
      <Navbar />
      {authStore.isLoading && <LinearProgress />}
      <AppRouter />
    </div>
  );
});

export default App;
