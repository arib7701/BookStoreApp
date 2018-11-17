import { Component, OnInit } from '@angular/core';
import { AddBookService } from '../../../services/add-book.service';
import { Book } from '../../../models/book';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  private newBook: Book = new Book();
  private bookAdded: boolean;

  constructor(
    private addBookService: AddBookService,
    private updateImageService: UploadImageService
  ) {}

  onSubmit() {
    this.addBookService.sendBook(this.newBook).subscribe(
      result => {
        this.updateImageService.upload(
          JSON.parse(JSON.parse(JSON.stringify(result))._body).id
        );
        this.bookAdded = true;
        this.newBook = new Book();
        this.newBook.active = true;
        this.newBook.category = 'management';
        this.newBook.language = 'english';
        this.newBook.format = 'paperback';
      },
      error => {
        console.log('Error add new book ', error);
      }
    );
  }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook.active = true;
    this.newBook.category = 'management';
    this.newBook.language = 'english';
    this.newBook.format = 'paperback';
  }
}
