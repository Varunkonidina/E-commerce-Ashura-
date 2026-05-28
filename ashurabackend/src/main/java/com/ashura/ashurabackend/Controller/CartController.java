package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Service.CartService;
import com.ashura.ashurabackend.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
//@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(
            @RequestBody Map<String, Object> data,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Long productId = Long.valueOf(data.get("productId").toString());
        int quantity = Integer.parseInt(data.get("quantity").toString());
        double price = Double.parseDouble(data.get("price").toString());

        return cartService.addToCartByEmail(email, productId, quantity, price);
    }

    @GetMapping
    public Map<String, Object> getCart(Authentication authentication) {
        String email = authentication.getName();
        return cartService.getCartByEmail(email);
    }

    @DeleteMapping("/remove/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
    }
    @PutMapping("/update")
    public Cart updateQuantity(@RequestBody Map<String, Object> data) {
        Long itemId = Long.valueOf(data.get("itemId").toString());
        int quantity = Integer.parseInt(data.get("quantity").toString());

        return cartService.updateQuantity(itemId, quantity);
    }
}
