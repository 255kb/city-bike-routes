import { Injectable } from '@angular/core';
import { UtilsProvider } from '../providers/utils';

@Injectable()
export class StationsFormatterProvider {
  private stationList: Array<any>;

  constructor(private utils: UtilsProvider) {
  }

  /**
   * Return stations list
   */
  private getList() {
    return this.stationList;
  }

  /**
   * Init stations array formatting
   *
   * @param stationList - list of stations
   * @param formatNames - do we need name formatting
   * @param sort - do we need sorting
   * @param showStationNumber - do we want to display station numbers
   */
  public format(stationList: Array<any>, formatNames: boolean, sort: boolean, showStationNumber: boolean): Array<any> {
    this.stationList = stationList;
    return this.formatNames(showStationNumber).sort().getList();
  }

  /**
   * Format stations names
   *
   * @param showStationNumber - do we want to display station numbers
   */
  private formatNames(showStationNumber: boolean): this {
    this.stationList = this.stationList.map((station) => {
      let nameWithoutNumber = station.name.replace(/[a-z0-9]+ *- */gi, '');
      if (showStationNumber) {
        station.name = `${nameWithoutNumber} (no. ${station.number})`;
      } else {
        station.name = nameWithoutNumber;
      }

      return station;
    });

    return this;
  }


  /**
   * Sort stations by name
   */
  private sort(): this {
    this.stationList = this.stationList.sort(this.utils.compareDesc);

    return this;
  }
}
