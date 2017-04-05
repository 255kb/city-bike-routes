import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRoute } from '../interfaces/IRoute';
import { Observable } from 'rxjs/Rx';
import { BikeProvider } from './bike';

@Injectable()
export class RouteProvider {
  private routesStorageKeyName: string = 'routes';
  private routes: Array<IRoute>;
  private timer: Observable<number>;

  constructor(private storage: Storage, private bikeProvider: BikeProvider) {
    //set timer to fetch stations infos every 60 seconds
    this.timer = Observable.timer(60 * 1000, 60 * 1000);
    this.timer.subscribe(() => {
      this.refreshRoutes();
    });
  }

  /**
   * Get saved routes from storage
   */
  public getRoutes(): Promise<Array<IRoute>> {
    if (!this.routes) {
      return new Promise((resolve, reject) => {
        this.storage.get(this.routesStorageKeyName).then((routesString: string) => {
          if (!routesString) {
            this.routes = [];
          } else {
            this.routes = JSON.parse(routesString);
          }
          resolve(this.routes);
        }).catch((error) => {
          reject(error);
        });
      });
    } else {
      return Promise.resolve(this.routes);
    }
  }

  /**
   * Add route to saved routes
   *
   * @param route - route object to add
   */
  public addRoute(route: IRoute): void {
    this.routes.unshift(route);
    this.refreshRoutes();
  }

  /**
   * Remove route from storage
   *
   * @param routeIndex - route index to remove
   */
  public removeRoute(routeIndex: number): void {
    //remove from routes array
    if (routeIndex > -1 && routeIndex < this.routes.length) {
      this.routes.splice(routeIndex, 1);

      this.storage.set(this.routesStorageKeyName, JSON.stringify(this.routes)).then((routesString: string) => {
      }).catch((error) => {
        console.log('error while removing route');
      });
    } else {
      throw new Error('route index out of bounds');
    }
  }

  /**
   * Refresh routes data by calling the provider API
   */
  public refreshRoutes() {

    this.routes.forEach((route, index) => {
      let startStationObserver = this.bikeProvider.getStations(route.contract, route.startStation.number).do((startStationData) => {
        route.startStation.data = this.setStationColor(startStationData, 'start');
      });
      let endStationObserver = this.bikeProvider.getStations(route.contract, route.endStation.number).do((endStationData) => {
        route.endStation.data = this.setStationColor(endStationData, 'end');
      });

      startStationObserver.concat(endStationObserver).subscribe(() => { }, (error) => {
        console.log(error);
      }, () => {
        //set route color
        route.color = this.setCardIndicator(route);

        //save to local storage when everything completes
        this.storage.set(this.routesStorageKeyName, JSON.stringify(this.routes)).then((routesString: string) => {
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }

  /**
   * Set station color from a station's data
   *
   * @param stationData - data of a stationData
   * @param type - type of the station (start | end)
   */
  private setStationColor(stationData: any, type: 'start' | 'end'): any {
    let stationProperty = 'available_bikes';
    if (type === 'end') {
      stationProperty = 'available_bike_stands';
    }
    if (stationData[stationProperty] == 0) {
      stationData.color = 'red';
    } else if (stationData[stationProperty] > 0 && stationData[stationProperty] <= 2) {
      stationData.color = 'orange';
    } else if (stationData[stationProperty] > 2) {
      stationData.color = 'green';
    }

    return stationData;
  }

  /**
   * Set card color from route data
   *
   * @param routeData - complete data from a route
   */
  private setCardIndicator(routeData: any) {
    let startColor = routeData.startStation.data.color;
    let endColor = routeData.endStation.data.color;
    let cardColor = 'green';

    if (startColor === 'orange' || endColor === 'orange') {
      cardColor = 'orange';
    }

    if (startColor === 'red' || endColor === 'red') {
      cardColor = 'red';
    }

    return cardColor;
  }

  /**
   * Reorder a route up or down
   *
   * @param routeIndex - index from route to move
   * @param direction - move direction up or down
   */
  public reorder(routeIndex: number, direction: 'up' | 'down') {
    if (routeIndex > -1 && routeIndex < this.routes.length) {
      if ((routeIndex === 0 && direction === 'up') || (routeIndex === (this.routes.length - 1) && direction === 'down')) {
        return;
      } else {
        let routeToMove = this.routes[routeIndex];

        if (direction === 'up') {
          this.routes[routeIndex] = this.routes[routeIndex - 1];
          //set destination
          this.routes[routeIndex - 1] = routeToMove;
        } else if (direction === 'down') {
          this.routes[routeIndex] = this.routes[routeIndex + 1];
          //set destination
          this.routes[routeIndex + 1] = routeToMove;
        }

        this.storage.set(this.routesStorageKeyName, JSON.stringify(this.routes)).then((routesString: string) => {
        }).catch((error) => {
          console.log('error while removing route');
        });
      }
    }
  }
}
