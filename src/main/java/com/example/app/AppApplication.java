package com.example.app;

import com.example.app.config.SecurityUtility;
import com.example.app.domain.User;
import com.example.app.domain.security.Role;
import com.example.app.domain.security.UserRole;
import com.example.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {


    @Autowired
    private UserService userService;

    public static void main(String[] args) {

        SpringApplication.run(AppApplication.class, args);
    }

    @Override
    // @Transactional will do a .begin() and surround method with try/catch
    // if error --> do a .rollback() in DB
    // if success --> do a .commit() in DB
    @Transactional
    public void run(String... args) throws Exception {

        // Create UserRole
        Set<UserRole> userRoles = new HashSet<>();

        // Create User
        User user1 = new User();
        user1.setFirstname("John");
        user1.setLastname("Adams");
        user1.setUsername("j");
        user1.setPassword(SecurityUtility.passwordEncoder().encode("p"));
        user1.setEmail("jadams@gmail.com");

        // Create Role
        Role role1 = new Role();
        role1.setName("ROLE_USER");

        userRoles.add(new UserRole(user1, role1));
        userService.createUser(user1, userRoles);

        userRoles.clear();

        // -------------------------------------------


        // Create Admin
        User user2 = new User();
        user2.setFirstname("Admin");
        user2.setLastname("Admin");
        user2.setUsername("admin");
        user2.setPassword(SecurityUtility.passwordEncoder().encode("p"));
        user2.setEmail("admin@gmail.com");

        // Create Role
        Role role2 = new Role();
        role2.setName("ROLE_ADMIN");


        userRoles.add(new UserRole(user2, role2));
        userService.createUser(user2, userRoles);
    }
}
