package com.ashura.ashurabackend.Service;

import com.ashura.ashurabackend.Dto.CustomerSummaryDto;
import com.ashura.ashurabackend.Dto.SalesSummaryDto;
import com.ashura.ashurabackend.Repository.CategoryRepository;
import com.ashura.ashurabackend.Repository.OrderRepository;
import com.ashura.ashurabackend.Repository.ProductRepository;
import com.ashura.ashurabackend.Repository.UserRepository;
import com.ashura.ashurabackend.models.Category;
import com.ashura.ashurabackend.models.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    private final CategoryRepository categoryRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    public ProductService(
            ProductRepository repository,
            CategoryRepository categoryRepository
    ) {

        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getTrendingProducts() {

        return repository.findByIsTrendingTrue();
    }

    public List<Product> getLatestProducts() {

        return repository.findByIsLatestTrue();
    }

    public Product getProductById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with ID: " + id
                        )
                );
    }

    public List<Product> getProductsByBrand(Long brandId) {

        return repository.findByBrandId(brandId);
    }

    public List<String> getTypesByCategory(Long categoryId) {

        return repository.findTypesByCategory(categoryId);
    }

    public List<Product> getProductsByCategoryAndType(
            Long categoryId,
            String type
    ) {

        return repository.findByCategoryAndType(
                categoryId,
                type
        );
    }

    public List<Category> getAll() {

        return categoryRepository.findAll();
    }

    public List<Product> getRecommendedProducts(Long productId) {

        Product product = repository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        return repository.findTopProductsByCategory(
                        product.getCategoryId(),
                        productId
                )
                .stream()
                .limit(8)
                .toList();
    }

    public List<Product> getProducts(
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice
    ) {

        return repository.findProducts(
                search,
                minPrice,
                maxPrice
        );
    }

    public List<String> getSuggestions(String query) {

        return repository
                .findTop5ByNameContainingIgnoreCase(query)
                .stream()
                .map(Product::getName)
                .toList();
    }

    public List<String> getProductTypes() {

        return repository.findAll()
                .stream()
                .map(Product::getProductType)
                .distinct()
                .toList();
    }

    public List<Product> findAll() {

        return repository.findAllWithDetails();
    }

    public SalesSummaryDto getSalesSummary() {

        SalesSummaryDto dto = new SalesSummaryDto();

        Double revenue =
                orderRepository.getTotalRevenue();

        Integer totalSold =
                orderRepository.getTotalProductsSold();

        List<String> products =
                orderRepository.getMostSoldProducts();

        String topProduct =
                products.isEmpty()
                        ? "No Sales"
                        : products.get(0);

        dto.setRevenue(
                revenue != null ? revenue : 0
        );

        dto.setTotalSold(
                totalSold != null ? totalSold : 0
        );

        dto.setTopProduct(topProduct);

        return dto;
    }
    public CustomerSummaryDto getCustomerSummary() {

        CustomerSummaryDto dto =
                new CustomerSummaryDto();

        dto.setTotalCustomers(
                userRepository.getTotalCustomers()
        );

        dto.setVipCustomers(
                userRepository.getVipCustomers()
        );

        dto.setRegularCustomers(
                userRepository.getRegularCustomers()
        );

        dto.setNewCustomers(
                userRepository.getNewCustomers()
        );

        return dto;
    }
}