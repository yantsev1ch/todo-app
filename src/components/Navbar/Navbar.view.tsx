import React, { FC } from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import ErrorSnackbar from 'components/ErrorSnackbar/ErrorSnackbar';

interface INavbar {
  isAuth: boolean;
  logout: () => void;
}

export const NavbarView: FC<INavbar> = ({ isAuth, logout }) => (
  <div>
    <ErrorSnackbar />
    <AppBar position="static">
      <Toolbar className="navbar">
        <Typography variant="h6">Todo App</Typography>
        {isAuth && (
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
);
