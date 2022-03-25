import { makeAutoObservable } from 'mobx';

import UserService from 'api/UsersService';
import { FormValuesType } from 'components/LoginForm';
import { UserType } from 'models/UserType';
import { IAuth } from 'store/auth/IAuth';

class AuthStore implements IAuth {
  isAuth = false;

  error = '';

  isLoading = false;

  user = {} as UserType;

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

  setUser(user: UserType): void {
    this.user = user;
  }

  async login(values: FormValuesType): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await UserService.getUsers();
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
    this.setUser({} as UserType);
    this.setAuth(false);
  }
}

export default new AuthStore();
