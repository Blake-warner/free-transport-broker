import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../../shared/constants';
import { User } from './user/user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { TempUserData } from './user/interfaces/tempUserData.interface';
import moment from "moment";
import * as jwt_decode from 'jwt-decode';
import { AuthUserPayload } from './user/interfaces/auth-user-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { 
    this.http = new HttpClient(this.handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessTokenExpTimer: any;

  signup(data: TempUserData) {
    return this.http.post<User>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  signin(data: {email: string, password: string}) {
    return this.http.post<AuthUserPayload>(CONSTANTS.SIGNIN_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    console.log(payload);
    console.log(CONSTANTS.VERIFY_EMAIL_ENDPOINT);
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
    console.log(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
    return this.http.get(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
  }

  logout() {
    this.localStorageService.removeItem('authTokens');
    this.localStorageService.removeItem('expires_at');
    this.localStorageService.removeItem('user');
  }

  refreshToken() {
    const tokens = this.localStorageService.getItem('authTokens') as string;
    const refreshToken = JSON.parse(tokens).refreshToken;
    return this.http.post<AuthUserPayload>(CONSTANTS.REFRESH_TOKENS_ENDPOINT, refreshToken);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const exp = this.localStorageService.getItem('expires_at') as string;
    const expiresAt = JSON.parse(exp);
    return moment(expiresAt);
  }

  getAccessToken() {
    let accessToken = this.localStorageService.getItem('authTokens') as string;
    accessToken = JSON.parse(accessToken).accessToken;
    return accessToken;
  }

  decodeToken(jwtToken: string) {
    try {
      return jwt_decode.jwtDecode(jwtToken);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  handleAuthentication(payload: AuthUserPayload) {
    const authTokens = {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
    const expiresAt = moment().add(payload.expiresIn,'second');
    this.localStorageService.setItem('user', JSON.stringify(payload.user));
    this.localStorageService.setItem('authTokens', JSON.stringify(authTokens));
    this.localStorageService.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.router.navigate(['/join-network']);
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