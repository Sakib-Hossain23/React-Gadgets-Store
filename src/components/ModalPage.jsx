import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/ModalPage.css";

const colorMap = {
  // Titanium Shades
  "Desert Titanium": "#D2B48C",
  "Natural Titanium": "#B0A999",
  "White Titanium": "#FFFFFF",
  "Black Titanium": "#1C1C1C",
  "Gray Titanium": "#A0A0A0",
  "Blue Titanium": "#4A90E2",
  "Green Titanium": "#3A6F41",
  "Red Titanium": "#B22222",
  "Purple Titanium": "#6A0DAD",
  "Bronze Titanium": "#CD7F32",
  "Silver Titanium": "#C0C0C0",
  "Gold Titanium": "#FFD700",
  "Rose Gold Titanium": "#B76E79",
  "Copper Titanium": "#B87333",
  "Dark Gray Titanium": "#505050",
  "Light Gray Titanium": "#D3D3D3",
  "Charcoal Titanium": "#36454F",
  "Steel Blue Titanium": "#4682B4",
  "Midnight Blue Titanium": "#191970",
  "Olive Titanium": "#808000",
  "Teal Titanium": "#008080",
  "Cyan Titanium": "#00FFFF",
  "Magenta Titanium": "#FF00FF",
  "Lavender Titanium": "#E6E6FA",
  "Beige Titanium": "#F5F5DC",
  "Ivory Titanium": "#FFFFF0",
  "Mustard Titanium": "#FFDB58",
  "Sunset Orange Titanium": "#FF4500",
  "Deep Sea Blue Titanium": "#003366",

  // Standard Colors
  Red: "#FF0000",
  Green: "#008000",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  Purple: "#800080",
  Brown: "#A52A2A",
  Gray: "#808080",
  Black: "#000000",
  White: "#FFFFFF",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Beige: "#F5F5DC",
  Maroon: "#800000",
  Navy: "#000080",
  Olive: "#808000",
  Teal: "#008080",
  Lime: "#00FF00",
  Indigo: "#4B0082",
  Violet: "#EE82EE",
  Turquoise: "#40E0D0",
  Coral: "#FF7F50",
  Salmon: "#FA8072",
  Chocolate: "#D2691E",
  Plum: "#DDA0DD",
  Crimson: "#DC143C",
  "Sky Blue": "#87CEEB",
  "Royal Blue": "#4169E1",
  "Forest Green": "#228B22",
  "Dark Green": "#006400",
  "Deep Pink": "#FF1493",
  "Hot Pink": "#FF69B4",
  "Dodger Blue": "#1E90FF",
  Tomato: "#FF6347",
  "Slate Gray": "#708090",
  "Light Gray": "#D3D3D3",
  "Dark Gray": "#A9A9A9",

  // Cream Color
  Cream: "#FFFDD0",

  Lavender: "#E6E6FA",
  "Phantom Gray": "#383B3E",
  "Titan Black": "#1C1C1C",
  "Eternal Green": "#1F3D2B",
  "Ceramic White": "#F5F5F1",
  "Flora Green": "#5FA777",
};

