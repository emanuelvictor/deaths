import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

import {SistemaModule} from '../domain/sistema.module';
import {environment} from '../../environments/environment';

import 'hammerjs';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SistemaModule)
    .catch(err => console.log(err));
