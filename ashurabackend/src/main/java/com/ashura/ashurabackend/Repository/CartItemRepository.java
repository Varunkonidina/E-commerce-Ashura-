package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}