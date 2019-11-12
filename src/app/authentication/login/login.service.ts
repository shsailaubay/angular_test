import { Injectable } from '@angular/core';
import {BaseApi} from '../../base-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  postLogin(data) {
    return this.post(`/users/login/`, data);
  }

  resetPassword(data) {
    return this.post(`/users/reset_password/`, data);
  }

}
