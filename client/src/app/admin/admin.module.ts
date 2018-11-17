import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { adminRoutes } from './admin.routes';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './admin-components/navbar/navbar.component';
import { LoginComponent } from './admin-components/login/login.component';
import { AddNewBookComponent } from './admin-components/add-new-book/add-new-book.component';
import {
  BookListComponent,
  DialogOverviewExampleDialogComponent
} from './admin-components/book-list/book-list.component';
import { ViewBookComponent } from './admin-components/view-book/view-book.component';
import { EditBookComponent } from './admin-components/edit-book/edit-book.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(adminRoutes)],
  declarations: [
    NavbarComponent,
    AdminComponent,
    LoginComponent,
    AddNewBookComponent,
    BookListComponent,
    ViewBookComponent,
    EditBookComponent,
    DialogOverviewExampleDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent]
})
export class AdminModule {}
