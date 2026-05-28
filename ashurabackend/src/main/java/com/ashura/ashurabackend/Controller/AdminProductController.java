package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Dto.CustomerSummaryDto;
import com.ashura.ashurabackend.Dto.OfferRequest;
import com.ashura.ashurabackend.Dto.ProductDto;
import com.ashura.ashurabackend.Dto.SalesSummaryDto;
import com.ashura.ashurabackend.Repository.BrandRepository;
import com.ashura.ashurabackend.Repository.OrderRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Service.ImageService;
import com.ashura.ashurabackend.Service.OfferService;
import com.ashura.ashurabackend.Service.ProductService;
import com.ashura.ashurabackend.mapper.ProductMapper;
import com.ashura.ashurabackend.models.Brand;
import com.ashura.ashurabackend.models.Orders;
import com.ashura.ashurabackend.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private  OfferService offerService;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ImageService imageService;
    @Autowired
    private OrderRepository orderRepo;

    @PostMapping
    public ProductDto addProduct(@RequestBody ProductDto dto) {

        Product product = ProductMapper.toEntity(dto);

        if (dto.getBrand() != null) {
            Brand brand = brandRepository.findByName(dto.getBrand()).orElse(null);
            product.setBrand(brand);
        }

        Product saved = productRepository.save(product);

        return ProductMapper.toResponseDTO(saved);
    }
    @PostMapping("addproduct")
    public ProductDto addProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam BigDecimal price,
            @RequestParam Long categoryId,
            @RequestParam String brand,
            @RequestParam boolean isTrending,
            @RequestParam boolean isLatest,
            @RequestParam String productType,
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("isPrimary") List<Boolean> isPrimary
    ) {
        return imageService.addProduct(name, description, price, categoryId, brand, isTrending, isLatest, productType, images, isPrimary);
    }
    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }
    @GetMapping("/sales-summary")
    public SalesSummaryDto getSalesSummary() {
        System.out.print("sales summary api hit");
        return productService.getSalesSummary();
    }
    @GetMapping("/customers-summary")
    public CustomerSummaryDto getCustomerSummary() {

        return productService.getCustomerSummary();
    }



    @PostMapping("/apply")
    public ResponseEntity<?> applyOffer(
            @RequestBody OfferRequest request
    ) {

        offerService.applyOffer(request);

        return ResponseEntity.ok(
                "Offer applied successfully"
        );
    }
}
