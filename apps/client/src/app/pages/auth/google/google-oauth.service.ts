import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../../../shared/constants';
import { GoogleOauthInterface } from './google-oauth.interface';
import { Observable } from 'rxjs';
import { AuthUserPayload } from '../user/interfaces/auth-user-payload.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GoogleOauthService {
    constructor(private http: HttpClient){}

    Signin(idToken: string, fullName: string): Observable<AuthUserPayload> {
        const payload: GoogleOauthInterface = {
            token: idToken,
            fullName
        };
        return this.http.post<AuthUserPayload>(CONSTANTS.GOOGLE_AUTH_ENDPOINT, payload)
    }
}