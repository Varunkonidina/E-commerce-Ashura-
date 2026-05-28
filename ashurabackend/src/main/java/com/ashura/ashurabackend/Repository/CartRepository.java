package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.Cart;
import com.ashura.ashurabackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);

        void deleteByUserId(Long userId);

}
