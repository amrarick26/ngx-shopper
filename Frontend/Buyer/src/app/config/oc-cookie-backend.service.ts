import { Inject, Injectable } from '@angular/core';

import {
  CookieService,
  CookieOptionsProvider,
  CookieOptions,
} from '@gorniv/ngx-universal';
import { REQUEST } from '@nguniversal/aspnetcore-engine/tokens';

@Injectable()
export class OcCookieBackendService extends CookieService {
  constructor(
    @Inject(REQUEST) private request: any,
    _optionsProvider: CookieOptionsProvider
  ) {
    super(_optionsProvider);
  }

  protected get cookieString(): string {
    return this.request.headers.cookie[0];
  }

  protected set cookieString(val: string) {
    this.request.cookie[0] = val;
  }

  put(key: string, value: string, options: CookieOptions = {}): void {
    let findKey = false;
    let newCookie = Object.keys(this.getAll())
      // tslint:disable-next-line: no-shadowed-variable
      .map((keyItem) => {
        if (keyItem === key) {
          findKey = true;
          return `${key}=${value}`;
        }
        return `${keyItem}=${this.get(keyItem)}`;
      })
      .join('; ');
    if (!findKey) {
      newCookie += `; ${key}=${value}`;
    }
    this.request.headers.cookie[0] = newCookie;
    // not sure
    this.cookieString = newCookie;
  }

  remove(key: string, options?: CookieOptions): void {
    const newCookie = Object.keys(this.getAll())
      // tslint:disable-next-line: no-shadowed-variable
      .map((keyItem) => {
        if (keyItem === key) {
          return '';
        }
        return `${keyItem}=${this.get(keyItem)}`;
      })
      .join('; ');
    this.request.headers.cookie[0] = newCookie;
    // not sure
    this.cookieString = newCookie;
  }
}
