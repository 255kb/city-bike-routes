import { Injectable } from '@angular/core';
import { UtilsProvider } from '../providers/utils';

@Injectable()
export class StationsFormatterProvider {
  private stationList: Array<any>;

  constructor(private utils: UtilsProvider) {
  }


  /**
   * Return stations list
   *
   * @private
   * @returns
   *
   * @memberOf StationsFormatterProvider
   */
  private getList() {
    return this.stationList;
  }

  /**
   *  Init stations array formatting
   *
   * @param {Array<any>} stationList
   * @param {boolean} formatNames
   * @param {boolean} sort
   * @param {boolean} showStationNumber
   * @returns {Array<any>}
   *
   * @memberOf StationsFormatterProvider
   */
  public format(stationList: Array<any>, formatNames: boolean, sort: boolean, showStationNumber: boolean): Array<any> {
    this.stationList = stationList;
    return this.formatNames(showStationNumber).sort().getList();
  }

  /**
   * Format stations names
   *
   * @private
   * @param {boolean} showStationNumber
   * @returns {this}
   *
   * @memberOf StationsFormatterProvider
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
   *
   * @private
   * @returns {this}
   *
   * @memberOf StationsFormatterProvider
   */
  private sort(): this {
    this.stationList = this.stationList.sort(this.utils.compareDesc);

    return this;
  }
}
