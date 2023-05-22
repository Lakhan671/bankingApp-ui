import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'cors';

import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}
document.domain = window.location.hostname;
document.domain.startsWith('www.') ? document.domain.substring(4) : document.domain;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
