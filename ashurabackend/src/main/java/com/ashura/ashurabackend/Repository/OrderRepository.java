package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository
        extends JpaRepository<Orders, Long> {

    List<Orders> findByUsername(String username);

    @Query("""
           SELECT SUM(oi.product.price * oi.quantity)
           FROM OrderItem oi
           """)
    Double getTotalRevenue();

    @Query("""
           SELECT SUM(oi.quantity)
           FROM OrderItem oi
           """)
    Integer getTotalProductsSold();

    @Query("""
           SELECT oi.product.name
           FROM OrderItem oi
           GROUP BY oi.product.name
           ORDER BY SUM(oi.quantity) DESC
           """)
    List<String> getMostSoldProducts();
}