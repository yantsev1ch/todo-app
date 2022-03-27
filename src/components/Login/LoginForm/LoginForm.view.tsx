import React, { FC } from 'react';

import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { FieldInputProps, FormikErrors } from 'formik';

interface ILoginForm {
  handleSubmit: () => void;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  errors: FormikErrors<{ email: string; password: string }>;
}

export const LoginFormView: FC<ILoginForm> = ({
  handleSubmit,
  getFieldProps,
  errors,
}) => (
  <Grid className="form-container">
    <Grid item xs={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>Use common test account credentials:</p>
            <p> Email: free@free.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField margin="normal" {...getFieldProps('email')} />
            {errors.email ? <div>{errors.email}</div> : null}
            <TextField type="password" margin="normal" {...getFieldProps('password')} />
            {errors.password ? <div>{errors.password}</div> : null}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
);
