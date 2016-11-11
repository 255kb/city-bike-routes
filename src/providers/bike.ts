import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BikeProvider {
  private apiUrl: string = 'https://api.jcdecaux.com/vls/v1/';
  private apiKeyString: string = '?apiKey=f3d7f75b3a1d22b9d015e799a95d3b086decf6fe';

  constructor(private http: Http) {
  }

  getContracts(): Observable<any[]> {
    return this.http.get(this.apiUrl + 'contracts' + this.apiKeyString)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
