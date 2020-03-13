import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl = environment.backend;

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
    return this.http.get(this.getUrl(url), {headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .pipe(map((response: Response) => response));
  }

  public postWithHeadersAndParams(url: string = '', data: any = {}, headers: any = {}, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, {headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public postImage(url: string = '', data: any = {}, headers: any = {}, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, {headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public postWithParams(url: string = '', data: any = {}, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data, {params: options})
      .pipe(map((response: Response) => response));
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .pipe(map((response: Response) => response));
  }

  public putWithHeadersAndParams(url: string = '', data: any = {}, headers: any = {}, options: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data, {headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public delete(url: string = ''): Observable<any> {
    return this.http.delete(this.getUrl(url))
      .pipe(map((response: Response) => response));
  }

  public deleteWithHeadersAndParams(url: string = '', headers: any = {}, options: any = {}): Observable<any> {
    return this.http.delete(this.getUrl(url), {headers: headers, params: options})
      .pipe(map((response: Response) => response));
  }

  public getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
}
