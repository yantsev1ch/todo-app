import React, { FC } from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import ErrorSnackbar from 'components/ErrorSnackbar';
import auth from 'store/auth/authStore';

const Navbar: FC = observer(() => {
  const logoutHandle = (): Promise<void> => auth.logout();

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6">Todo App</Typography>
          {auth.isAuth && (
            <Button color="inherit" onClick={logoutHandle}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Navbar;
