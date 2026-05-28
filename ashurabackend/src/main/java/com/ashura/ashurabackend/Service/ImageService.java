package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Dto.ProductDto;
import com.ashura.ashurabackend.Repository.BrandRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.ProductImageRepository;
import com.ashura.ashurabackend.mapper.ProductMapper;
import com.ashura.ashurabackend.models.Brand;
import com.ashura.ashurabackend.models.Product;
import com.ashura.ashurabackend.models.ProductImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ImageService {
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    public ImageService(BrandRepository brandRepository,ProductRepository productRepository,ProductImageRepository productImageRepository)
    {
        this.brandRepository=brandRepository;
        this.productRepository=productRepository;
        this.productImageRepository=productImageRepository;
    }

    public ProductDto addProduct(
             String name,
             String description,
             BigDecimal price,
             Long categoryId,
             String brand,
             boolean isTrending,
             boolean isLatest,
             String productType,
             List<MultipartFile> images,
             List<Boolean> isPrimary
    )
    {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategoryId(categoryId);
        product.setIsTrending(isTrending);
        product.setIsLatest(isLatest);
        product.setProductType(productType);

        if (brand != null) {
            Brand brandEntity = brandRepository.findByName(brand).orElse(null);
            product.setBrand(brandEntity);
        }

        Product savedProduct = productRepository.save(product);

        String uploadDir = "src/main/resources/static/images/products/";

        for (int i = 0; i < images.size(); i++) {
            MultipartFile file = images.get(i);

            if (file.isEmpty()) continue;

            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                Path path = Paths.get(uploadDir + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());

                ProductImage img = new ProductImage();
                img.setProduct(savedProduct);
                img.setImageUrl("/images/products/" + fileName);
                img.setIsPrimary(isPrimary.get(i));

                productImageRepository.save(img);

            } catch (IOException e) {
                throw new RuntimeException("Image upload failed");
            }
        }

        return ProductMapper.toResponseDTO(savedProduct);
    }

}

