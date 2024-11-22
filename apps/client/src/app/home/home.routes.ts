import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { JoinNetworkComponent } from "../pages/join-network/join-network.component";
import { TermsOfUseComponent } from "../pages/terms-of-use/terms-of-use.component";

export const HOME_ROUTES:Routes = [
    {
        path: '',
        component: HomeComponent,
        //canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'join-network', pathMatch: 'full' },
            { 
                path: 'join-network',  
                component: JoinNetworkComponent 
            },
            { 
                path: 'terms-of-use',  
                component: TermsOfUseComponent 
            }
        ]
    }
];