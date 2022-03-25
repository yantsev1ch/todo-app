import React, { FC } from 'react';

import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import auth from 'store/auth/authStore';

export type FormValuesType = {
  email: string;
  password: string;
};

const minValue = 4;
const maxValue = 8;

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please Enter your email'),
  password: Yup.string()
    .min(minValue, 'Too Short!')
    .max(maxValue, 'Too Long!')
    .required('Please Enter your password'),
});

export const LoginForm: FC = observer(() => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: FormValuesType) => {
      await auth.login(values);
    },
  });

  if (auth.isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 64px)"
    >
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>Use common test account credentials:</p>
              <p> Email: free@free.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Box>
  );
});
