import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from '../providers/bike';
import { RouteProvider } from '../providers/route';

@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html',
  styles: [
    '.spacing-right50 {display:inline-block;min-width:50px;}',
    '.spacing-right20 {display:inline-block;min-width:20px;}'
  ]
})
export class UserRouteComponent {
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
          this.setColor(startStation, 'start');
        },
        err => {
          console.log(err);
        });
      this.bikeProvider.getStations(this.route.contract, this.route.endStationNumber)
        .subscribe((endStation) => {
          this.endStation = endStation;
          this.setColor(endStation, 'end');
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

  private setColor(station: any, type: string) {
    let stationProperty = 'available_bikes';
    if (type === 'end') {
      stationProperty = 'available_bike_stands';
    }

    if (station[stationProperty] == 0) {
      station.color = 'red';
    } else if (station[stationProperty] > 0 && station[stationProperty] < 2) {
      station.color = 'orange';
    } else if (station[stationProperty] > 2) {
      station.color = 'green';
    }
  }
}
