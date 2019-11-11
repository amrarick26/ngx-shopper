import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieOptionsProvider } from '@gorniv/ngx-universal';
import { OcCookieBackendService } from './config/oc-cookie-backend.service';
import { REQUEST } from '@nguniversal/aspnetcore-engine/tokens';
import { HasTokenGuard, AppStateService } from './shared';
import { HasTokenServerGuard } from './shared/guards/has-token/has-token-server.guard';
import { OcTokenService } from '@ordercloud/angular-sdk';
import { Router } from '@angular/router';
import { AppAuthService } from './auth';
import { applicationConfiguration } from './config/app.config';

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CookieService,
      useClass: OcCookieBackendService,
      deps: [REQUEST, CookieOptionsProvider],
    },
    {
      provide: HasTokenGuard,
      useClass: HasTokenServerGuard,
      deps: [
        OcTokenService,
        Router,
        AppAuthService,
        AppStateService,
        REQUEST,
        applicationConfiguration,
      ],
    },
  ],
})
export class AppServerModule { }
