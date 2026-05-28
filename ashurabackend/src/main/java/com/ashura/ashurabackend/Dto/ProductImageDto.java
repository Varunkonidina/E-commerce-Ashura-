package com.ashura.ashurabackend.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductImageDto {
    private Long id;
    private String imageUrl;
    private Boolean isPrimary;
}
