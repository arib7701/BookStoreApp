package com.example.app.services.implementation;

import com.example.app.domain.User;
import com.example.app.domain.security.UserRole;
import com.example.app.repository.RoleRepository;
import com.example.app.repository.UserRepository;
import com.example.app.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Component
public class UserServiceImplementation implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    // Injection
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public User createUser(User user, Set<UserRole> userRoles) {

        System.out.println("INTO USER SERVICE - CREATE USER");

        User localUser = userRepository.findByUsername(user.getUsername());

        if(localUser != null){
            LOG.info("User with username {} already exist. Nothing will be done", user.getUsername());
        }
        else {
            for(UserRole ur: userRoles){
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            localUser = userRepository.save(user);
        }
        return localUser;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            return optUser.get();
        } else {
            return null;
        }
    }


}
