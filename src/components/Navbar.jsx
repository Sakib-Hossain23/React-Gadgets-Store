import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Navbar.css";

const Navbar = ({
  cart,
  searchQuery,
  setSearchQuery,
  setIsSearchModalOpen,
  setIsRegisterModalOpen,
}) => {
  // State for managing menu and dropdowns
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmartWatchDropdownOpen, setIsSmartWatchDropdownOpen] =
    useState(false);
  const [isSmartWatchSubDropdownOpen, setIsSmartWatchSubDropdownOpen] =
    useState(false);
  const [isCoverDropdownOpen, setIsCoverDropdownOpen] = useState(false);
  const [isCoverSubDropdownOpen, setIsCoverSubDropdownOpen] = useState(false);
  const [isLaptopDesktopDropdownOpen, setIsLaptopDesktopDropdownOpen] =
    useState(false);
  const [isLaptopDesktopSubDropdownOpen, setIsLaptopDesktopSubDropdownOpen] =
    useState(false);
  const [isPowerAccessoriesDropdownOpen, setIsPowerAccessoriesDropdownOpen] =
    useState(false);
  const [
    isPowerAccessoriesSubDropdownOpen,
    setIsPowerAccessoriesSubDropdownOpen,
  ] = useState(false);

  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close all dropdowns and menus
  const closeAllMenus = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsSmartWatchDropdownOpen(false);
    setIsSmartWatchSubDropdownOpen(false);
    setIsCoverDropdownOpen(false);
    setIsCoverSubDropdownOpen(false);
    setIsLaptopDesktopDropdownOpen(false);
    setIsLaptopDesktopSubDropdownOpen(false);
    setIsPowerAccessoriesDropdownOpen(false);
    setIsPowerAccessoriesSubDropdownOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchModalOpen(true);
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setIsSearchModalOpen(true);
    }
  };

  // Handle user icon click
  const handleUserClick = () => {
    setIsRegisterModalOpen(true);
  };

  // Prevent default link behavior
  const preventDefaultLink = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar">
      {/* Top section of the navbar */}
      <div className="navbar-top">
        {/* Logo section */}
        <div className="navbar-logo">
          <h1>
            Gadget<span style={{ color: "orange" }}>s</span>
          </h1>
          <p>Gadgets Store</p>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
          <button onClick={() => setIsSearchModalOpen(true)}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Icons section */}
        <div className="navbar-icons">
          {/* Home button */}
          <div className="navbar-item">
            <Link
              to="/"
              className="footer-button"
              onClick={() => {
                closeAllMenus();
                window.scrollTo(0, 0);
              }}
            >
              <button
                className="btn btn-md-square rounded-circle"
                style={{ backgroundColor: "#7B68B1" }}
              >
                <i className="fas fa-home text-white"></i>
              </button>
            </Link>
          </div>

          {/* Cart button */}
          <div className="navbar-item">
            <button
              className="btn btn-md-square rounded-circle position-relative"
              style={{
                backgroundColor: "#7B68B1",
                marginLeft: "4px",
                color: "#fff",
              }}
              onClick={() => {
                navigate("/cart");
                closeAllMenus();
              }}
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
          </div>

          {/* Order history button */}
          <div className="navbar-item">
            <Link to="/order-history" onClick={closeAllMenus}>
              <button
                className="btn btn-md-square rounded-circle"
                style={{ backgroundColor: "#7B68B1" }}
              >
                <i className="fas fa-clipboard-list text-white"></i>
              </button>
            </Link>
          </div>

          {/* Phone button */}
          <div className="navbar-item">
            <a href="tel:+8801799999999" style={{ textDecoration: "none" }}>
              <button
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#7B68B1",
                  color: "#fff",
                  padding: "-1px 15px",
                  borderRadius: "9px",
                  fontSize: "1rem",
                  gap: "8px",
                  border: "none",
                }}
              >
                <i className="fas fa-phone-alt"></i>
                +8800000000000
              </button>
            </a>
          </div>

          {/* User button */}
          <div className="navbar-item">
            <button
              className="btn btn-md-square rounded-circle"
              style={{ backgroundColor: "#7B68B1", marginRight: "8px" }}
              onClick={() => {
                handleUserClick();
                closeAllMenus();
              }}
            >
              <i className="fas fa-user-circle text-white"></i>
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="menu-button" onClick={toggleMenu}>
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Bottom section of the navbar (dropdowns) */}
      <div className={`navbar-bottom ${isOpen ? "menu-open" : ""}`}>
        <ul>
          {/* Phones & Tablets Dropdown */}
          <li
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className="dropdown"
          >
            <a href="#phones" onMouseEnter={preventDefaultLink}>
              Phones & Tablets <i className="fas fa-caret-down"></i>
            </a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onMouseEnter={() => setIsSmartWatchSubDropdownOpen(true)}
                  onMouseLeave={() => setIsSmartWatchSubDropdownOpen(false)}
                >
                  <a href="#smartphones">
                    Smartphones <i className="fas fa-caret-right"></i>
                  </a>
                  {isSmartWatchSubDropdownOpen && (
                    <ul className="sub-dropdown-menu">
                      <li>
                        <a href="#iphone" onClick={closeAllMenus}>
                          iPhone
                        </a>
                      </li>
                      <li>
                        <a href="#samsung" onClick={closeAllMenus}>
                          Samsung
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#tablets" onClick={closeAllMenus}>
                    Tablets
                  </a>
                </li>
                <li>
                  <a href="#accessories" onClick={closeAllMenus}>
                    Accessories
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Laptop & Desktop Dropdown */}
          <li
            onMouseEnter={() => setIsLaptopDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsLaptopDesktopDropdownOpen(false)}
            className="dropdown"
          >
            <a href="#laptop-desktop" onMouseEnter={preventDefaultLink}>
              Laptop & Desktop <i className="fas fa-caret-down"></i>
            </a>
            {isLaptopDesktopDropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onMouseEnter={() => setIsLaptopDesktopSubDropdownOpen(true)}
                  onMouseLeave={() => setIsLaptopDesktopSubDropdownOpen(false)}
                >
                  <a href="#laptops">
                    Laptops <i className="fas fa-caret-right"></i>
                  </a>
                  {isLaptopDesktopSubDropdownOpen && (
                    <ul className="sub-dropdown-menu">
                      <li>
                        <a href="#macbook" onClick={closeAllMenus}>
                          MacBook
                        </a>
                      </li>
                      <li>
                        <a href="#windows-laptops" onClick={closeAllMenus}>
                          Windows Laptops
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#desktops" onClick={closeAllMenus}>
                    Desktops
                  </a>
                </li>
                <li>
                  <a href="#monitors" onClick={closeAllMenus}>
                    Monitors
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Smart Watch Dropdown */}
          <li
            onMouseEnter={() => setIsSmartWatchDropdownOpen(true)}
            onMouseLeave={() => setIsSmartWatchDropdownOpen(false)}
            className="dropdown"
          >
            <a href="#smartwatch" onMouseEnter={preventDefaultLink}>
              Smart Watch <i className="fas fa-caret-down"></i>
            </a>
            {isSmartWatchDropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onMouseEnter={() => setIsSmartWatchSubDropdownOpen(true)}
                  onMouseLeave={() => setIsSmartWatchSubDropdownOpen(false)}
                >
                  <a href="#smartwatches">
                    Smart Watches <i className="fas fa-caret-right"></i>
                  </a>
                  {isSmartWatchSubDropdownOpen && (
                    <ul className="sub-dropdown-menu">
                      <li>
                        <a href="#apple" onClick={closeAllMenus}>
                          Apple Watch
                        </a>
                      </li>
                      <li>
                        <a href="#samsung" onClick={closeAllMenus}>
                          Samsung Galaxy Watch
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#fitness" onClick={closeAllMenus}>
                    Fitness Bands
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Cover & Glass Dropdown */}
          <li
            onMouseEnter={() => setIsCoverDropdownOpen(true)}
            onMouseLeave={() => setIsCoverDropdownOpen(false)}
            className="dropdown"
          >
            <a href="#covers" onMouseEnter={preventDefaultLink}>
              Cover & Glass <i className="fas fa-caret-down"></i>
            </a>
            {isCoverDropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onMouseEnter={() => setIsCoverSubDropdownOpen(true)}
                  onMouseLeave={() => setIsCoverSubDropdownOpen(false)}
                >
                  <a href="#cases">
                    Phone Cases <i className="fas fa-caret-right"></i>
                  </a>
                  {isCoverSubDropdownOpen && (
                    <ul className="sub-dropdown-menu">
                      <li>
                        <a href="#iphone-cases" onClick={closeAllMenus}>
                          iPhone Cases
                        </a>
                      </li>
                      <li>
                        <a href="#samsung-cases" onClick={closeAllMenus}>
                          Samsung Cases
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#screen-protectors" onClick={closeAllMenus}>
                    Screen Protectors
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Power & Accessories Dropdown */}
          <li
            onMouseEnter={() => setIsPowerAccessoriesDropdownOpen(true)}
            onMouseLeave={() => setIsPowerAccessoriesDropdownOpen(false)}
            className="dropdown"
          >
            <a href="#power-accessories" onMouseEnter={preventDefaultLink}>
              Power & Accessories <i className="fas fa-caret-down"></i>
            </a>
            {isPowerAccessoriesDropdownOpen && (
              <ul className="dropdown-menu">
                <li
                  onMouseEnter={() =>
                    setIsPowerAccessoriesSubDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    setIsPowerAccessoriesSubDropdownOpen(false)
                  }
                >
                  <a href="#chargers">
                    Chargers <i className="fas fa-caret-right"></i>
                  </a>
                  {isPowerAccessoriesSubDropdownOpen && (
                    <ul className="sub-dropdown-menu">
                      <li>
                        <a href="#usb-c-chargers" onClick={closeAllMenus}>
                          USB-C Chargers
                        </a>
                      </li>
                      <li>
                        <a href="#wireless-chargers" onClick={closeAllMenus}>
                          Wireless Chargers
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#batteries" onClick={closeAllMenus}>
                    Batteries
                  </a>
                </li>
                <li>
                  <a href="#cables" onClick={closeAllMenus}>
                    Cables
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Pre-Owned link */}
          <li>
            <a href="#pre-owned" onClick={closeAllMenus}>
              Pre-Owned
            </a>
          </li>

          {/* Blog link */}
          <li>
            <Link to="/blog" onClick={closeAllMenus}>
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
