import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "search/:searchTerm",
        component:HomeComponent
    },
    {
        path: "tag/:tag",
        component: HomeComponent
    },
    {
        path: "food/:id",
        component: FoodPageComponent
    },
    {
        path:"cart-page",
        component:CartPageComponent
    },
    {
        path:"login-page",
        component:LoginPageComponent
    }

];
