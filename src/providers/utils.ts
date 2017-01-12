import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {
  constructor() {
    // constructor
  }

  /**
   * Compare two objects (desc order)
   *
   * @param {*} object1
   * @param {*} object2
   * @returns {number} - returns -1 if object1 < object2, 1 if object1 > object2, or 0 if equals
   *
   * @memberOf Utils
   */
  public compareDesc(object1: any, object2: any): number {
    if (object1.name < object2.name) {
      return -1;
    } else if (object1.name > object2.name) {
      return 1;
    } else {
      return 0;
    }
  }
}
