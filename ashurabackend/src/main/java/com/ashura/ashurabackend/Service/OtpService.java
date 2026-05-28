package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Repository.OtpRepository;
import com.ashura.ashurabackend.models.OtpVerification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;

    private final EmailService emailService;

    public void sendOtp(String email) {

        String otp =
                String.valueOf(
                        100000 + new Random().nextInt(900000)
                );

        OtpVerification otpData =
                otpRepository
                        .findByEmail(email)
                        .orElse(new OtpVerification());

        otpData.setEmail(email);

        otpData.setOtp(otp);

        otpData.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        otpRepository.save(otpData);

        emailService.sendOtp(email, otp);
    }

    public boolean verifyOtp(
            String email,
            String otp
    ) {

        OtpVerification otpData =
                otpRepository
                        .findByEmail(email)
                        .orElse(null);

        if (otpData == null) {
            return false;
        }

        if (otpData.getExpiryTime()
                .isBefore(LocalDateTime.now())) {

            return false;
        }

        return otpData.getOtp().equals(otp);
    }
}