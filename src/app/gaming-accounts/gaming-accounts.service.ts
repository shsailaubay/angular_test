import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../base-api';

@Injectable({
  providedIn: 'root'
})
export class GamingAccountsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getGamingAccounts() {
    return this.get(`/admin/users`);
  }

  getGamingAccount(id) {
    return this.get(`/admin/users/${id}`);
  }

  getGamingAccountGamesHistory(id) {
    return this.get(`/chairs/${id}/history`);
  }
}
