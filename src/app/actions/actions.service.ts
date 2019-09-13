import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getActions() {
    return this.get('/actions/actives');
  }

}
