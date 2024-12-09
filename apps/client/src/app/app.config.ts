import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './pages/auth/auth.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider } from "@abacritt/angularx-social-login";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "205076023932-u2d2emt78ae0n656ot931ik11v51u336.apps.googleusercontent.com",
              {
                scopes: 'openid profile email'
              }
            ),
          },
        ],
        onError: (err) => {
          //debugger;
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
};
