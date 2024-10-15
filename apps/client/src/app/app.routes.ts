import { Route } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { JoinNetworkComponent } from './pages/join-network/join-network.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' }, // temporary for initial launch of website
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'home', component: HomeComponent },
    { path: 'join-network', component: JoinNetworkComponent}
];
