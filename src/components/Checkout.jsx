import React, { useState } from "react";
import "../assets/styles/Checkout.css"; // Importing styles
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import OrderHistory from "./OrderHistory"; // Import OrderHistory Component

// Product Item Component
const ProductItem = ({ product, quantity, handleIncrease, handleDecrease }) => {
  return (
    <div className="item">
      <img src={product.image} alt={product.name} />
      <div>
        <p>
          <strong>{product.name}</strong>
          <br />
          <span style={{ color: "orange" }}>
            {product.selectedColor} | {product.selectedStorage}
          </span>
          <br />
          <span style={{ color: "black" }}>Quantity: {quantity}</span>
        </p>
      </div>

      <p>{`BDT ${product.price}`}</p>
    </div>
  );
};

// Billing Details Form Component
const BillingForm = ({
  billingDetails,
  handleInputChange,
  isOnlinePayment,
}) => {
  return (
    <div className="billing-details">
      <label htmlFor="full-name">
        Full Name <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="full-name"
        name="fullName"
        value={billingDetails.fullName}
        onChange={handleInputChange}
        placeholder="Enter your full name"
      />
      {isOnlinePayment && (
        <>
          <label htmlFor="email">
            Email <span style={{ color: "#ff5733" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={billingDetails.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </>
      )}
      <label htmlFor="phone-number">
        Phone Number <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="phone-number"
        name="phoneNumber"
        value={billingDetails.phoneNumber}
        onChange={handleInputChange}
        placeholder="Enter your phone number"
      />
      <label htmlFor="address">
        Full Address <span style={{ color: "#ff5733" }}>*</span>
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={billingDetails.address}
        onChange={handleInputChange}
        placeholder="Enter your address"
      />
    </div>
  );
};

// Payment Method Component
const PaymentMethod = ({ isOnlinePayment, handlePaymentMethodChange }) => {
  return (
    <div className="payment-method">
      <button
        className={isOnlinePayment ? "" : "active"}
        onClick={() => handlePaymentMethodChange("cod")}
      >
        Cash on Delivery
      </button>
      <button
        className={isOnlinePayment ? "active" : ""}
        onClick={() => handlePaymentMethodChange("online")}
      >
        Online Payment
      </button>
    </div>
  );
};

// Checkout Component
const Checkout = ({ cart, updateCart, setOrderHistory }) => {
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price) || 0; // Ensure price is a number
      return total + price * product.quantity;
    }, 0);
  };

  const deliveryCharge = 0; // Example delivery charge
  const totalPrice = calculateSubtotal() + deliveryCharge;

  const handleIncrease = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleDecrease = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handlePaymentMethodChange = (method) => {
    setIsOnlinePayment(method === "online");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = () => {
    const newOrder = {
      id: `#${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString(),
      products: cart,
      total: totalPrice,
      status: isOnlinePayment ? "Pending Payment" : "Cash on Delivery",
      billingDetails,
    };

    setOrderHistory((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the history

    alert(
      isOnlinePayment
        ? "Proceeding to online payment..."
        : "Order confirmed for Cash on Delivery!"
    );

    // Redirect to order history page
    navigate("/order-history");
  };

  return (
    <div className="container">
      {/* Left Section */}
      <div className="leftt">
        <div className="alert">
          For any order-related questions, contact customer service at -{" "}
          <strong>
            <span style={{ color: "#ff7601" }}>09999999999</span>
          </strong>
        </div>

        <h3>Payment Method</h3>
        <PaymentMethod
          isOnlinePayment={isOnlinePayment}
          handlePaymentMethodChange={handlePaymentMethodChange}
        />

        <h3>Billing Details</h3>
        <BillingForm
          billingDetails={billingDetails}
          handleInputChange={handleInputChange}
          isOnlinePayment={isOnlinePayment}
        />

        <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I have read and agree to the
            <a href="#">Terms and Conditions</a> and
            <a href="#">Privacy Policy</a>
          </label>
        </div>
      </div>

      {/* Right Section */}
      <div className="rightt">
        <h3>Your Order</h3>
        <div className="order-summary">
          {cart.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={product.quantity}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          ))}
        </div>

        {/* Coupon Section */}
        <div className="coupon-section">
          <div className="coupon-input-container">
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter Coupon Code"
            />
            <button className="coupon-button">Apply</button>
          </div>
          <button className="check-status-button">Check Status</button>
        </div>

        {/* Summary */}
        <div className="summary">
          <p>
            Subtotal: <strong>BDT {calculateSubtotal()}</strong>
          </p>
          <p>
            Delivery Charge:{" "}
            <span style={{ color: "orange" }}>BDT {deliveryCharge}</span>
          </p>
          <p className="total">
            Total: <strong>BDT {totalPrice}</strong>
          </p>
        </div>

        <button className="confirm-button" onClick={handleSubmitOrder}>
          {isOnlinePayment ? "Proceed To Payment" : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
