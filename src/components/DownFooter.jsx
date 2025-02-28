import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/DownFooter.css";

const DownFooter = ({ cart, setIsRegisterModalOpen }) => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    setIsRegisterModalOpen(true); // Open RegisterModal when user icon is clicked
  };

  return (
    <footer>
      {/* Home Button */}
      <Link
        to="/"
        className="footer-button"
        onClick={() => window.scrollTo(0, 0)}
      >
        <button
          className="btn btn-md-square rounded-circle"
          style={{ backgroundColor: "#7B68B1" }}
        >
          <i className="fas fa-home text-white"></i>
        </button>
      </Link>

      {/* Cart Button */}
      <button
        className="btn btn-md-square rounded-circle position-relative"
        style={{
          backgroundColor: "#7B68B1",
          marginLeft: "4px",
          color: "#fff",
        }}
        onClick={() => navigate("/cart")}
      >
        <i className="fas fa-shopping-cart"></i>
        <span
          className="badge bg-danger position-absolute"
          style={{
            top: "-9px",
            right: "-9px",
            fontSize: "0.6rem",
            padding: "0.2rem 0.4rem",
            minWidth: "1.5rem",
            textAlign: "center",
          }}
        >
          {cart.length}
        </span>
      </button>

      <div className="navbar-item">
        <Link to="/order-history">
          <button
            className="btn btn-md-square rounded-circle"
            style={{ backgroundColor: "#7B68B1" }}
          >
            <i className="fas fa-clipboard-list text-white"></i>
          </button>
        </Link>
      </div>

      {/* User Icon Button */}
      <button
        className="btn btn-md-square rounded-circle"
        style={{ backgroundColor: "#7B68B1" }}
        onClick={handleUserIconClick} // Open RegisterModal on click
      >
        <i className="fas fa-user-circle text-white"></i>
      </button>
    </footer>
  );
};

export default DownFooter;
