import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseApi} from '../base-api';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getUsers() {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJiYWxhbmNlIjowLCJyYXRlIjowLCJfaWQiOiI1ZDQ4NmY3M2I5YmJmMDY3MDgzYjM2NjgiLCJlbWFpbCI6InNoLnNhaWxhdWJhaUBnbWFpbC5jb20iLCJuYW1lIjoic2FpbGF1YmFpIiwiX192IjowLCJpYXQiOjE1NjUxNTI1NjYsImV4cCI6MTY5MTM4Mjk2Nn0.IrXUBYc-T4tCze3MaEALTvhj1nCN6gHp-ac-CB0BgVA');

    return this.getWithHeadersAndParams(`/admin/users/`, headers);
  }

  getUser(id) {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJiYWxhbmNlIjowLCJyYXRlIjowLCJfaWQiOiI1ZDQ4NmY3M2I5YmJmMDY3MDgzYjM2NjgiLCJlbWFpbCI6InNoLnNhaWxhdWJhaUBnbWFpbC5jb20iLCJuYW1lIjoic2FpbGF1YmFpIiwiX192IjowLCJpYXQiOjE1NjUxNTI1NjYsImV4cCI6MTY5MTM4Mjk2Nn0.IrXUBYc-T4tCze3MaEALTvhj1nCN6gHp-ac-CB0BgVA');

    return this.getWithHeadersAndParams(`/admin/users/${id}`, headers);
  }
}
