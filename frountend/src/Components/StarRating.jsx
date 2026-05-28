import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{ fontSize: "22px", marginBottom: "10px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;