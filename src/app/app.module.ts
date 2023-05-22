import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HeaderInterceptor } from './common/header-interceptor';
import { AuthGuard } from './common/auth-guard.service';
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AppErrorHandler } from './common/app-error-handler.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true
    
  },{ provide: ErrorHandler, useClass: AppErrorHandler },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }