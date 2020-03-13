import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CashReleaseRequestsService extends ApiService {

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
