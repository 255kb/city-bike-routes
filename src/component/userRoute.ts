import { Component, Input, OnChanges } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { RouteProvider } from '../providers/route';

//correct orange color not showing
@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html'
})
export class UserRouteComponent implements OnChanges {
  @Input() route: IRoute;
  @Input() routeIndex: number;

  public awaitingDeletion: boolean = false;
  public cardBorder: Array<string>;

  constructor(private routeProvider: RouteProvider) {
  }

  public removeRoute() {
    if (this.awaitingDeletion) {
      this.routeProvider.removeRoute(this.routeIndex);
    } else {
      this.awaitingDeletion = true;
      setTimeout(() => {
        this.awaitingDeletion = false;
      }, 3000);
    }
  }

  ngOnChanges(changes) {
    if (changes.route && changes.route.currentValue) {
      let routeNewValue = changes.route.currentValue;

      if (routeNewValue.startStation.data && routeNewValue.endStation.data) {
        if (routeNewValue.startStation.data.color === 'green' && routeNewValue.endStation.data.color === 'green') {
          this.cardBorder = ['border-green'];
        } else if (routeNewValue.startStation.data.color === 'orange' || routeNewValue.endStation.data.color === 'orange') {
          this.cardBorder = ['border-orange'];
        } else if (routeNewValue.startStation.data.color === 'red' || routeNewValue.endStation.data.color === 'red') {
          this.cardBorder = ['border-red'];
        }
      }
    }
  }
}
