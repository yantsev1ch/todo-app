import React, { FC } from 'react';

import { LinearProgress } from '@mui/material';

import { Navbar } from 'components/Navbar/Navbar';
import { AppRouter } from 'routes/AppRouter';

interface IAppView {
  isLoading: boolean;
}

export const AppView: FC<IAppView> = ({ isLoading }) => (
  <div>
    <Navbar />
    {isLoading && <LinearProgress />}
    <AppRouter />
  </div>
);
