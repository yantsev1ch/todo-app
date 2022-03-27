import React, { FC } from 'react';

import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import { LoginFormView } from 'components/Login/LoginForm/LoginForm.view';
import { useStores } from 'hooks/useStores';

export interface FormValuesType {
  email: string;
  password: string;
}

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
  const { authStore } = useStores();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: FormValuesType) => {
      await authStore.login(values);
    },
  });

  if (authStore.isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <LoginFormView
      handleSubmit={formik.handleSubmit}
      getFieldProps={formik.getFieldProps}
      errors={formik.errors}
    />
  );
});
