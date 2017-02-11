import { Component, Input } from '@angular/core';
import { IRoute } from '../interfaces/IRoute';
import { RouteProvider } from '../providers/route';

//correct orange color not showing
@Component({
  selector: 'user-route',
  templateUrl: 'userRoute.html',
  styles: [
    '.spacing-right50 {display:inline-block;min-width:50px;}',
    '.spacing-right20 {display:inline-block;min-width:20px;}',
    '.bold {font-weight:bold;}'
  ]
})
export class UserRouteComponent {
  @Input() route: IRoute;
  @Input() routeIndex: number;

  public awaitingDeletion: boolean = false;

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
}
