import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { RouteProvider } from '../../providers/route';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private routes: Array<any> = [];

  constructor(public navCtrl: NavController, private routeProvider: RouteProvider) {
  }

  public addFavoriteRoute() {
    this.navCtrl.push(AddPage);
  }

  public ionViewWillEnter() {
    this.routeProvider.getRoutes().then((storedRoutes) => {
      this.routes = storedRoutes;
    }).catch(() => {
    });
  }

}
