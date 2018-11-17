import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { storeFrontRoutes } from './store-front.routes';
import { HomeComponent } from './store-front-components/home/home.component';
import { StoreFrontComponent } from './store-front.component';
import { NavbarComponent } from './store-front-components/navbar/navbar.component';
import { MyAccountComponent } from './store-front-components/my-account/my-account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(storeFrontRoutes)
  ],
  declarations: [StoreFrontComponent, HomeComponent, NavbarComponent, MyAccountComponent],
  exports: [StoreFrontComponent]
})
export class StoreFrontModule {}
