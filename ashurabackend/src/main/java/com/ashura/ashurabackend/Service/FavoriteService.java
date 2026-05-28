package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Repository.FavoriteRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.UserRepository;
import com.ashura.ashurabackend.models.Favorite;
import com.ashura.ashurabackend.models.Product;
import com.ashura.ashurabackend.models.User;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public FavoriteService(FavoriteRepository favoriteRepo,
                           ProductRepository productRepo,
                           UserRepository userRepo) {
        this.favoriteRepo = favoriteRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    public void toggleFavorite(String email, Long productId) {

        User user = userRepo.findByEmail(email);


        if (favoriteRepo.existsByUserAndProductId(user, productId)) {
            favoriteRepo.deleteByUserAndProductId(user, productId);
        } else {
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            Favorite fav = new Favorite();
            fav.setUser(user);
            fav.setProduct(product);

            favoriteRepo.save(fav);
        }
    }

    public List<Favorite> getUserFavorites(String email) {
        User user = userRepo.findByEmail(email);


        return favoriteRepo.findByUser(user);
    }
}