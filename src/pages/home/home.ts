import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { RouteProvider } from '../../providers/route';
import { IRoute } from '../../interfaces/IRoute';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private routes: Array<IRoute> = [];

  constructor(public navCtrl: NavController, private routeProvider: RouteProvider) {
    routeProvider.getRoutes().then((storedRoutes) => {
      this.routes = storedRoutes;
    }).catch(() => {

    });
  }

  addFavoriteRoute() {
    this.navCtrl.push(AddPage);
  }

}
