package com.ashura.ashurabackend.Controller;

import com.ashura.ashurabackend.Dto.ProductDto;
import com.ashura.ashurabackend.Repository.BrandRepository;
import com.ashura.ashurabackend.Service.ProductService;
import com.ashura.ashurabackend.mapper.ProductMapper;
import com.ashura.ashurabackend.models.Brand;
import com.ashura.ashurabackend.models.Category;
import com.ashura.ashurabackend.models.Favorite;
import com.ashura.ashurabackend.models.Product;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
//@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;
    private final BrandRepository brandRepository;

    public ProductController(ProductService service, BrandRepository brandRepository) {
        this.service = service;
        this.brandRepository=brandRepository;
    }
    @GetMapping
    public List<ProductDto> getAllProducts() {
        return service.findAll()
                .stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/trending")
    public List<ProductDto> getTrendingProducts() {
        return service.getTrendingProducts()
                .stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/latest")
    public  List<ProductDto> getLatestProducts()
    {
        Sort sort=Sort.by("id").descending();
        return service.getLatestProducts()
                .stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return ProductMapper.toResponseDTO(service.getProductById(id));
    }
    @GetMapping("/brand/{id}")
    public List<Product> getProductsByBrand(@PathVariable Long id) {
        return service.getProductsByBrand(id);
    }
    @GetMapping("/brands")
    public List<Brand> getAllBrands(){

        return brandRepository.findAll();
    }
    @GetMapping("/types-by-category/{categoryId}")
    public List<String> getTypesByCategory(@PathVariable Long categoryId){
        return service.getTypesByCategory(categoryId);
    }
    @GetMapping("/by-category-and-type")
    public List<ProductDto> getProductsByCategoryAndType(
            @RequestParam Long categoryId,
            @RequestParam String type) {

        return service
                .getProductsByCategoryAndType(categoryId, type)
                .stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/categories")
    public List<Category> getAll()
    {
       return service.getAll();
    }
    @GetMapping("/{productId}/recommendations")
    public List<Product> getRecommendations(@PathVariable Long productId) {
        return service.getRecommendedProducts(productId);
    }
    @GetMapping("/search")
    public List<Product> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        return service.getProducts(search, minPrice, maxPrice);
    }
    @GetMapping("/search-suggestions")
    public List<String> getSuggestions(@RequestParam String query) {
        return service.getSuggestions(query);
    }
    @GetMapping("/product-types")
    public List<String> getProductTypes() {
        return service.getProductTypes();
    }

}