import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../base-api';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getCountries() {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJiYWxhbmNlIjowLCJyYXRlIjowLCJfaWQiOiI1ZDQ4NmY3M2I5YmJmMDY3MDgzYjM2NjgiLCJlbWFpbCI6InNoLnNhaWxhdWJhaUBnbWFpbC5jb20iLCJuYW1lIjoic2FpbGF1YmFpIiwiX192IjowLCJpYXQiOjE1NjUxNTI1NjYsImV4cCI6MTY5MTM4Mjk2Nn0.IrXUBYc-T4tCze3MaEALTvhj1nCN6gHp-ac-CB0BgVA');
    return this.getWithHeadersAndParams(`/countries/`, headers);
  }

  postCountry(data) {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJiYWxhbmNlIjowLCJyYXRlIjowLCJfaWQiOiI1ZDQ4NmY3M2I5YmJmMDY3MDgzYjM2NjgiLCJlbWFpbCI6InNoLnNhaWxhdWJhaUBnbWFpbC5jb20iLCJuYW1lIjoic2FpbGF1YmFpIiwiX192IjowLCJpYXQiOjE1NjUxNTI1NjYsImV4cCI6MTY5MTM4Mjk2Nn0.IrXUBYc-T4tCze3MaEALTvhj1nCN6gHp-ac-CB0BgVA');
    return this.postWithHeadersAndParams(`/countries/`, data, headers);
  }

  deleteCountry(id) {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJiYWxhbmNlIjowLCJyYXRlIjowLCJfaWQiOiI1ZDQ4NmY3M2I5YmJmMDY3MDgzYjM2NjgiLCJlbWFpbCI6InNoLnNhaWxhdWJhaUBnbWFpbC5jb20iLCJuYW1lIjoic2FpbGF1YmFpIiwiX192IjowLCJpYXQiOjE1NjUxNTI1NjYsImV4cCI6MTY5MTM4Mjk2Nn0.IrXUBYc-T4tCze3MaEALTvhj1nCN6gHp-ac-CB0BgVA');
    return this.deleteWithHeadersAndParams(`/countries/${id}`, headers);
  }

}
