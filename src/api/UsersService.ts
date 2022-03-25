import axios, { AxiosResponse } from 'axios';

import { UserType } from 'models/UserType';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<UserType[]>> {
    return axios.get<UserType[]>('./users.json');
  }
}
