import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { HomePage } from '../pages/home/home';
import { BikeProvider } from '../providers/bike';
import { RouteProvider } from '../providers/route';
import { UserRouteComponent } from '../component/userRoute';
import { StationName } from '../pipes/stationName';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    HomePage,

    //components
    UserRouteComponent,

    //pipes
    StationName
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    HomePage
  ],
  providers: [
    BikeProvider,
    RouteProvider,
    Storage
  ]
})
export class AppModule {}
