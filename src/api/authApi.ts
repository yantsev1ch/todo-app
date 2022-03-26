import axios, { AxiosResponse } from 'axios';

import { AuthModel } from 'models/AuthModel';

export default class AuthApi {
  static async getAuthUsers(): Promise<AxiosResponse<AuthModel[]>> {
    return axios.get<AuthModel[]>('./auth.json');
  }
}
