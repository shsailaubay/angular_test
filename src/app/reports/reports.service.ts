import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.getWithParams(`/report/`, {start: '2019-05-05'});
  }
}
