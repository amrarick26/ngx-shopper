import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieBackendService, CookieService, NgxRequest, NgxResponce } from '@gorniv/ngx-universal';

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
    {
      provide: NgxRequest,
      useValue: { cookie: '', headers: {} },
    },
    {
      provide: NgxResponce,
      useValue: { cookie: '', headers: {} },
    },
  ]
})
export class AppServerModule { }
