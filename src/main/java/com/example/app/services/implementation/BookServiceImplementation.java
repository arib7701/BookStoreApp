package com.example.app.services.implementation;

import com.example.app.domain.Book;
import com.example.app.repository.BookRepository;
import com.example.app.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class BookServiceImplementation implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        List<Book> bookList = (List<Book>) bookRepository.findAll();
        List<Book> activeBookList = new ArrayList<>();

        for(Book book: bookList){
            if(book.isActive()){
                activeBookList.add(book);
            }
        }
        return activeBookList;
    }

    @Override
    public Book findById(Long id) {
        Optional<Book> optBook = bookRepository.findById(id);
        if(optBook.isPresent()){
            return optBook.get();
        } else {
            return null;
        }
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> blurrySearch(String keyword) {
        List<Book> bookList = bookRepository.findByTitleContaining(keyword);
        List<Book> activeBookList = new ArrayList<>();

        for(Book book : bookList){
            if(book.isActive()){
                activeBookList.add(book);
            }
        }
        return activeBookList;
    }

    @Override
    public void removeById(Long id) {
        bookRepository.deleteById(id);
    }
}
