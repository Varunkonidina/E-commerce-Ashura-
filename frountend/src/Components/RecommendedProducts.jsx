import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Trending.css';

const RecommendedProducts = ({ productId }) => {

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchRecommended = async () => {

      try {

        const res = await fetch(
          `http://localhost:8080/products/${productId}/recommendations`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch recommended products"
          );
        }

        const data = await res.json();

        setRecommended(data);

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);
      }
    };

    fetchRecommended();

  }, [productId]);

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
    <div className="container mt-5">

      <h2
        className="text-center"
        style={{ margin: "3em" }}
      >
        Recommended Products
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-5">

        {recommended.map((product) => {

          const primaryImage =
            product.images?.find(
              (img) => img.isPrimary
            ) || product.images?.[0];

          if (!primaryImage) return null;

          return (

            <div
              key={product.id}
              className="card shadow-sm position-relative"
              style={{
                width: "220px",
                height: "50vh",
                cursor: "pointer"
              }}
              onClick={() =>
                navigate(`/products/${product.id}`)
              }
            >

              {product.hasOffer && (

                <span
                  className="badge bg-danger position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                    fontSize: "0.8rem",
                    padding: "8px"
                  }}
                >
                  {product.discountPercentage}% OFF
                </span>
              )}

              <img
                src={`http://localhost:8080${primaryImage.imageUrl}`}
                className="card-img-top"
                alt={product.name}
                style={{
                  height: "70%",
                  objectFit: "cover"
                }}
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
                      className="text-muted mb-1"
                      style={{
                        textDecoration: "line-through",
                        fontSize: "0.9rem"
                      }}
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

export default RecommendedProducts;