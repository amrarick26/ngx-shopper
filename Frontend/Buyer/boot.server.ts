/**
 * the webpack-transpiled javascript version of this file is used by our asp.net core server
 * to render a server side rendered index.html file
 */

import 'zone.js/dist/zone-node';
import {
  createTransferScript,
  IEngineOptions,
  ngAspnetCoreEngine,
} from '@nguniversal/aspnetcore-engine';
import { createServerRenderer } from 'aspnet-prerendering';
import {
  MODULE_MAP,
} from '@nguniversal/module-map-ngfactory-loader';

// Grab the (Node) server-specific NgModule
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from './dist/server/main';
/**
 * Access data passed down from aspnet from `params.data`
 * ie: params.data.WHATEVER_YOU_PASSED
 */
export default createServerRenderer((params) => {
  // Platform-server provider configuration
  const setupOptions: IEngineOptions = {
    appSelector: '<app-root></app-root>',
    ngModule: AppServerModuleNgFactory,
    request: params,
    providers: [
      {
        provide: MODULE_MAP,
        useValue: LAZY_MODULE_MAP,
      }
    ],
  };

  return ngAspnetCoreEngine(setupOptions).then((response) => {
    // Apply your transferData to response.globals
    response.globals.transferData = createTransferScript({
      someData:
        'Transfer this to the client on the window.TRANSFER_CACHE {} object',
      fromDotnet: params.data.thisCameFromDotNET, // example of data coming from dotnet, in HomeController
    });

    return {
      html: response.html, // our <app-root> serialized
      globals: response.globals, // all of our styles/scripts/meta-tags/link-tags for aspnet to serve up
    };
  });
});
