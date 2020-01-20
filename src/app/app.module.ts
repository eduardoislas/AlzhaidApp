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
import { FilterPipe } from './pipes/filter.pipe';
import { ComponentsModule } from './components/components.module';

<<<<<<< HEAD
import { IonicStorageModule } from '@ionic/storage';
=======
import { IonicStorageModule } from "@ionic/storage";
import { NotificationsAddPageModule } from './components/notifications-add/notifications-add.module';

>>>>>>> dc0f53f44d8bbb04e4149cc8b3cd8acc0c31f4e2

@NgModule({
  declarations: [AppComponent, FilterPipe],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    ComponentsModule,
<<<<<<< HEAD
    IonicStorageModule.forRoot(),
=======
    NotificationsAddPageModule,
    IonicStorageModule.forRoot()
>>>>>>> dc0f53f44d8bbb04e4149cc8b3cd8acc0c31f4e2
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
