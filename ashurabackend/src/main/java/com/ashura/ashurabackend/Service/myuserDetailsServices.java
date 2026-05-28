package com.ashura.ashurabackend.Service;


import com.ashura.ashurabackend.models.User;
import com.ashura.ashurabackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class myuserDetailsServices implements UserDetailsService {
    @Autowired
    private UserRepository userrepo;
    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userrepo.findByEmail(email);


        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
