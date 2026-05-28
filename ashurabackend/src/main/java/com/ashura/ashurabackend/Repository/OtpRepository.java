package com.ashura.ashurabackend.Repository;


import com.ashura.ashurabackend.models.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByEmail(String email);
}
