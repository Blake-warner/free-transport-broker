import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../shared/constants';
import { User } from './user/user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

interface authUserPayload {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private router: Router,
    private locaStorageService: LocalStorageService,
  ) { 
    this.http = new HttpClient(this.handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessTokenExpTimer: any;

  signup(data: User) {
    console.log(data);
    console.log(CONSTANTS.SIGNUP_ENDPOINT);
    return this.http.post<User>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  signin(data: {email: string, password: string}) {
    return this.http.post<authUserPayload>(CONSTANTS.SIGNIN_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
    console.log(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
    return this.http.get(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
  }

  setLogoutTimer(expDuration: number) {
    this.accessTokenExpTimer = setTimeout(() => {
      //
    }, expDuration);
  }

  clearLogoutTimer() {
    if (this.accessTokenExpTimer) {
      clearTimeout(this.accessTokenExpTimer);
      this.accessTokenExpTimer = null;
    }
  }

  handleAuthentication(payload: authUserPayload) {
    console.log(payload);
    const authTokens = {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
    const date = new Date(Date.now());
    this.locaStorageService.setItem('user', JSON.stringify(payload.user));
    this.locaStorageService.setItem('authTokens', JSON.stringify(authTokens));
    this.locaStorageService.setItem('date', JSON.stringify(date));
    this.router.navigate(['/dashboard']);
  }

  handleError<T extends {error: { error: unknown }}>(error: T) {
    console.log(error)
    let errorMessage = 'An Unkown Error Occured!';
    if (!error || !error.error.error) {
      return { error: { error: errorMessage } };
    }
    switch(error.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid';
        break;
    }
    return { error: { error: errorMessage } };
  }
}