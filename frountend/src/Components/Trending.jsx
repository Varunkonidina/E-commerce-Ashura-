import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trending.css";

const Trending = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchTrending = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/products/trending"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch trending products");
        }

        const data = await res.json();

        console.log(data);

        setProducts(data);

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);
      }
    };

    fetchTrending();

  }, []);

  if (loading) {
    return (
      <p className="text-center mt-4">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-danger text-center mt-4">
        {error}
      </p>
    );
  }

  return (

    <div className="trending-container">

      <h2 className="trending-title">
        🔥 Trending Products
      </h2>

      <div className="trending-grid">

        {products.map((product) => {

          const primaryImage =
            product.images?.find((img) => img.isPrimary) ||
            product.images?.[0];

          return (

            <div
              key={product.id}
              className="trending-card"
              onClick={() =>
                navigate(`/products/${product.id}`)
              }
            >

              {product.hasOffer === true && (

                <div className="offer-badge">
                  {product.discountPercentage}% OFF
                </div>
              )}

              <img
                src={`http://localhost:8080${primaryImage?.imageUrl}`}
                className="trending-image"
                alt={product.name}
              />

              <div className="trending-card-body">

                <h6 className="trending-product-name">
                  {product.name}
                </h6>

                <p className="trending-brand">
                  {product.brand}
                </p>

                {product.hasOffer === true ? (

                  <div>

                    <p className="old-price">
                      ₹ {product.price}
                    </p>

                    <h6 className="offer-price">
                      ₹ {product.discountedPrice}
                    </h6>

                  </div>

                ) : (

                  <h6 className="normal-price">
                    ₹ {product.price}
                  </h6>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;