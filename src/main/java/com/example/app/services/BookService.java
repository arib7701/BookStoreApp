package com.example.app.services;

import com.example.app.domain.Book;

import java.util.List;

public interface BookService {

    List<Book> findAll();
    Book findById(Long id);
    Book save(Book book);
    List<Book> blurrySearch(String title);
    void removeById(Long id);
}
