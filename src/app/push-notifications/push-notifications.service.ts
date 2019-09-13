import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/fcm/`);
  }

  postData(data) {
    return this.post(`/fcm/`, data);
  }

  pushData(id) {
    return this.post(`/fcm/${id}`);
  }

}
