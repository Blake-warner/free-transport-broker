import { Route } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuard } from './pages/auth/auth.guard';

export const appRoutes: Route[] = [
    { path: '',
        loadChildren: () =>
        import('./home/home.routes')
        .then(m => m.HOME_ROUTES),
        canActivate: [AuthGuard]
    },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
];
