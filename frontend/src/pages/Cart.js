import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import "../styles.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="modern-cart-page">
      <div className="cart-content-box">
        {/* Back Button */}
        <div className="cart-header">
          <button className="circle-back-btn" onClick={() => navigate("/dashboard")}>←</button>
          <h2 className="cart-title">🛒 My Orders</h2>
        </div>

        {/* Cart List */}
        {cart.length === 0 ? (
          <p className="empty-cart-text">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div className="modern-cart-card" key={index}>
              <div className="cart-item-top">
                <div className="item-category">Pastry</div>
                <div className="order-id">#1624{index + 1}</div>
              </div>

              <div className="modern-card-body">
                <div className="item-img" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="meta">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <span className="divider">|</span>
                    <span className="time">22 NOV, 12:30</span>
                    <span className="divider">•</span>
                    <span className="qty">{item.quantity} Items</span> {/* Display quantity */}
                  </div>
                </div>
              </div>

              <div className="modern-cart-actions">
                <button className="rate-btn">Rate</button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;