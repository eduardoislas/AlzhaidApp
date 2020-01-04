import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PacientListModalPage } from './modals/pacient-list-modal/pacient-list-modal.page';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginService } from "./services/login.service";
import { RolesService } from "./services/roles.service";
import { FilterPipe } from './pipes/filter.pipe';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [AppComponent, FilterPipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    RolesService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
