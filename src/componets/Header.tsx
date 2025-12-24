import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/sections/header.css";
import {
  Home,
  Layers,
  Box,
  PlaySquare,
  Tag,
  HelpCircle,
  Info,
  Phone,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const toggleMobileServices = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  // Handle section navigation
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on homepage - just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On different page - navigate home first
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    // Close sidebar if open
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img
              src="/images/RDLogo.png"
              alt="RenderDac Logo"
              className="header-logo-img"
              width="32"
              height="32"
            />
            <span>Studios</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              {/* Changed button to span to prevent white background */}
              <span className="nav-link" style={{ cursor: "pointer" }}>
                Services
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="dropdown-icon"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              {/* Services Dropdown */}
              <div
                className={`services-dropdown ${
                  isServicesOpen ? "dropdown-open" : ""
                }`}
              >
                <a href="#service-1" className="dropdown-item">
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">
                      3D Product Animation
                    </span>
                  </div>
                </a>

                <a href="#service-2" className="dropdown-item">
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">
                      3D Product Rendering
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <a
              href="#pricing"
              className="nav-link"
              onClick={(e) => handleSectionClick("pricing", e)}
            >
              Pricing
            </a>

            <a
              href="#faq"
              className="nav-link"
              onClick={(e) => handleSectionClick("faq", e)}
            >
              FAQ
            </a>

            <Link to="/about" className="nav-link">
              About
            </Link>

            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Link to="/contact" className="header-cta">
            Get a quote
          </Link>
        </div>
      </header>

      {/* Mobile Menu Toggle Button */}
      <button
        className={`mobile-menu-toggle ${
          isSidebarOpen ? "menu-toggle-active" : ""
        }`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={isSidebarOpen}
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
            <Home size={18} className="sidebar-icon" />
            <span>Home</span>
          </Link>

          {/* Services with Mobile Dropdown */}
          <div className="sidebar-item-wrapper">
            <button
              className="sidebar-link sidebar-link-dropdown"
              onClick={toggleMobileServices}
              aria-expanded={isMobileServicesOpen}
            >
              <Layers size={18} className="sidebar-icon" />
              <span>Services</span>
              {/* <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`dropdown-icon ${
                  isMobileServicesOpen ? "dropdown-icon-open" : ""
                }`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg> */}
              <ChevronDown
                size={16}
                className={`dropdown-icon ${
                  isMobileServicesOpen ? "dropdown-icon-open" : ""
                }`}
              />
            </button>

            <div
              className={`sidebar-submenu ${
                isMobileServicesOpen ? "submenu-open" : ""
              }`}
            >
              <a
                href="#service-1"
                className="sidebar-submenu-link"
                onClick={toggleSidebar}
              >
                <PlaySquare size={16} className="sidebar-submenu-icon" />
                3D Product Animation
              </a>
              <a
                href="#service-2"
                className="sidebar-submenu-link"
                onClick={toggleSidebar}
              >
                <Box size={16} className="sidebar-submenu-icon" />
                3D Product Rendering
              </a>
            </div>
          </div>

          <a
            href="#pricing"
            className="sidebar-link"
            onClick={(e) => handleSectionClick("pricing", e)}
          >
            <Tag size={18} className="sidebar-icon" />
            <span>Pricing</span>
          </a>

          <a
            href="#faq"
            className="sidebar-link"
            onClick={(e) => handleSectionClick("faq", e)}
          >
            <HelpCircle size={18} className="sidebar-icon" />
            <span>FAQ</span>
          </a>

          <Link to="/about" className="sidebar-link" onClick={toggleSidebar}>
            <Info size={18} className="sidebar-icon" />
            <span>About</span>
          </Link>

          <Link to="/contact" className="sidebar-link" onClick={toggleSidebar}>
            <Phone size={18} className="sidebar-icon" />
            <span>Contact</span>
          </Link>
        </nav>

        <Link to="/contact" className="sidebar-cta" onClick={toggleSidebar}>
          Get a quote
        </Link>
      </aside>
    </>
  );
};

export default Header;
