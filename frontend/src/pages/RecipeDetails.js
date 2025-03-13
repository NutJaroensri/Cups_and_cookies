import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

function RecipeDetails() {
  const { id } = useParams(); // Get Recipe ID from URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchRecipe();
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
      await axios.post(`http://localhost:5000/api/recipes/${id}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews([...reviews, reviewData]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={() => navigate("/recipes")}>←</button>

      <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-info">
          <h2>{recipe.title}</h2>
          <p className="description">{recipe.description}</p>

          <h3>Ingredients</h3>
          <ul>
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients.map((item, index) => <li key={index}>{item.trim()}</li>)
              : <li>No ingredients available.</li>}
          </ul>

          <h3>Instructions</h3>
          <ol>
            {Array.isArray(recipe.steps)
              ? recipe.steps.map((step, index) => <li key={index}>{step.trim()}</li>)
              : <li>No instructions available.</li>}
          </ol>

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
}

export default RecipeDetails;
