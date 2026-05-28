package com.ashura.ashurabackend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    @Column(name = "address")
    private String address;
    @Column(name = "mobile")
    private String mobile;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name = "total_spent")
    private Double totalSpent ;
}