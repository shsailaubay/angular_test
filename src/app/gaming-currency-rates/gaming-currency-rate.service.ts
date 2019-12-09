import {Injectable} from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamingCurrencyRateService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/admin/exchange`);
  }

  postData(data) {
    return this.post(`/admin/exchange`, data);
  }
}
