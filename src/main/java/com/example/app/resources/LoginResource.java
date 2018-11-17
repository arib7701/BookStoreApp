package com.example.app.resources;

import com.example.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@RestController
public class LoginResource {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/token" )
    public Map<String, String> token(HttpSession session, HttpServletRequest request){

        String removeHost = request.getRemoteHost();
        int portNumber = request.getRemotePort();

        System.out.println(request.getRemoteHost());
        System.out.println(removeHost+":"+portNumber);

        return Collections.singletonMap("token", session.getId());
    }

    @RequestMapping("/checkSession")
    public ResponseEntity checkSession(){
        System.out.println("CheckSession");
        return new ResponseEntity("Session Active!", HttpStatus.OK);
    }

    @RequestMapping(value = "/user/logout", method = RequestMethod.POST)
    public ResponseEntity logout() {
        SecurityContextHolder.clearContext();
        System.out.println("Logout");
        return new ResponseEntity("Logout Successfull!", HttpStatus.OK);
    }
}
