package com.ashura.ashurabackend.Dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private Boolean isTrending;
    private Boolean isLatest;
    private Double discountPercentage;
    private Integer discountedPrice;
    private Boolean hasOffer;
    private Integer stock;
    private Double rating;
    private String brand;
    private String productType;
    private List<ProductImageDto> images;

}