import axios, { AxiosResponse } from 'axios';

import { UsersType } from 'models/UsersType';

export default class UsersApi {
  static async getAllUsers(): Promise<AxiosResponse<Array<UsersType>>> {
    return axios.get<Array<UsersType>>('https://jsonplaceholder.typicode.com/users');
  }
}
