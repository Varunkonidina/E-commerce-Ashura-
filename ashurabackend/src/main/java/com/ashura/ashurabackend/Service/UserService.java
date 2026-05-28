package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.models.User;
import com.ashura.ashurabackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class UserService {
    private UserRepository UserRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserService(UserRepository UserRepo )
    {
        this.UserRepo=UserRepo;

    }
    public User getUserByEmail(String email) {
        return UserRepo.findByEmail(email);
    }
    private BCryptPasswordEncoder encode =new BCryptPasswordEncoder(10);
    public ResponseEntity<User> saveUser(User user) {

        if (UserRepo.findByEmail(user.getEmail())!=null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(UserRepo.save(user));
    }
    public User getProfile( UserDetails userDetails) {
        return UserRepo.findByEmail(userDetails.getUsername());
    }

    public User updateAddress(
             UserDetails userDetails,
            String address
    ) {
        User user = UserRepo.findByEmail(userDetails.getUsername());
        user.setAddress(address);
        return UserRepo.save(user);
    }

    public User updateMobile(
            UserDetails userDetails,
            String mobile
    ) {
        User user = UserRepo.findByEmail(userDetails.getUsername());
        user.setMobile(mobile);
        return UserRepo.save(user);
    }
}
