import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationName',
  //pure: false // needed to react to array changes
})
@Injectable()
export class StationName implements PipeTransform {
  public transform(station: any, showNumber: boolean): string {
    let nameWithoutNumber = station.name.replace(/[0-9]+ *- */, '');
    if (showNumber) {
      return `${nameWithoutNumber} (no. ${station.number})`;
    } else {
      return nameWithoutNumber;
    }
  }
}
