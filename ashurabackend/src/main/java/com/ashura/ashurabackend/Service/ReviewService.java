package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.ReviewRepository;
import com.ashura.ashurabackend.models.Product;
import com.ashura.ashurabackend.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    public Review addReview(Long productId, Review review, Authentication authentication) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        review.setProduct(product);

        review.setCreatedAt(LocalDateTime.now());

        if (authentication != null) {
            review.setUserName(authentication.getName());
        } else {
            review.setUserName("Anonymous");
        }

        Review savedReview = reviewRepository.save(review);

        updateAverageRating(product);

        return savedReview;
    }

    public Page<Review> getReviews(Long productId, int page, int size) {

        return reviewRepository.findByProductId(
                productId,
                PageRequest.of(page, size)
        );
    }

    private void updateAverageRating(Product product) {

        List<Review> reviews = reviewRepository.findAllByProductId(product.getId());

        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        product.setAverageRating(average);

        productRepository.save(product);
    }
}