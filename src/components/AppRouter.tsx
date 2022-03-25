import React from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';

import { privateRoutes, publicRoutes, RouteNames } from 'routes';
import auth from 'store/auth/authStore';

const AppRouter = observer(() =>
  auth.isAuth ? (
    <Routes>
      {privateRoutes.map(route => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.TODOLIST} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(route => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
    </Routes>
  ),
);

export default AppRouter;
