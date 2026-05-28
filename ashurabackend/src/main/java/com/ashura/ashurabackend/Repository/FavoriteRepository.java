package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.Favorite;
import com.ashura.ashurabackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByUserAndProductId(User user, Long productId);

    void deleteByUserAndProductId(User user, Long productId);

    List<Favorite> findByUser(User user);
}
