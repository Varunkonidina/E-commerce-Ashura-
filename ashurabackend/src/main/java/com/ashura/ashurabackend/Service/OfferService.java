package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Dto.OfferRequest;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.models.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final ProductRepository productRepository;

    public void applyOffer(OfferRequest request) {

        List<Product> products;

        boolean allCategories =
                "ALL".equalsIgnoreCase(
                        request.getCategoryId()
                );

        boolean allTypes =
                "ALL".equalsIgnoreCase(
                        request.getProductType()
                );

        if (allCategories && allTypes) {

            products = productRepository.findAll();

        } else if (allCategories) {

            products =
                    productRepository.findByProductType(
                            request.getProductType()
                    );

        } else if (allTypes) {

            products =
                    productRepository.findByCategoryId(
                            Long.valueOf(
                                    request.getCategoryId()
                            )
                    );

        } else {

            products =
                    productRepository
                            .findByCategoryIdAndProductType(
                                    Long.valueOf(
                                            request.getCategoryId()
                                    ),
                                    request.getProductType()
                            );
        }

        for (Product product : products) {

            double originalPrice =
                    product.getPrice().doubleValue();

            double discount =
                    originalPrice *
                            request.getDiscountPercentage() / 100;

            Integer finalPrice =
                    (int) Math.round(
                            originalPrice - discount
                    );

            product.setDiscountPercentage(
                    request.getDiscountPercentage()
            );

            product.setDiscountedPrice(
                    finalPrice
            );

            product.setHasOffer(true);
        }

        productRepository.saveAll(products);
    }
}