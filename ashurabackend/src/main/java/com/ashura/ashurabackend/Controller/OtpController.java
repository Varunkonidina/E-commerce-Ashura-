package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/otp")
@CrossOrigin("*")
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public String sendOtp(
            @RequestBody Map<String, String> body
    ) {
        System.out.print("send hit");
        otpService.sendOtp(body.get("email"));

        return "OTP Sent";
    }

    @PostMapping("/verify")
    public String verifyOtp(
            @RequestBody Map<String, String> body
    ) {

        boolean valid =
                otpService.verifyOtp(
                        body.get("email"),
                        body.get("otp")
                );

        return valid
                ? "OTP Verified"
                : "Invalid OTP";
    }
}