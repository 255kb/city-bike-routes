import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BikeProvider {
  private apiUrl: string = 'https://api.jcdecaux.com/vls/v1/';
  private apiKeyString: string = '?apiKey=f3d7f75b3a1d22b9d015e799a95d3b086decf6fe';

  constructor(private http: Http) {
    //TODO add contracts cache
    //TODO add stations cache
  }

  /**
   * Get all contracts (cities) from API
   *
   * @returns {Observable<any[]>}
   *
   * @memberOf BikeProvider
   */
  getContracts(): Observable<any[]> {
    return this.http.get(`${this.apiUrl}contracts${this.apiKeyString}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Get all stations for a specific contract, or a specific station
   *
   * @param {string} contract - name of the contract as provided by the API
   * @param {number} [stationNumber] - number of the station you want to fetch
   * @returns {Observable<any[]>}
   *
   * @memberOf BikeProvider
   */
  getStations(contract: string, stationNumber?: number): Observable<any[]> {
    return this.http.get(`${this.apiUrl}stations${(stationNumber)?'/'+stationNumber:''}${this.apiKeyString}&contract=${contract}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
