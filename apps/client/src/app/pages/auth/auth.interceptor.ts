import { inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authService = inject(AuthService);
  //const accessToken = authService.getAccessToken();

  /*if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }*/

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newAccessToken = response.accessToken;
            console.log('New Access Token being Created!!!!');
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            authService.handleAuthentication(response);
            return next(req);
          })
        );
      } else {
        console.log('Error gets thrown here for expired token!');
        throw error;
      }
    })
  );
} 