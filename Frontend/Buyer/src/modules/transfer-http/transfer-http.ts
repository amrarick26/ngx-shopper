import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable, Subject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TransferState } from '../transfer-state/transfer-state';
import { isPlatformServer } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class TransferHttp {

  private isServer = isPlatformServer(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private http: Http,
    protected transferState: TransferState
  ) { }

  request(uri: string | Request, options?: RequestOptionsArgs): Observable<any> {
    return this.getData(uri, options, (url: string, _options: RequestOptionsArgs) => {
      return this.http.request(url, _options);
    });
  }
  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.getData(url, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.get(_url, _options);
    });
  }
  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.getPostData(url, body, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.post(_url, body, _options);
    });
  }
  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

    return this.getPostData(url, body, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.put(_url, body, _options);
    });
  }
  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.getData(url, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.delete(_url, _options);
    });
  }
  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.getPostData(url, body, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.patch(_url, body.options);
    });
  }
  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.getData(url, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.head(_url, _options);
    });
  }
  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.getData(url, options, (_url: string, _options: RequestOptionsArgs) => {
      return this.http.options(_url, _options);
    });
  }

  private getData(uri: string | Request, options: RequestOptionsArgs,
    callback: (uri: string | Request, options?: RequestOptionsArgs) => Observable<Response>) {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + JSON.stringify(options);

    try {
      return this.resolveData(key);

    } catch (e) {
      return callback(url, options).pipe(
        map(res => res.json()), 
        tap(data => {
          if (this.isServer) {
            this.setCache(key, data);
          }
        })
      );
    }
  }

  private getPostData(uri: string | Request, body: any, options: RequestOptionsArgs,
    callback: (uri: string | Request, body: any, options?: RequestOptionsArgs) => Observable<Response>) {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + JSON.stringify(body);

    try {

      return this.resolveData(key);

    } catch (e) {
      return callback(uri, body, options).pipe(
        map(res => res.json()), 
        tap(data => {
          if (this.isServer) {
            this.setCache(key, data);
          }
        })
      );
    }
  }

  private resolveData(key: string) {
    const data = this.getFromCache(key);

    if (!data) {
      throw new Error();
    }
    return from(Promise.resolve(data));
    // return Observable.fromPromise(Promise.resolve(data));
  }

  private setCache(key, data) {
    return this.transferState.set(key, data);
  }

  private getFromCache(key): any {
    return this.transferState.get(key);
  }
}