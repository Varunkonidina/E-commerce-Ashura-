package com.ashura.ashurabackend.Dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesSummaryDto {

    private Double revenue;

    private Integer totalSold;

    private String topProduct;
}
