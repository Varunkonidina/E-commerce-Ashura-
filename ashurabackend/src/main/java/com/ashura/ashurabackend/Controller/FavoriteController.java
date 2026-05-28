package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Service.FavoriteService;
import com.ashura.ashurabackend.models.Favorite;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
//@CrossOrigin(origins = "*")
public class FavoriteController {

    private final FavoriteService service;

    public FavoriteController(FavoriteService service) {
        this.service = service;
    }

    @PostMapping("/{productId}")
    public void toggleFavorite(@PathVariable Long productId,
                               Authentication authentication) {

        String email = authentication.getName();
        service.toggleFavorite(email, productId);
    }

    @GetMapping
    public List<Favorite> getFavorites(Authentication authentication) {

        String email = authentication.getName();
        return service.getUserFavorites(email);
    }

}
