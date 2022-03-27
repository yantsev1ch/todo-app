import React from 'react';

import { Login } from 'pages/Login';
import { Todolist } from 'pages/Todolist';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  LOGIN = '/login',
  TODOLIST = '/',
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, element: Login }];

export const privateRoutes: IRoute[] = [{ path: RouteNames.TODOLIST, element: Todolist }];
