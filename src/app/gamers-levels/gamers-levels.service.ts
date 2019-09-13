import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamersLevelsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/levels/`);
  }

  deleteData(id) {
    return this.delete(`/levels/${id}`);
  }

  postData(data) {
    return this.post(`/levels/`, data);
  }

  editData(id, data) {
    return this.put(`/levels/${id}`, data);
  }
}
