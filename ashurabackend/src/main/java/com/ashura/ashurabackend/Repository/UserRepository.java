package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long>{
    User findByEmail(String email);
    @Query("""
           SELECT COUNT(u)
           FROM User u
           """)
    Long getTotalCustomers();

    @Query("""
           SELECT COUNT(u)
           FROM User u
           WHERE u.totalSpent >= 50000
           """)
    Long getVipCustomers();

    @Query("""
           SELECT COUNT(u)
           FROM User u
           WHERE u.totalSpent < 50000
           AND u.totalSpent >= 5000
           """)
    Long getRegularCustomers();

    @Query("""
           SELECT COUNT(u)
           FROM User u
           WHERE u.totalSpent < 5000
           """)
    Long getNewCustomers();
}
