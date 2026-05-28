package com.ashura.ashurabackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private BigDecimal price;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "is_trending")
    private Boolean isTrending;
    private Integer stock;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name="is_latest")
    private Boolean isLatest;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductImage> productimage;
    private Double averageRating;
    private String productType;
    private Double discountPercentage;
    private Integer discountedPrice;
    private Boolean hasOffer = false;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

}
