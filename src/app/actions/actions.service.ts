import { Injectable } from '@angular/core';
import {BaseApi} from '../base-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionsService extends BaseApi {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
  }

  getActions() {
    let headers = new HttpHeaders();
    headers = headers.append('x-api-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiIiLCJjb3VudHJ5IjpudWxsLCJyb2xlIjoiYWRtaW4iLCJyYXRlIjowLCJzb2NpYWxMaW5rIjoiIiwiaXNfYWN0aXZlIjpmYWxzZSwiZXhwUG9pbnRzIjowLCJnb2xkIjowLCJzaWx2ZXIiOjYwMDAsImZjbSI6bnVsbCwicGxheWVkR2FtZXNDb3VudCI6MCwiZ2FtZXNXb24iOjAsImdhbWVzTG9zdCI6MCwiZGlzY29ubmVjdEdhbWVzIjowLCJkZXZpY2UiOm51bGwsImxhbmciOm51bGwsIl9pZCI6IjVkNGE2NDM2NmIwMmNkMWU0ZWY2M2IxZCIsImJhbGFuY2UiOm51bGwsImVtYWlsIjoic2guc2FpbGF1YmFpQGdtYWlsLmNvbSIsIm5hbWUiOiJTYWlsYXViYXkiLCJfX3YiOjIsImxhc3RWaXNpdCI6IjIwMTktMDgtMDdUMTg6MjY6MTMuMjA2WiIsImJvb3N0ZXJzIjpbeyJjb3VudCI6MSwiX2lkIjoiNWQ1MDA3NDI5MjBiZjMyYTFlNDBhYjE1IiwiYm9vc3RlciI6IjVkNTAwNDZhZjU4YmJlMjdlMDBkODdjOSJ9XSwiaWRlbnQiOiJAMSIsImlhdCI6MTU2NzA3ODU3OCwiZXhwIjoxNjkzMzA4OTc4fQ.zJJ4SOJ1Zn73yd-iLkj5cwI5rb5jKXVw2A2Y-2KcZ6I');

    return this.getWithHeadersAndParams('/actions/actives', headers);
  }

}