package com.example.app.repository;

import com.example.app.domain.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {

    List<Book> findByTitleContaining(String keyword);
}
