import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ productId }) => {
  const [isFav, setIsFav] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const favorites = res.data || [];
        const exists = favorites.some(
          (fav) => fav.product.id === productId
        );
        setIsFav(exists);
      })
      .catch((err) => console.error(err));
  }, [productId, token]);

  const toggleFavorite = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }
    console.log({token});
    try {
      await axios.post(
        `http://localhost:8080/favorites/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        
      );

      setIsFav((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "22px",
      }}
    >
      {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;