package com.example.app.domain.security;
import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="role")
public class Role implements Serializable {

    private static final long serialVersionUID = 890245632L;

    private int roleId;
    private String name;
    private Set<UserRole> userRole = new HashSet<>();

    public Role() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }


    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public Set<UserRole> getUserRole() {
        return userRole;
    }

    public void setUserRole(Set<UserRole> userRole) {
        this.userRole = userRole;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
