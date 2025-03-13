import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchProduct();
  }, [id]);

  const handleAddReview = async () => {
    if (!newReview || rating === 0) {
      alert("Please enter a review and rating!");
      return;
    }

    if (!token) {
      alert("You must be logged in to post a review.");
      return;
    }

    const reviewData = {
      username,
      comment: newReview,
      rating,
      date: new Date().toLocaleDateString(),
    };

    try {
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews([...reviews, reviewData]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate("/products")}>←</button>

      <div className="product-card">
        <img src={product.image || "default.jpg"} alt={product.name} className="product-image" />

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="buy-btn">Buy</button>

          {/* Recipe Section */}
          <div className="recipe-section">
            <h3>Recipe</h3>
            <p>{product.recipe || "No recipe available."}</p>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section">
            <h3>Reviews</h3>

            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-icon"></div>
                  <div className="review-content">
                    <strong>{review.username}</strong> <span>({review.date})</span>
                    <div className="star-rating">{"⭐".repeat(review.rating)}</div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            {/* Add Review Section */}
            {token ? (
              <div className="add-review">
                <h3>Add a Review</h3>
                <textarea
                  placeholder="Write a review..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <div className="rating-input">
                  <span>Rating: </span>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      className={`star ${rating >= num ? "selected" : ""}`}
                      onClick={() => setRating(num)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <button className="submit-review-btn" onClick={handleAddReview}>Submit Review</button>
              </div>
            ) : (
              <p>Please log in to leave a review.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
