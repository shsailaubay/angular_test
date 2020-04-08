import {Injectable} from '@angular/core';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamingCurrencyRateService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/admin/exchange`);
  }

  getAmountCurrencies() {
    return this.get(`/users/exchange/rates`);
  }

  postData(data) {
    return this.post(`/admin/exchange`, data);
  }
}
