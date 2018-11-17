package com.example.app.services;

import com.example.app.domain.User;
import com.example.app.domain.security.UserRole;

import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles);
    User findByUsername(String username);
    User findByEmail(String email);
    User save(User user);
    User findById(Long id);
}
