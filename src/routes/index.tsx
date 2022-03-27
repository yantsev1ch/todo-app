import React from 'react';

import { LoginView } from 'components/Login/Login.view';
import { Todolist } from 'components/Todolist/Todolist';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  LOGIN = '/login',
  TODOLIST = '/',
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, element: LoginView }];

export const privateRoutes: IRoute[] = [{ path: RouteNames.TODOLIST, element: Todolist }];
