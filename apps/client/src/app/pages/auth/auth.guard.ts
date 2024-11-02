import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  if(isLoggedIn) {
    return true;
  }
  return false
};
