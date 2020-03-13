import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.getWithParams(`/report/`, {start: '2019-05-05'});
  }

  getReports() {
    return this.getWithParams(`/admin/financial/report`, {start: '2019-05-05'});
  }
}
