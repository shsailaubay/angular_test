import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class GamingAccountsService extends ApiService {

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
