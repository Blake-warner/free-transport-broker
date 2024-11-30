import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService {
    private router = inject(Router);
    profile = signal<any>(null);
    private authConfig!: AuthConfig;
    constructor(
        private oAuthService: OAuthService,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
      this.initConfiguration();
    }

    initConfiguration() {
        if(isPlatformBrowser(this.platformId)) {
            this.authConfig = {

                issuer: 'https://accounts.google.com',
              
                redirectUri: "http://localhost:4200/join-network",
              
                clientId: '205076023932-u2d2emt78ae0n656ot931ik11v51u336.apps.googleusercontent.com',
              
                scope: 'openid profile email',
              
                strictDiscoveryDocumentValidation: false,
                requireHttps: false,
              };
              console.log(this.authConfig);
              this.oAuthService.configure(this.authConfig);
        }
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.oAuthService.hasValidIdToken()) {
                this.profile.set(this.oAuthService.getIdentityClaims());
            }
        });
    }
    login() {
        this.oAuthService.initImplicitFlow();
    }
    
    logout() {
        this.oAuthService.revokeTokenAndLogout();
        this.oAuthService.logOut();
        this.profile.set(null);
    }
    
    getProfile() {
        return this.profile();
    } 
}
  
  