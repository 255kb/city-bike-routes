import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from '../providers/bike';
import { RouteProvider } from '../providers/route';

@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html'
})
export class UserRouteComponent {
  //TODO add spacing between counter and station name
  @Input() route: IRoute;
  @Input() routeIndex: number;

  private stationsTimer: Observable<number>;
  public startStation: any = null;
  public endStation: any = null;
  public awaitingDeletion: boolean = false;

  constructor(private bikeProvider: BikeProvider, private routeProvider: RouteProvider) {
    //set timer to fetch stations infos every 30 seconds
    this.stationsTimer = Observable.timer(1000, 30 * 1000);

    //get stations info
    this.stationsTimer.subscribe(() => {
      this.bikeProvider.getStations(this.route.contract, this.route.startStationNumber)
        .subscribe((startStation) => {
          this.startStation = startStation;
          this.setColor(startStation);
        },
        err => {
          console.log(err);
        });
      this.bikeProvider.getStations(this.route.contract, this.route.endStationNumber)
        .subscribe((endStation) => {
          this.endStation = endStation;
          this.setColor(endStation);
        },
        err => {
          console.log(err);
        });
    });
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

  private setColor(station: any) {
    if (station.available_bikes == 0) {
      station.color = 'red';
    } else if (station.available_bikes > 0 && station.available_bikes < 2) {
      station.color = 'orange';
    } else if (station.available_bikes > 2) {
      station.color = 'green';
    }
  }
}
