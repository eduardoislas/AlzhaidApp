import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginService } from "./services/login.service";
import { FilterPipe } from './pipes/filter.pipe';
import { ComponentsModule } from './components/components.module';

import { IonicStorageModule } from "@ionic/storage";
import { NotificationsAddPageModule } from './components/notifications-add/notifications-add.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/services/token-interceptor';
import { IncidenceAddPageModule } from './components/incidence-add/incidence-add.module';


@NgModule({
  declarations: [AppComponent, FilterPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    NotificationsAddPageModule,
    IncidenceAddPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
