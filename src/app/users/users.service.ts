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
    return this.get(`/admin/users/`);
  }

  postData(data) {
    return this.post(`/users/signin`, data);
  }

  editData(id, data) {
    return this.put(`/users/${id}`, data);
  }

  deleteData(id) {
    return this.delete(`/admin/users/${id}`);
  }

}
