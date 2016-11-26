import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from '../providers/bike';

@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html',
  styles: [`
    .red {color: red;}
    .orange {color: orange;}
    .green {color: green;}
    .grey {color: #ccc;}
    .bold {font-weight: bold;}
  `]
})
export class UserRouteComponent {
  //TODO show loading indicator
  //TODo display last update like time ago
  //TODO add spacing between counter and station name
  @Input()
  route: IRoute;

  private stationsTimer: Observable<number>;
  public startStation: any = null;
  public endStation: any = null;

  constructor(private bikeProvider: BikeProvider) {
    //set timer to fetch stations infos every minute
    this.stationsTimer = Observable.timer(1000, 30 * 1000);

    //get stations info
    this.stationsTimer.subscribe(() => {
      this.bikeProvider.getStations(this.route.contract, this.route.startStationNumber)
        .subscribe((startStation) => {
          this.startStation = startStation;
        },
        err => {
          console.log(err);
        });
      this.bikeProvider.getStations(this.route.contract, this.route.endStationNumber)
        .subscribe((endStation) => {
          this.endStation = endStation;
        },
        err => {
          console.log(err);
        });
    });
  }

  public removeRoute() {

  }
}
