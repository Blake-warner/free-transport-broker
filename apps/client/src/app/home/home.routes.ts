import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { JoinNetworkComponent } from "../pages/join-network/join-network.component";

export const HOME_ROUTES:Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { 
                path: 'join-network',  
                component: JoinNetworkComponent 
            }
        ]
    }
];