import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CashReleaseRequestsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/admin/financial`);
  }

  approveRequest(id, accept) {
    return this.post(`/admin/financial/${id}`, {accept: accept});
  }
}
