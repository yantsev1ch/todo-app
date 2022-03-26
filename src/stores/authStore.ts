import { makeAutoObservable } from 'mobx';

import AuthApi from 'api/authApi';
import { FormValuesType } from 'components/LoginForm';
import { AuthModel } from 'models/AuthModel';

export interface IAuth {
  isAuth: boolean;
  error: string;
  isLoading: boolean;
  user: AuthModel;
}

class AuthStore implements IAuth {
  isAuth = false;

  error = '';

  isLoading = false;

  user = {} as AuthModel;

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

  setUser(user: AuthModel): void {
    this.user = user;
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
    this.setUser({} as AuthModel);
    this.setAuth(false);
  }
}

export const AuthStoreInitialState = {
  isAuth: false,
  error: '',
  isLoading: false,
  user: {} as AuthModel,
};

export default new AuthStore();
