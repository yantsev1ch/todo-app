import { UserType } from 'models/UserType';

export interface IAuth {
  isAuth: boolean;
  error: string;
  isLoading: boolean;
  user: UserType;
}
