import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { GetBookService } from 'src/app/services/get-book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  private book: Book = new Book();
  private bookId: number;

  constructor(
    private getBookService: GetBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSelect(book: Book) {
    this.router.navigate(['/admin/editBook', this.book.id]);
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
        console.log('Error getting a book ', error);
      }
    );
  }
}
