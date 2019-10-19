import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AddTaskComponent} from './add-task/add-task.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Platform } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FCM} from '@ionic-native/fcm/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {StoreModule} from '@ngrx/store';
import {taskReduser} from './store/reducer/task.reducer';
import {notificationReduser} from './store/reducer/notification.reducer';


@NgModule({
    declarations: [AppComponent, AddTaskComponent, ],
    entryComponents: [],
    imports: [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      BrowserAnimationsModule,
      StoreModule.forRoot(
        {taskReduser : taskReduser,
          notificationReduser : notificationReduser})
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        NativePageTransitions,
        Platform,
        FCM,
      HTTP
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private statusBar: StatusBar){
        this.statusBar.backgroundColorByHexString('#3171e0');
    }
}
