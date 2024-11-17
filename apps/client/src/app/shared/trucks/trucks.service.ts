import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../trucking-providers/truck-provider.constants';
import { Truck } from './truck.inteface';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {

  constructor(private readonly http: HttpClient) { }

  getTrucks() {
    return this.http.get<Truck[]>(CONSTANTS.FETCH_TRUCKS);
  }

}
