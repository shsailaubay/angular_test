import {Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export class SessionService {
  isBrowser: boolean;

  constructor( @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: any) {
    if (this.isBrowser) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (this.isBrowser) {
      if (window.sessionStorage.getItem(key) === 'undefined') {
        return undefined;
      }
      return JSON.parse(window.sessionStorage.getItem(key));
    }
    return undefined;
  }

}
