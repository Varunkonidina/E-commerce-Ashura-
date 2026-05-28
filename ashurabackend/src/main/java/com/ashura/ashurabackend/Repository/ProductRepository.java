package com.ashura.ashurabackend.Repository;

import com.ashura.ashurabackend.models.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByIsTrendingTrue();

    List<Product> findByIsLatestTrue();

    List<Product> findByBrandId(Long brandId);

    @Query("""
           SELECT DISTINCT p.productType
           FROM Product p
           WHERE p.categoryId = :categoryId
           """)
    List<String> findTypesByCategory(Long categoryId);

    @Query("""
           SELECT p
           FROM Product p
           WHERE p.categoryId = :categoryId
           AND UPPER(p.productType) = UPPER(:type)
           """)
    List<Product> findByCategoryAndType(
            @Param("categoryId") Long categoryId,
            @Param("type") String type
    );

    @Query("""
           SELECT p
           FROM Product p
           WHERE p.categoryId = :categoryId
           AND p.id <> :productId
           ORDER BY p.averageRating DESC
           """)
    List<Product> findTopProductsByCategory(
            Long categoryId,
            Long productId
    );

    @Query("""
           SELECT p
           FROM Product p
           WHERE
           (:search IS NULL OR LOWER(p.name)
           LIKE LOWER(CONCAT('%', :search, '%')))
           AND (:minPrice IS NULL
           OR p.price >= :minPrice)
           AND (:maxPrice IS NULL
           OR p.price <= :maxPrice)
           """)
    List<Product> findProducts(
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );

    List<Product> findTop5ByNameContainingIgnoreCase(
            String name
    );

    @Query("""
           SELECT DISTINCT p
           FROM Product p
           LEFT JOIN FETCH p.brand
           LEFT JOIN FETCH p.productimage
           """)
    List<Product> findAllWithDetails();

    List<Product> findByCategoryIdAndProductType(
            Long categoryId,
            String productType
    );

    List<Product> findByCategoryId(
            Long categoryId
    );

    List<Product> findByProductType(
            String productType
    );
}