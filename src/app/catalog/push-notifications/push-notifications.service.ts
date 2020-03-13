import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService extends ApiService {

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
