package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Configaretion.JwtUtil;
import com.ashura.ashurabackend.Service.UserService;
import com.ashura.ashurabackend.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService,
                          AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );

        if (authentication.isAuthenticated()) {
            User loggedInUser = userService.getUserByEmail(user.getEmail());
            String token = jwtUtil.generateToken(
                    loggedInUser.getEmail(),
                    loggedInUser.getRole().name()
            );

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("email", loggedInUser.getEmail());
            response.put("role", loggedInUser.getRole().name());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(null);
    }
    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getProfile(userDetails);
    }
    @PutMapping("/address")
    public User updateAddress(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String address
    ) {

        return userService.updateAddress(userDetails,address);
    }
}
