import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { JoinNetworkComponent } from "../pages/join-network/join-network.component";
//import { authGuard } from "../pages/auth/auth.guard";

export const HOME_ROUTES:Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { 
                path: 'join-network',  
                component: JoinNetworkComponent 
            }
        ]
    }
];