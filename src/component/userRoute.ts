import { Component, Input, DoCheck, KeyValueDiffers } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { RouteProvider } from '../providers/route';

//correct orange color not showing
@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html'
})
export class UserRouteComponent implements DoCheck {
  @Input() route: IRoute;
  @Input() routeIndex: number;

  public awaitingDeletion: boolean = false;
  public cardBorder: Array<string>;
  private startStationDiffer: any;
  private endStationDiffer: any;

  constructor(private routeProvider: RouteProvider, private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.startStationDiffer = this.differs.find(this.route.startStation).create(null);
    this.endStationDiffer = this.differs.find(this.route.endStation).create(null);
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

  ngDoCheck() {
    let startStationChanges = this.startStationDiffer.diff(this.route.startStation.data);
    let endStationChanges = this.endStationDiffer.diff(this.route.endStation.data);
    let leastColor = 'green';
    let hasChanged = false;

    let changeCallback = (changes) => {
      if (changes.key === 'color' && changes.currentValue) {
        if (changes.currentValue === 'orange') {
          leastColor = changes.currentValue;
        }
        if (changes.currentValue === 'red') {
          leastColor = changes.currentValue;
        }
        hasChanged = true;
      }
    };

    if (startStationChanges) {
      startStationChanges.forEachChangedItem(changeCallback);
      startStationChanges.forEachAddedItem(changeCallback);
    }
    if (endStationChanges) {
      endStationChanges.forEachChangedItem(changeCallback);
      endStationChanges.forEachAddedItem(changeCallback);
    }

    if (hasChanged) {
      this.cardBorder = ['border-' + leastColor];
    }
  }
}
