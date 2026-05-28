package com.ashura.ashurabackend.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfferRequest {

    private String categoryId;

    private String productType;

    private Double discountPercentage;
}