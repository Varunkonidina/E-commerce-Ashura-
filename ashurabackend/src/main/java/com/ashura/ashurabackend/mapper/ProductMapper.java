package com.ashura.ashurabackend.mapper;
import com.ashura.ashurabackend.Dto.ProductDto;
import com.ashura.ashurabackend.Dto.ProductImageDto;
import com.ashura.ashurabackend.models.Product;
import com.ashura.ashurabackend.models.ProductImage;
import java.util.List;
import java.util.stream.Collectors;
public class ProductMapper {

    public static ProductDto toResponseDTO(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCategoryId(product.getCategoryId());
        dto.setIsTrending(product.getIsTrending());
        dto.setIsLatest(product.getIsLatest());
        dto.setRating(product.getAverageRating());
        dto.setStock(product.getStock());

        if (product.getBrand() != null) {
            dto.setBrand(product.getBrand().getName());
        }

        dto.setProductType(product.getProductType());

        dto.setDiscountPercentage(
                product.getDiscountPercentage()
        );

        dto.setDiscountedPrice(
                product.getDiscountedPrice()
        );

        dto.setHasOffer(
                product.getHasOffer()
        );

        if (product.getProductimage() != null) {

            List<ProductImageDto> imageDTOs =
                    product.getProductimage()
                            .stream()
                            .map(ProductMapper::toImageResponseDTO)
                            .collect(Collectors.toList());

            dto.setImages(imageDTOs);
        }

        return dto;
    }

    private static ProductImageDto toImageResponseDTO(
            ProductImage image
    ) {

        ProductImageDto dto = new ProductImageDto();

        dto.setId(image.getId());

        dto.setImageUrl(image.getImageUrl());

        dto.setIsPrimary(image.getIsPrimary());

        return dto;
    }

    public static Product toEntity(ProductDto dto) {

        Product product = new Product();

        product.setName(dto.getName());

        product.setDescription(dto.getDescription());

        product.setPrice(dto.getPrice());

        product.setCategoryId(dto.getCategoryId());

        product.setIsTrending(dto.getIsTrending());

        product.setIsLatest(dto.getIsLatest());

        product.setProductType(dto.getProductType());

        product.setCreatedAt(
                java.time.LocalDateTime.now()
        );

        product.setAverageRating(0.0);

        product.setDiscountPercentage(
                dto.getDiscountPercentage()
        );

        product.setDiscountedPrice(
                dto.getDiscountedPrice()
        );

        product.setHasOffer(
                dto.getHasOffer()
        );

        if (dto.getImages() != null) {

            List<ProductImage> images =
                    dto.getImages()
                            .stream()
                            .map(imageDTO -> {

                                ProductImage image =
                                        new ProductImage();

                                image.setImageUrl(
                                        imageDTO.getImageUrl()
                                );

                                image.setIsPrimary(
                                        imageDTO.getIsPrimary()
                                );

                                image.setProduct(product);

                                return image;
                            })
                            .collect(Collectors.toList());

            product.setProductimage(images);
        }

        return product;
    }
}