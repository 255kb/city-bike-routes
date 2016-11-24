import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stationStatus',
  pure: false // needed to react to array changes
})
@Injectable()
export class StationStatus implements PipeTransform {
  public transform(stations: Array<any>, status: string): any {
    if (stations) {
      return stations.filter(station => station.status === status);
    }
  }
}
