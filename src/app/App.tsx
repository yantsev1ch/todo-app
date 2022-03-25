import React, { FC, useEffect } from 'react';

import 'app/App.css';
import { LinearProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';

import AppRouter from 'components/AppRouter';
import Navbar from 'components/Navbar';
import { UserType } from 'models/UserType';
import auth from 'store/auth/authStore';

const App: FC = observer(() => {
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      auth.setUser({ email: localStorage.getItem('email' || '') } as UserType);
      auth.setAuth(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {auth.isLoading && <LinearProgress />}
      <AppRouter />
    </div>
  );
});

export default App;
