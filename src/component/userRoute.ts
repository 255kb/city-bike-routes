import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from '../providers/bike';

@Component({
  selector: 'user-route',
  template: `
  <ion-card>
    <ion-card-content>
      {{route.contract}}
      <div *ngIf="startStation">
        {{startStation | stationName: true}}
        <span [ngClass]="{red: startStation.available_bikes==0, orange: startStation.available_bikes>0, green: startStation.available_bikes>2}">{{startStation.available_bikes}}</span>
      </div>
      <div *ngIf="endStation">
        {{endStation | stationName: true}}
        <span [ngClass]="{red: endStation.available_bike_stands==0, orange: endStation.available_bike_stands>0, green: endStation.available_bike_stands>2}">{{endStation.available_bike_stands}}</span>
      </div>
    </ion-card-content>
  </ion-card>`,
  styles: [`
    .red {color:red;}
    .orange {color:orange;}
    .green {color:green;}
  `]
})
export class UserRouteComponent {
  //TODO show loading indicator
  //TODO improve style
  @Input()
  route: IRoute;

  private stationsTimer: Observable<number>;
  public startStation: any = null;
  public endStation: any = null;

  constructor(private bikeProvider: BikeProvider) {
    //set timer to fetch stations infos every minute (TODO put at 60 sec)
    this.stationsTimer = Observable.timer(1000, 10 * 1000);

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
}
