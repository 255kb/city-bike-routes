import { Component, Input, DoCheck, KeyValueDiffers } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { RouteProvider } from '../providers/route';

@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html'
})
export class UserRouteComponent implements DoCheck {
  @Input() route: IRoute;
  @Input() routeIndex: number;

  public awaitingDeletion: boolean = false;
  public cardBorderColor: string;
  private routeDiffer: any;

  constructor(private routeProvider: RouteProvider, private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.routeDiffer = this.differs.find(this.route).create(null);
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
    let routeChanges = this.routeDiffer.diff(this.route);

    let changeCallback = (changes) => {
      if (changes.key === 'color') {
        this.cardBorderColor = changes.currentValue;        
      }
    };

    if (routeChanges) {
      routeChanges.forEachChangedItem(changeCallback);
      routeChanges.forEachAddedItem(changeCallback);
    }
  }
}
