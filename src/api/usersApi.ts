import axios, { AxiosResponse } from 'axios';

import { FetchUsersType } from 'models/FetchUsersType';

export default class UsersApi {
  static async getAllUsers(): Promise<AxiosResponse<Array<FetchUsersType>>> {
    return axios.get<Array<FetchUsersType>>('https://jsonplaceholder.typicode.com/users');
  }
}
