import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from './constants';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private http: HttpClient
  ) { }

  getMaterials() {
    return this.http.get(CONSTANTS.FETCH_MATERIALS)
  }
}
