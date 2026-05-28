package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Repository.CartRepository;
import com.ashura.ashurabackend.Repository.OrderRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.UserRepository;
import com.ashura.ashurabackend.models.*;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final UserRepository userRepo;
    private final CartRepository cartRepo;
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;

    public OrderService(UserRepository userRepo,
                        CartRepository cartRepo,
                        OrderRepository orderRepo,
                        ProductRepository productRepo) {
        this.userRepo = userRepo;
        this.cartRepo = cartRepo;
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    public Orders createOrder(UserDetails userDetails) {

        User user = userRepo.findByEmail(userDetails.getUsername());

        Cart cart = cartRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cart.getItems();

        Orders order = new Orders();
        order.setUsername(user.getEmail());
        order.setAddress(user.getAddress());
        order.setStatus("PAID");

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            Product product = productRepo.findById(cartItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName());
            }
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepo.save(product);

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(cartItem.getQuantity());
            item.setOrder(order);

            orderItems.add(item);
        }

        order.setItems(orderItems);

        cartRepo.deleteByUserId(user.getId());

        return orderRepo.save(order);
    }

    public List<Orders> getMyOrders(UserDetails userDetails) {
        return orderRepo.findByUsername(userDetails.getUsername());
    }

    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }
}