const ModalPage = ({ addToCart }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found. Please go back.</p>;
  }

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(product.price[0]); // Default to first price
  const [oldPrice, setOldPrice] = useState(product.oldPrice[0]); // Default to first old price
  const [activeTab, setActiveTab] = useState("specifications"); // Default active tab

  // Update selected image based on the selected color
  useEffect(() => {
    if (selectedColor) {
      const colorIndex = product.colors.indexOf(selectedColor);
      if (colorIndex !== -1 && product.images[colorIndex]) {
        setSelectedImage(product.images[colorIndex]);
      }
    }
  }, [selectedColor, product.images, product.colors]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (type) => {
    if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increment") {
      setQuantity(quantity + 1);
    }
  };

  const handleStorageClick = (storage, index) => {
    setSelectedStorage(storage);
    setCurrentPrice(product.price[index]); // Update price based on storage selected
    setOldPrice(product.oldPrice[index]); // Update old price based on storage selected
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) {
      setAlertMessage("Please select variations");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000); // Alert stays for 4 seconds
      return;
    }

    // Add the selected variations to the cart
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedStorage,
      image: selectedImage,
      price: currentPrice, // Add the selected price to the cart
      oldPrice: oldPrice, // Add the selected old price to the cart
    });
    setAlertMessage("Successfully added product");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 4000); // Alert stays for 4 seconds
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedStorage) {
      setAlertMessage("Please select variations");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 4000); // Alert stays for 4 seconds
      return;
    }

    // Add the selected variations to the cart and navigate to the cart page
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedStorage,
      image: selectedImage,
      price: currentPrice, // Add the selected price to the cart
      oldPrice: oldPrice, // Add the selected old price to the cart
    });

    navigate("/cart", {
      state: {
        product: {
          ...product,
          quantity,
          selectedColor,
          selectedStorage,
          image: selectedImage,
          price: currentPrice, // Add the selected price to the cart
          oldPrice: oldPrice, // Add the selected old price to the cart
        },
      },
    });
  };
  // Handle Tab Click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="modal-page-container">
      <div className="content-wrapper">
        {/* Left Section: Product Image */}
        <div className="left-section">
          <img src={selectedImage} alt="Product" className="main-image" />
          <div className="thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Thumbnail"
                className={selectedImage === image ? "selected" : ""}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="right-section">
          <h2 style={{ textAlign: "start" }} className="color">
            {product.name}
          </h2>
          <p
            className="price color"
            style={{ marginTop: "16px", marginBottom: "-6px" }}
          >
            {currentPrice} <span className="old-price color">{oldPrice}</span>
          </p>
          <p className="color">Status: In Stock</p>

          {/* Colors Section */}
          <div className="options">
            <p className="color">
              <strong>Colors ({product.colors.length}):</strong>
            </p>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`option-button ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="color-circle"
                    style={{
                      backgroundColor: colorMap[color] || color.toLowerCase(),
                    }}
                  ></span>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Storage Section */}
          <div className="options">
            <p className="color">
              <strong>Storage:</strong>
            </p>
            {product.storages.map((storage, index) => (
              <button
                key={storage}
                className={`option-button ${
                  selectedStorage === storage ? "selected" : ""
                }`}
                onClick={() => handleStorageClick(storage, index)}
              >
                {storage}
              </button>
            ))}
          </div>

          {/* Quantity Controls */}
          <div
            style={{
              marginTop: "12px",
              marginBottom: "8px",
              marginLeft: "8px",
            }}
            className="quantity-controls"
          >
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="quantity-button"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="quantity-button"
            >
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <button className="buy-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-button buy-now-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* Tabbed Section */}
        {/* Tabbed Section */}
        <div className="tabs-container mt-5 w-full">
          <div className="tabs flex justify-around border-b pb-2">
            {["specifications", "description", "warranty"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 font-semibold capitalize tab-button ${
                  activeTab === tab ? "active" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tab-content p-4">
            {activeTab === "specifications" && (
              <div className="specifications-table">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Specification
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border border-gray-300">
                        <strong>Screen Size:</strong>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {product.specifications.screenSize}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-300">
                        <strong>Processor:</strong>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {product.specifications.processor}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-300">
                        <strong>RAM:</strong>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {product.specifications.ram}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-300">
                        <strong>Battery:</strong>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {product.specifications.battery}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-300">
                        <strong>Camera:</strong>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {product.specifications.camera}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "description" && (
              <p style={{ color: "#4b5563" }} className="text-gray-700">
                {product.description}
              </p>
            )}
            {activeTab === "warranty" && (
              <p style={{ color: "#4b5563" }} className="text-gray-700">
                {product.warranty}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Success or Error Alert */}
      {alertVisible && (
        <div
          className={`custom-alert ${
            alertMessage === "Successfully added product"
              ? "success-alert"
              : "error-alert"
          }`}
        >
          <img
            className="alert-image"
            src={
              alertMessage === "Successfully added product"
                ? "../img/right.png"
                : "../img/red alert.png"
            }
            alt="Alert Icon"
          />
          <div className="alert-message">{alertMessage}</div>
        </div>
      )}
    </div>
  );
};

export default ModalPage;
