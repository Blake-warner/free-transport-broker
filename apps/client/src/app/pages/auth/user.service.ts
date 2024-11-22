import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../shared/constants';
import { UpdateUserInterface } from './user/interfaces/update-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }

  updateUser(userId: number, updates: UpdateUserInterface) {
    const payload = { userId, updates};
    return this.http.put(CONSTANTS.UPDATE_USER_ENDPOINT, payload);
  }
}
