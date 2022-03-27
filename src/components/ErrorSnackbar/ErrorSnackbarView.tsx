import React, { FC, ForwardedRef, ReactElement, SyntheticEvent } from 'react';

import { AlertProps, Snackbar } from '@mui/material';

interface IErrorSnackbar {
  error: string;
  handleClose: (event?: Event | SyntheticEvent<any, Event>, reason?: string) => void;
  Alert: (props: AlertProps, ref: ForwardedRef<HTMLDivElement>) => ReactElement | null;
}

export const ErrorSnackbarView: FC<IErrorSnackbar> = ({ error, Alert, handleClose }) => (
  <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  </Snackbar>
);
