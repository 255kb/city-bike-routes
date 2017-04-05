import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {
  /**
   * Compare two objects (desc order)
   *
   * @param object1
   * @param object2
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
