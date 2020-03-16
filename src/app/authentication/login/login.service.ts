import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {

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
