import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinancialHistoryService extends ApiService {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getData() {
    return this.get(`/admin/financial/operations`);
  }
}
