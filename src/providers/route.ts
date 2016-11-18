import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRoute } from '../interfaces/IRoute';

@Injectable()
export class RouteProvider {
  private routesStorageKeyName: string = 'routes';
  private routes: Array<IRoute> = [];

  constructor(private storage: Storage) {
  }

  getRoutes(): Promise<IRoute[]> {
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
  }

  addRoute(route: IRoute): Promise<IRoute[]> {
    this.routes.unshift(route);

    return new Promise((resolve, reject) => {
      this.storage.set(this.routesStorageKeyName, JSON.stringify(this.routes)).then((routesString: string) => {
        resolve(this.routes);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  removeRoute(routeId: number): Promise<IRoute[]> {
    //remove from routes array
    if (routeId > -1 && routeId < this.routes.length) {
      this.routes.splice(routeId, 1);

      return new Promise((resolve, reject) => {
        this.storage.set(this.routesStorageKeyName, JSON.stringify(this.routes)).then((routesString: string) => {
          resolve(this.routes);
        }).catch((error) => {
          reject(error);
        });
      });
    } else {
      throw new Error('route index out of bounds');
    }
  }
}
