import { Routes } from '@angular/router';
import { StoreFrontComponent } from './store-front.component';
import { HomeComponent } from './store-front-components/home/home.component';
import { MyAccountComponent } from './store-front-components/my-account/my-account.component';
export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'myAccount', component: MyAccountComponent }
    ]
  }
];
