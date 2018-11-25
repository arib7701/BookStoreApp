import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Services
import { LoginService } from '../services/login.service';
import { AddBookService } from '../services/add-book.service';
import { UploadImageService } from '../services/upload-image.service';
import { GetBookListService } from '../services/get-book-list.service';
import { GetBookService } from '../services/get-book.service';
import { EditBookService } from '../services/edit-book.service';
import { RemoveBookService } from '../services/remove-book.service';
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  declarations: [],
  providers: [
    LoginService,
    AddBookService,
    UploadImageService,
    GetBookListService,
    GetBookService,
    EditBookService,
    RemoveBookService,
    UserService
  ]
})
export class SharedModule {}
