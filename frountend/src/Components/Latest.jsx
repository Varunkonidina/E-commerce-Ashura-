import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Latest.css";

const Latest = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchLatest = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/products/latest"
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch latest products"
          );
        }

        const data = await res.json();

        setProducts(data);

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);
      }
    };

    fetchLatest();

  }, []);

  if (loading) {

    return (
      <p className="text-center mt-5">
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

    <div className="latest-container">

      <h2
        className="latest-heading"
      >
        🔥 Latest Products
      </h2>

      <div className="latest-grid">

        {products.map((product) => {

          const primaryImage =
            product.images?.find(
              (img) => img.isPrimary
            ) || product.images?.[0];

          return (

            <div
              key={product.id}
              className="
                card
                shadow-sm
                latest-card
                position-relative
              "
              onClick={() =>
                navigate(`/products/${product.id}`)
              }
            >

              {product.hasOffer && (

                <span
                  className="
                    badge
                    bg-danger
                    position-absolute
                    offer-badge
                  "
                >
                  {product.discountPercentage}% OFF
                </span>
              )}

              <img
                src={`http://localhost:8080${primaryImage?.imageUrl}`}
                className="card-img-top latest-image"
                alt={product.name}
              />

              <div className="card-body text-center">

                <h6 className="card-title">
                  {product.name}
                </h6>

                <p className="text-muted mb-1">
                  {product.brand}
                </p>

                {product.hasOffer ? (

                  <>

                    <p
                      className="old-price"
                    >
                      ₹ {product.price}
                    </p>

                    <h6 className="text-success">
                      ₹ {product.discountedPrice}
                    </h6>
                  </>

                ) : (

                  <h6 className="text-success">
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

export default Latest;