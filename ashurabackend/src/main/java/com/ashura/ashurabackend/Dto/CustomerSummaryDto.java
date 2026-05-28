package com.ashura.ashurabackend.Dto;
import lombok.Data;

@Data
public class CustomerSummaryDto {

    private Long totalCustomers;

    private Long vipCustomers;

    private Long regularCustomers;

    private Long newCustomers;
}
