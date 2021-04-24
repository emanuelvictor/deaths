import {SharedModule} from '../../shared/shared.module';
import {Interceptor} from '../application/interceptor/interceptor';
import {DeathRepository} from "./repository/death.repository";
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from "@angular/core";

import {CommonModule, registerLocaleData} from "@angular/common";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatPaginatorIntl,
  MatTreeModule
} from "@angular/material";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import localePt from '@angular/common/locales/pt';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CovalentSearchModule} from "@covalent/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {PieChartModule} from "@swimlane/ngx-charts";
import {FlexLayoutModule} from "@angular/flex-layout";
import { VisualizarObituarioComponent } from 'sistema/application/presentation/authenticated/obituario/obituario/visualizar-obituario/visualizar-obituario.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

registerLocaleData(localePt, 'pt-BR');

// Custom TranslateLoader while using AoT compilation
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 *
 */
// @ts-ignore
@NgModule({
  declarations: [
    // COMPONENTS
    VisualizarObituarioComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CovalentSearchModule,
    MatTreeModule,
    HttpClientJsonpModule,

    SharedModule,

    // Translate i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (customTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PieChartModule,
    FlexLayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  entryComponents: [
  ],
  providers: [

    DeathRepository,

    {
      useValue: appearance,
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS
    },

    {
      multi: true,
      useClass: Interceptor,
      provide: HTTP_INTERCEPTORS
    },

    // Internacionalizacao MatPaginator
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [VisualizarObituarioComponent]
})
export class SistemaModule {
}
