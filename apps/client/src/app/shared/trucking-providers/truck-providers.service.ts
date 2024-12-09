import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from './truck-provider.constants';
import { TruckProvider } from './models/truck-provider.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TruckProvidersService {

  constructor(private httpClient: HttpClient) { }
  saveProvider(provider: TruckProvider): Observable<any> {
    return this.httpClient.post(CONSTANTS.SAVE_TRUCK_PROVIDER, provider);
  }

}
