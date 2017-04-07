import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { HomePage } from '../pages/home/home';
import { BikeProvider } from '../providers/bike';
import { RouteProvider } from '../providers/route';
import { UserRouteComponent } from '../component/userRoute';
import { StationName } from '../pipes/stationName';
import { StationStatus } from '../pipes/stationStatus';
import { TimeAgo } from '../pipes/timeAgo';
import { UtilsProvider } from '../providers/utils';
import { StationsFormatterProvider } from '../providers/stationsFormatter';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    HomePage,

    //components
    UserRouteComponent,

    //pipes
    StationName,
    StationStatus,
    TimeAgo
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: '__cbr' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BikeProvider,
    RouteProvider,
    UtilsProvider,
    StationsFormatterProvider
  ]
})
export class AppModule { }
