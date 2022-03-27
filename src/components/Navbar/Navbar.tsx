import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { NavbarView } from 'components/Navbar/Navbar.view';
import { useStores } from 'hooks/useStores';

export const Navbar: FC = observer(() => {
  const { authStore } = useStores();
  const logoutHandle = (): void => authStore.logout();

  return <NavbarView isAuth={authStore.isAuth} logout={logoutHandle} />;
});
