package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Repository.CartItemRepository;
import com.ashura.ashurabackend.Repository.CartRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.UserRepository;
import com.ashura.ashurabackend.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartItemRepository itemRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long userId, Long productId, int quantity, double price) {

        Cart cart = cartRepo.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setItems(new ArrayList<>());
                    return cartRepo.save(newCart);
                });

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem item = new CartItem();
            item.setProductId(productId);
            item.setQuantity(quantity);
            item.setPrice(price);
            item.setCart(cart);
            cart.getItems().add(item);
        }

        return cartRepo.save(cart);
    }

    public Cart getCart(Long userId) {
        return cartRepo.findByUserId(userId)
                .orElse(null);
    }

    public void removeItem(Long itemId) {
        itemRepo.deleteById(itemId);
    }

    public Cart updateQuantity(Long itemId, int quantity) {

        CartItem item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (quantity <= 0) {
            itemRepo.delete(item);
        } else {
            item.setQuantity(quantity);
            itemRepo.save(item);
        }

        return item.getCart();
    }

    public Map<String, Object> getCartByEmail(String email) {

        User user = userRepository.findByEmail(email);

        Cart cart = cartRepo.findByUserId(user.getId())
                .orElse(null);

        if (cart == null || cart.getItems() == null || cart.getItems().isEmpty()) {
            return Map.of("items", List.of(), "total", 0);
        }

        List<Map<String, Object>> items = new ArrayList<>();
        double total = 0;

        for (CartItem item : cart.getItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElse(null);

            if (product == null) continue;

            String primaryImage = product.getProductimage()
                    .stream()
                    .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                    .map(ProductImage::getImageUrl)
                    .findFirst()
                    .orElse(null);

            Map<String, Object> data = new HashMap<>();
            data.put("id", item.getId());
            data.put("name", product.getName());
            data.put("price", item.getPrice());
            data.put("quantity", item.getQuantity());
            data.put("imageUrl", primaryImage);

            total += item.getPrice() * item.getQuantity();
            items.add(data);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("items", items);
        response.put("total", total);

        return response;
    }

    public Cart addToCartByEmail(String email, Long productId, int quantity, double price) {

        User user = userRepository.findByEmail(email);

        Cart cart = cartRepo.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(user.getId());
                    newCart.setItems(new ArrayList<>());
                    return cartRepo.save(newCart);
                });

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setPrice(price);
            newItem.setCart(cart);

            cart.getItems().add(newItem);
        }

        return cartRepo.save(cart);
    }
}