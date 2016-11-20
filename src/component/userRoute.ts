import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from '../providers/bike';

@Component({
  selector: 'user-route',
  template: `
  <ion-card>
    <ion-item *ngIf="startStation">
      <ion-icon name="arrow-forward" item-left></ion-icon>
      <h2>{{startStation | stationName: true}}</h2>
      <p>{{startStation.address}}</p>
      <p item-right large>
        <span class="bold" [ngClass]="{red: startStation.available_bikes==0, orange: startStation.available_bikes>0, green: startStation.available_bikes>2}"> {{startStation.available_bikes}} </span>
      </p>
    </ion-item>

    <ion-item *ngIf="endStation">
      <ion-icon name="arrow-forward" item-left></ion-icon>
      <h2>{{endStation | stationName: true}}</h2>
      <p>{{startStation.address}}</p>
      <p item-right large>
        <span class="bold" [ngClass]="{red: endStation.available_bike_stands==0, orange: endStation.available_bike_stands>0, green: endStation.available_bike_stands>2}"> {{endStation.available_bike_stands}} </span>
      </p>
    </ion-item>

    <ion-item>
      <span item-left small><ion-badge item-right>{{route.contract}}</ion-badge></span>
      <button ion-button color="danger" clear item-right icon-left (click)="removeRoute()">
        <ion-icon name="trash"></ion-icon>
        Delete
      </button>
    </ion-item>
  </ion-card>`,
  styles: [`
    .red {color: red;}
    .orange {color: orange;}
    .green {color: green;}
    .bold {font-weight: bold;}
  `]
})
export class UserRouteComponent {
  //TODO show loading indicator
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

  public removeRoute() {

  }
}
