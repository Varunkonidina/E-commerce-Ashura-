package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Service.ReviewService;
import com.ashura.ashurabackend.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @PostMapping("/{productId}")
    public Review addReview(
            @PathVariable Long productId,
            @RequestBody Review review,
            Authentication authentication
    ) {

        return service.addReview(
                productId,
                review,
                authentication
        );
    }

    @GetMapping("/{productId}")
    public Page<Review> getReviews(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {

        return service.getReviews(
                productId,
                page,
                size
        );
    }
}