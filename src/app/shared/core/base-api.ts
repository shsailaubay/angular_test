import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { PARAM_HOST_NAME } from './app-settings';

@Injectable()

export class BaseApi {
  protected baseUrl = PARAM_HOST_NAME + '/api';

  constructor(public http: HttpClient) {
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .pipe(map((response: Response) => response));
  }

  public getWithParams(url: string = '', options: any = {}): Observable<any> {
    return this.http.get(this.getUrl(url), {params: options})
      .pipe(map((response: Response) => response));
  }
  public getWithHeadersAndParams(url: string = '', headers: any = {}, options: any = {}): Observable<any> {
    return this.http.get(this.getUrl(url), { headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .pipe(map((response: Response) => response));
  }

  public postWithHeadersAndParams(url: string = '', data: any = {}, headers: any = {}, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, { headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public postWithParams(url: string = '', data: any = {}, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, { params: options})
      .pipe(map((response: Response) => response));
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .pipe(map((response: Response) => response));
  }

  public getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
