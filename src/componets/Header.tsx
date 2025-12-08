import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/sections/header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  const toggleMobileServices = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  // Handle section navigation
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // Already on homepage - just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On different page - navigate home first
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Close sidebar if open
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="currentColor"/>
            </svg>
            <span>Skitbit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              {/* Changed button to span to prevent white background */}
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="dropdown-icon">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              
              {/* Services Dropdown */}
              <div className={`services-dropdown ${isServicesOpen ? 'dropdown-open' : ''}`}>
                <a href="#service-1" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">3D Animation</span>
                    <span className="dropdown-item-desc">Product animations</span>
                  </div>
                </a>

                <a href="#service-2" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">3D Modeling</span>
                    <span className="dropdown-item-desc">Custom 3D models</span>
                  </div>
                </a>
              </div>
            </div>
            
            <a 
              href="#pricing" 
              className="nav-link"
              onClick={(e) => handleSectionClick('pricing', e)}
            >
              Pricing
            </a>

            <a 
              href="#faq" 
              className="nav-link"
              onClick={(e) => handleSectionClick('faq', e)}
            >
              FAQ
            </a>

            <Link to="/about" className="nav-link">About</Link>
            
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* CTA Button */}
          <Link to="/contact" className="header-cta">
            Chat With Us
          </Link>
        </div>
      </header>

      {/* Mobile Menu Toggle Button */}
      <button 
        className={`mobile-menu-toggle ${isSidebarOpen ? 'menu-toggle-active' : ''}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
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
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <nav className="sidebar-nav">
          {/* Services with Mobile Dropdown */}
          <div className="sidebar-item-wrapper">
            <button 
              className="sidebar-link sidebar-link-dropdown" 
              onClick={toggleMobileServices}
              aria-expanded={isMobileServicesOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3h5v5H3V3zm0 9h5v5H3v-5zm9-9h5v5h-5V3zm0 9h5v5h-5v-5z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Services</span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                className={`dropdown-icon ${isMobileServicesOpen ? 'dropdown-icon-open' : ''}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className={`sidebar-submenu ${isMobileServicesOpen ? 'submenu-open' : ''}`}>
              <a href="#service-1" className="sidebar-submenu-link" onClick={toggleSidebar}>
                3D Animation
              </a>
              <a href="#service-2" className="sidebar-submenu-link" onClick={toggleSidebar}>
                3D Modeling
              </a>
            </div>
          </div>

          <a 
            href="#pricing" 
            className="sidebar-link"
            onClick={(e) => handleSectionClick('pricing', e)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Pricing</span>
          </a>

          <a 
            href="#faq" 
            className="sidebar-link"
            onClick={(e) => handleSectionClick('faq', e)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 14v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>FAQ</span>
          </a>

          <Link to="/about" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10v4M10 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>About</span>
          </Link>

          <Link to="/contact" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3h14v14H3z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Contact</span>
          </Link>
        </nav>

        <Link to="/contact" className="sidebar-cta" onClick={toggleSidebar}>
          Chat With Us
        </Link>
      </aside>
    </>
  );
};

export default Header;