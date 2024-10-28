import { Route } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { JoinNetworkComponent } from './pages/join-network/join-network.component';

export const appRoutes: Route[] = [
    //{ path: '', redirectTo: 'signin', pathMatch: 'full' }, // temporary for initial launch of website
    { path: '',
        loadChildren: () =>
        import('./home/home.routes')
        .then(m => m.HOME_ROUTES)
    },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'join-network', component: JoinNetworkComponent}
];
