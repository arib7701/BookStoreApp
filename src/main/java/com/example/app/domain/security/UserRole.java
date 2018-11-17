package com.example.app.domain.security;

import javax.persistence.*;
import java.io.Serializable;
import com.example.app.domain.User;

@Entity
public class UserRole implements Serializable {

    private static final long serialVersionUID = 284820148L;

    private long userRoleId;
    private User user;
    private Role role;

    public UserRole(){}

    public UserRole(User user, Role role){
        this.user = user;
        this.role = role;
    }

    // Set up Primary key in Table using @Id
    // Autoincrement with @GeneratedValue
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(long userRoleId) {
        this.userRoleId = userRoleId;
    }

    // EAGER : active fetching user table rows vs LAZY: not active fetching
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name= "role_id")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}