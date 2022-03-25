import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import auth from 'store/auth/authStore';

const Todolist: FC = observer(() => {
  if (!auth.isAuth) {
    return <Navigate to="/login" />;
  }

  return <div>Todolist</div>;
});

export default Todolist;
