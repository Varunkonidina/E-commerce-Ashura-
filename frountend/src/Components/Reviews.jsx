import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviews = ({ productId }) => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;

  const fetchReviews = async (page) => {

    try {

      const res = await axios.get(
        `http://localhost:8080/reviews/${productId}?page=${page}&size=${pageSize}`
      );

      setReviews(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);

    } catch (err) {

      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {

    if (productId) {
      fetchReviews(0);
    }

  }, [productId]);

  const handleSubmit = async () => {

    if (!comment.trim()) {
      alert("Please enter a review");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        `http://localhost:8080/reviews/${productId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComment("");
      setRating(5);
      setHover(0);

      fetchReviews(0);

      alert("Review added successfully");

    } catch (err) {

      console.error("Review submit error:", err);

      if (err.response) {
        alert(err.response.data.message || "Failed to submit review");
      } else {
        alert("Server error");
      }

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="reviews-section">

      <h3>Reviews</h3>

      {reviews.length > 0 ? (

        reviews.map((rev) => (

          <div
            key={rev.id}
            className="review-card"
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >

              <h6 style={{ margin: 0 }}>
                {rev.userName || "Anonymous"}
              </h6>

              <div className="stars">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </div>

            </div>

            <p>{rev.comment}</p>

          </div>
        ))

      ) : (

        <p>No reviews yet</p>
      )}

      <div className="pagination d-flex gap-3 mt-3">

        <button
          className="btn btn-dark"
          disabled={currentPage === 0}
          onClick={() => fetchReviews(currentPage - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-dark"
          disabled={currentPage >= totalPages - 1}
          onClick={() => fetchReviews(currentPage + 1)}
        >
          Next
        </button>

      </div>

      <div className="add-review mt-4">

        <h4>Add Review</h4>

        <div className="star-input">

          {[1, 2, 3, 4, 5].map((star) => (

            <span
              key={star}
              className={
                star <= (hover || rating)
                  ? "star filled"
                  : "star"
              }
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}

        </div>

        <textarea
          className="form-control"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />

        <button
          className="btn btn-dark mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >

          {loading
            ? "Submitting..."
            : "Submit Review"}

        </button>

      </div>
    </div>
  );
};

export default Reviews;