import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from './constants';
import { Observable } from 'rxjs';
import { Material } from './materials.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private http: HttpClient
  ) { }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(CONSTANTS.FETCH_MATERIALS)
  }
}
