import { Route } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

export const appRoutes: Route[] = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
];
