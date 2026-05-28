import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import SidebarFilter from "./SidebarFilter";
import "./ProductsPage.css";

const ProductsPage = () => {
  const { categoryId, type } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/products/by-category-and-type",
          { params: { categoryId, type } }
        );

        const normalized = res.data.map((prod) => ({
          ...prod,
          images: prod.Productimage || prod.images,
          brandName: prod.brand?.name,
        }));

        setProducts(normalized);
        setFilteredProducts(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, type]);

  const handleFilterChange = ({ brands, types, priceRange }) => {
    const filtered = products.filter((prod) => {
      const brandMatch = brands.length === 0 || brands.includes(prod.brandName);
      const typeMatch = types.length === 0 || types.includes(prod.productType);
      const priceMatch =
        prod.price >= priceRange[0] && prod.price <= priceRange[1];
      return brandMatch && typeMatch && priceMatch;
    });
    setFilteredProducts(filtered);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  if (products.length === 0) return <p className="text-center mt-4">No products found</p>;

  return (
    <div>
      <Header />
      <div className="container mt-5 d-flex gap-4">
        <SidebarFilter onFilterChange={handleFilterChange} />
        <div className="products-grid flex-grow-1 d-flex flex-wrap justify-content-center gap-4">
          {filteredProducts.map((prod) => {
            const primaryImage =
              prod.images?.find((img) => img.isPrimary) || prod.images?.[0];

            return (
              <div
                key={prod.id}
                className="card shadow-sm"
                style={{ width: "220px", height: "50vh", cursor: "pointer" }}
                onClick={() => navigate(`/products/${prod.id}`)}
              >
                <img
                  src={`http://localhost:8080${primaryImage?.imageUrl}`}
                  className="card-img-top"
                  alt={prod.name}
                  style={{ height: "70%", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{prod.name}</h6>
                  <p className="text-muted mb-1">{prod.brandName}</p>
                  <h6 className="text-success">₹ {prod.price}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;