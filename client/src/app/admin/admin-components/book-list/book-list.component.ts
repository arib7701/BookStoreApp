import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { GetBookListService } from '../../../services/get-book-list.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RemoveBookService } from 'src/app/services/remove-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private selectedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removeBookList: Book[] = new Array();

  constructor(
    private router: Router,
    private getBookListService: GetBookListService,
    public dialog: MatDialog,
    private removeBookService: RemoveBookService
  ) {}

  onSelect(book: Book): void {
    this.selectedBook = book;
    this.router.navigate(['/admin/viewBook/', this.selectedBook.id]);
  }

  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result === 'yes') {
          this.removeBookService.sendBook(book.id).subscribe(
            res => {
              console.log(res);
              this.getBookList();
            },
            err => {
              console.log('Error removebook ', err);
            }
          );
        }
      },
      error => {
        console.log('Error dialogRef ', error);
      }
    );
  }

  getBookList() {
    this.getBookListService.getBookList().subscribe(
      result => {
        console.log(result.json());
        this.bookList = result.json();
      },
      error => {
        console.log('Error get book list: ', error);
      }
    );
  }

  updateSelected(checked: boolean) {
    if (checked) {
      this.allChecked = true;
      // copy content of array but not the ref of the array
      this.removeBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removeBookList = [];
    }
  }

  updateRemoveBookList(checked: boolean, book: Book) {
    if (checked) {
      this.removeBookList.push(book);
    } else {
      this.removeBookList.splice(this.removeBookList.indexOf(book), 1);
    }
  }

  removeSelectedBooks() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result === 'yes') {
          for (const book of this.removeBookList) {
            this.removeBookService.sendBook(book.id).subscribe(
              res => {
                console.log(res);
                this.getBookList();
              },
              err => {
                console.log('Error removebook ', err);
              }
            );
          }
        }
      },
      error => {
        console.log('Error dialogRef ', error);
      }
    );
  }

  ngOnInit() {
    this.getBookList();
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html'
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>
  ) {}
}
