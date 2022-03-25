import React, { FC, SyntheticEvent } from 'react';

import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { observer } from 'mobx-react-lite';

import auth from 'store/auth/authStore';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ErrorSnackbar: FC = observer(() => {
  const handleClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    auth.setError('');
  };

  return (
    <Snackbar open={auth.error !== ''} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {auth.error}
      </Alert>
    </Snackbar>
  );
});

export default ErrorSnackbar;
