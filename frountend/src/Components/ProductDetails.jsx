import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css';
import Header from "./Header";
import Reviews from "./Reviews";
import FavoriteButton from "./FavoriteButton ";
import Footer from "./Footer";
import RecommendedProducts from "./RecommendedProducts";
import axios from "axios";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await fetch(
          `http://localhost:8080/products/${id}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch product"
          );
        }

        const data = await res.json();

        setProduct(data);

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }

  }, [id]);

  const addToCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart/add",
        {
          productId: product.id,
          quantity: 1,
          price: product.hasOffer
            ? product.discountedPrice
            : product.price
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added to cart");

    } catch (err) {

      console.error(err);

      alert("Failed to add to cart");
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (

    <div>

      <Header />

      <div className="container my-5 product-details">

        <div className="row">

          <div className="col-md-6">

            {product.images?.length > 0 && (

              <div className="product-gallery-container">

                <div className="thumbnail-gallery">

                  {product.images.map((img, index) => (

                    <button
                      key={img.id}
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to={index}
                      className="thumbnail-btn"
                    >

                      <img
                        src={`http://localhost:8080${img.imageUrl}`}
                        alt={product.name}
                        className="thumbnail-image"
                      />
                    </button>
                  ))}
                </div>

                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >

                  <div className="carousel-inner">

                    {product.images.map((img, index) => (

                      <div
                        key={img.id}
                        className={`carousel-item ${index === 0
                          ? "active"
                          : ""
                          }`}
                      >

                        <img
                          src={`http://localhost:8080${img.imageUrl}`}
                          className="carousel-image"
                          alt={product.name}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>

                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-6">

            <h1>{product.name}</h1>

            {product.brand && (

              <h5 className="text-secondary">
                Brand: {product.brand}
              </h5>
            )}

            {product.hasOffer ? (

              <div>

                <span
                  className="badge bg-danger mb-2"
                  style={{
                    fontSize: "14px"
                  }}
                >
                  {product.discountPercentage}% OFF
                </span>

                <h5
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    marginBottom: "5px"
                  }}
                >
                  ₹ {product.price}
                </h5>

                <h3 className="text-success">
                  ₹ {product.discountedPrice}
                </h3>
              </div>

            ) : (

              <h3 className="text-success">
                ₹ {product.price}
              </h3>
            )}

            {product.isTrending && (

              <span className="badge bg-danger mb-3">
                Trending
              </span>
            )}

            <p className="description">
              {product.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "30px"
              }}
            >

              <div className="rating-container">

                <div className="stars">
                  {"★".repeat(Math.round(product.rating || 0))}
                  {"☆".repeat(5 - Math.round(product.rating || 0))}
                </div>

                <p className="rating-value">
                  {product.rating || 0}
                </p>

              </div>
            </div>
            <div className="action-buttons">

              <FavoriteButton productId={product.id} />

              <button
                onClick={addToCart}
                className="btn btn-outline-success"
              >
                Add To Cart
              </button>

            </div>
          </div>

          <Reviews productId={product.id} />

        </div>
      </div>

      <RecommendedProducts
        productId={product.id}
      />

      <Footer />
    </div>
  );
};

export default ProductDetails;