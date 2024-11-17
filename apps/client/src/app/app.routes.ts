import { Route } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { JoinNetworkComponent } from './pages/join-network/join-network.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './pages/auth/auth.guard';

export const appRoutes: Route[] = [
    //{ path: '', redirectTo: 'signin', pathMatch: 'full' }, // temporary for initial launch of website
    //{ path: '', component: HomeComponent, canActivate: [authGuard]},
    { path: '',
        loadChildren: () =>
        import('./home/home.routes')
        .then(m => m.HOME_ROUTES),
    },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    //{ path: 'join-network', component: JoinNetworkComponent}
];
