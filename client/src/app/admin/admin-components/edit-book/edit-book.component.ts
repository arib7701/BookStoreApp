import { Component, OnInit } from '@angular/core';
import { EditBookService } from 'src/app/services/edit-book.service';
import { GetBookService } from 'src/app/services/get-book.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  private bookId: number;
  private book: Book = new Book();
  private bookUpdated: boolean;

  constructor(
    private editBookService: EditBookService,
    private getBookService: GetBookService,
    private updateImageService: UploadImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    this.editBookService.sendBook(this.book).subscribe(
      result => {
        this.updateImageService.modify(
          JSON.parse(JSON.parse(JSON.stringify(result))._body).id
        );
        this.bookUpdated = true;
      },
      error => {
        console.log('Error updating book ', error);
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.getBookService.getBook(this.bookId).subscribe(
      result => {
        this.book = result.json();
      },
      error => {
        console.log('Error getting book ', error);
      }
    );
  }
}
