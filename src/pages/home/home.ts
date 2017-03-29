import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AddPage } from '../add/add';
import { RouteProvider } from '../../providers/route';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private routes: Array<any> = [];
  public reordering: boolean = false;
  private reorderingTimer: any;

  constructor(public navCtrl: NavController, private routeProvider: RouteProvider, public events: Events) {
  }

  public addFavoriteRoute() {
    this.navCtrl.push(AddPage);
  }

  public reorderRoutes() {
    if (!this.reordering) {
      this.reordering = true;

      let reorderingStoppedEventCallback = () => {
        clearTimeout(this.reorderingTimer);

        this.reorderingTimer = setTimeout(() => {
          this.reordering = false;
        }, 5000);
      };

      reorderingStoppedEventCallback();
      this.events.subscribe('reordering:stopped', reorderingStoppedEventCallback);
    }
  }

  public ionViewWillEnter() {
    this.routeProvider.getRoutes().then((storedRoutes) => {
      this.routes = storedRoutes;
    }).catch(() => {
    });
  }

}
