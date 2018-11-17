import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './admin-components/login/login.component';
import { AddNewBookComponent } from './admin-components/add-new-book/add-new-book.component';
import { BookListComponent } from './admin-components/book-list/book-list.component';
import { ViewBookComponent } from './admin-components/view-book/view-book.component';
import { EditBookComponent } from './admin-components/edit-book/edit-book.component';
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'newBook', component: AddNewBookComponent },
      { path: 'listBook', component: BookListComponent },
      { path: 'viewBook/:id', component: ViewBookComponent },
      { path: 'editBook/:id', component: EditBookComponent }
    ]
  }
];
