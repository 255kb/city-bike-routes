import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { HomePage } from '../pages/home/home';
import { BikeProvider } from '../providers/bike';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    HomePage
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
    BikeProvider
  ]
})
export class AppModule {}
