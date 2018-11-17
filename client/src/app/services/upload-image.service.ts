import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  filesToUpload: Array<File>;

  constructor(private http: Http) {
    this.filesToUpload = [];
  }

  upload(bookId: number) {
    this.makeFileRequest(
      'http://localhost:8181/book/add/image?id=' + bookId,
      [],
      this.filesToUpload
    ).then(
      result => {
        console.log(result);
      },
      error => {
        console.log('Error upload img ', error);
      }
    );
  }

  modify(bookId: number) {
    if (this.filesToUpload.length > 0) {
      this.makeFileRequest(
        'http://localhost:8181/book/update/image?id=' + bookId,
        [],
        this.filesToUpload
      ).then(
        result => {
          console.log(result);
        },
        error => {
          console.log('Error upload img ', error);
        }
      );
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resove, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image upload sucessfully!');
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      xhr.send(formData);
    });
  }
}
