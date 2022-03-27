import axios, { AxiosResponse } from 'axios';

import { AuthUserType } from 'types/AuthUserType';

export default class AuthApi {
  static async getAuthUsers(): Promise<AxiosResponse<Array<AuthUserType>>> {
    return axios.get<Array<AuthUserType>>('./auth.json');
  }
}
