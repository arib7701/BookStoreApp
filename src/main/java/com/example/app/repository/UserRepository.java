package com.example.app.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.app.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,Long>  {

    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findAll();
}
