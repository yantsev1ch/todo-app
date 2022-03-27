import React, { FC } from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import ErrorSnackbar from 'components/ErrorSnackbar/ErrorSnackbar';
import { useStores } from 'hooks/useStores';

export const Navbar: FC = observer(() => {
  const { authStore } = useStores();
  const logoutHandle = (): void => authStore.logout();

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6">Todo App</Typography>
          {authStore.isAuth && (
            <Button color="inherit" onClick={logoutHandle}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
});
