package com.example.app.resources;

import com.example.app.config.SecurityConfig;
import com.example.app.config.SecurityUtility;
import com.example.app.domain.User;
import com.example.app.domain.security.Role;
import com.example.app.domain.security.UserRole;
import com.example.app.services.UserService;
import com.example.app.utility.MailConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserResource {

    @Autowired
    private UserService userService;

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    @RequestMapping(value="/newUser", method= RequestMethod.POST)
    public ResponseEntity newUserPost(HttpServletRequest request, @RequestBody HashMap<String, String> mapper) throws Exception {
        String username = mapper.get("username");
        String userEmail = mapper.get("email");

        if(userService.findByUsername(username) != null){
            System.out.println("Username exists already");
            return new ResponseEntity("usernameExists", HttpStatus.BAD_REQUEST);
        }

        if(userService.findByEmail(userEmail) != null){
            System.out.println("Username exists already");
            return new ResponseEntity("emailExists", HttpStatus.BAD_REQUEST);
        }

        System.out.println("INTO NEWUSERPOST - ABOUT TO CREATE USER");

        User user = new User();
        user.setUsername(username);
        user.setEmail(userEmail);

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);

        Role role = new Role();
        role.setRoleId(1);
        role.setName("ROLE_USER");
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(new UserRole(user, role));
        userService.createUser(user, userRoles);

        SimpleMailMessage email = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(email);

        return new ResponseEntity("User added successfully", HttpStatus.OK);
    }

    @RequestMapping(value="/forgetPassword", method= RequestMethod.POST)
    public ResponseEntity forgetPasswordPost(HttpServletRequest request, @RequestBody HashMap<String, String> mapper) throws Exception {

        User user = userService.findByEmail(mapper.get("email"));

        if(user == null){
            return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
        }

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);
        userService.save(user);

        SimpleMailMessage newEmail = mailConstructor.constructNewUserEmail(user, password);
        mailSender.send(newEmail);

        return new ResponseEntity("Email for password reset sent", HttpStatus.OK);
    }

    @RequestMapping(value="/getCurrentUser", method = RequestMethod.GET)
    public User getCurrentUser(Principal principal) {
        String username = principal.getName();
        User user = new User();
        if(null != username){
           user  = userService.findByUsername(principal.getName());
        }
        return user;
    }

    @RequestMapping(value="/updateUserInfo", method = RequestMethod.POST)
    public ResponseEntity profileInfo(@RequestBody HashMap<String, Object> mapper) throws Exception {

        int id = (Integer) mapper.get("id");
        String email = (String) mapper.get("email");
        String username = (String) mapper.get("username");
        String firstname = (String) mapper.get("firstname");
        String lastname = (String) mapper.get("lastname");
        String newPassword = (String) mapper.get("newPassword");
        String currentPassword = (String) mapper.get("currentPassword");

        User currentUser = userService.findById(Long.valueOf(id));

        if(currentUser == null) {
            throw new Exception("User not found");
        }

        if(userService.findByEmail(email) != null) {
            if(userService.findByEmail(email).getId() != currentUser.getId()) {
                return new ResponseEntity("Email not found", HttpStatus.BAD_REQUEST);
            }
        }

        if(userService.findByUsername(username) != null) {
            if(userService.findByUsername(username).getId() != currentUser.getId()){
                return new ResponseEntity("Username not found", HttpStatus.BAD_REQUEST);
            }
        }

        SecurityConfig securityConfig = new SecurityConfig();

        System.out.println("new pass " + newPassword);

        if(newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")){
            BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
            String dbPassword = currentUser.getPassword();

            if(passwordEncoder.matches(currentPassword, dbPassword)) {

                currentUser.setPassword(passwordEncoder.encode(newPassword));

                currentUser.setFirstname(firstname);
                currentUser.setLastname(lastname);
                currentUser.setUsername(username);
                currentUser.setEmail(email);

                userService.save(currentUser);
                return new ResponseEntity("Update successfully", HttpStatus.OK);

            } else {
                return new ResponseEntity("Incorrect current password", HttpStatus.BAD_REQUEST);
            }
        }
        else {
            return new ResponseEntity("Incorrect new password", HttpStatus.BAD_REQUEST);
        }
    }
}
