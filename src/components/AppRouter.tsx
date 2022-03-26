import React from 'react';

import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useStores } from 'hooks/useStores';
import { privateRoutes, publicRoutes, RouteNames } from 'routes';

const AppRouter = observer(() => {
  const { authStore } = useStores();
  return authStore.isAuth ? (
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
  );
});

export default AppRouter;
