import { makeAutoObservable } from 'mobx';

import AuthApi from 'api/authApi';
import UsersApi from 'api/usersApi';
import { FormValuesType } from 'components/LoginForm';
import { AuthUserType } from 'models/AuthUserType';
import { FetchUsersType } from 'models/FetchUsersType';

export interface IAuth {
  isAuth: boolean;
  error: string;
  isLoading: boolean;
  user: AuthUserType;
  users: Array<FetchUsersType>;
}

class AuthStore implements IAuth {
  isAuth = false;

  error = '';

  isLoading = false;

  user = {} as AuthUserType;

  users: Array<FetchUsersType> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  setError(error: string): void {
    this.error = error;
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  setUser(user: AuthUserType): void {
    this.user = user;
  }

  setReceivedUsers(users: Array<FetchUsersType>): void {
    this.users = users;
  }

  async login(values: FormValuesType): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await AuthApi.getAuthUsers();
      const mockUser = response.data.find(
        user => user.email === values.email && user.password === values.password,
      );
      if (mockUser) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('email', mockUser.email);
        this.setUser(mockUser);
        this.setAuth(true);
      } else {
        this.setError('Incorrect login or password');
      }
      this.setIsLoading(false);
    } catch (e) {
      this.setError('Login error');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    this.setUser({} as AuthUserType);
    this.setAuth(false);
  }

  async fetchUsers(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await UsersApi.getAllUsers();
      const receivedUsers = [...response.data];
      if (receivedUsers) {
        localStorage.setItem('users', JSON.stringify(receivedUsers));
        this.setReceivedUsers(receivedUsers);
      } else {
        this.setError('Users not found');
      }
      this.setIsLoading(false);
    } catch (e) {
      this.setError('Error fetch users');
    }
  }
}

export default new AuthStore();
