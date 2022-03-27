import React, { FC, SyntheticEvent } from 'react';

import { AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { observer } from 'mobx-react-lite';

import { ErrorSnackbarView } from 'components/ErrorSnackbar/ErrorSnackbarView';
import { useStores } from 'hooks/useStores';

const ErrorSnackbar: FC = observer(() => {
  const { authStore } = useStores();
  const handleClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    authStore.setError('');
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  return (
    <ErrorSnackbarView error={authStore.error} handleClose={handleClose} Alert={Alert} />
  );
});

export default ErrorSnackbar;
