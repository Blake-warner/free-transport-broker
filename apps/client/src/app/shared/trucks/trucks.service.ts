import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../trucking-providers/truck-provider.constants';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {

  constructor(private readonly http: HttpClient) { }

  getTrucks() {
    return this.http.get(CONSTANTS.FETCH_TRUCK_PROVIDERS);
  }

}
