import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../styles.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // Add the product to the cart
    alert(`${product.name} has been added to the cart!`); // Show an alert
  };

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
      username: localStorage.getItem("username"), // Use username from localStorage
      comment: newReview,
      rating,
      date: new Date().toLocaleDateString(),
    };

    try {
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the reviews state with the new review
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
          <button className="buy-btn" onClick={handleAddToCart}>Add to Cart</button>
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

      {/* Reviews Section */}
     
    </div>
  );
};

export default ProductDetails;