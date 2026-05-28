import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import SidebarFilter from "./SidebarFilter";
import "./SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const query = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/products/search?search=${query}`
        );

        // Normalize the data like ProductsPage
        const normalized = res.data.map((prod) => ({
          ...prod,
          images: prod.Productimage || prod.images,
          brandName: prod.brand?.name,
        }));

        setProducts(normalized);
        setFilteredProducts(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleFilterChange = ({ brands, types, priceRange }) => {
    const filtered = products.filter((prod) => {
      const brandMatch = !brands?.length || brands.includes(prod.brandName);
      const typeMatch = !types?.length || types.includes(prod.productType);
      const priceMatch =
        !priceRange ||
        (prod.price >= priceRange[0] && prod.price <= priceRange[1]);
      return brandMatch && typeMatch && priceMatch;
    });

    setFilteredProducts(filtered);
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (products.length === 0)
    return <p className="text-center mt-5">No products found for "{query}"</p>;

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

export default SearchResults;