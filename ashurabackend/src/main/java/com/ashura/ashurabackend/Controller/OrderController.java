package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Service.OrderService;
import com.ashura.ashurabackend.models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create-order")
    public Orders createOrder(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.createOrder(userDetails);
    }
    @GetMapping("/my-orders")
    public List<Orders> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.getMyOrders(userDetails);
    }
    @GetMapping("/all")
    public List<Orders> getAllOrders() {
        return orderService.getAllOrders();
    }
}
