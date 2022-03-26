import React, { FC, SyntheticEvent } from 'react';

import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { observer } from 'mobx-react-lite';

import { useStores } from 'hooks/useStores';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

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

  return (
    <Snackbar open={authStore.error !== ''} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {authStore.error}
      </Alert>
    </Snackbar>
  );
});

export default ErrorSnackbar;
