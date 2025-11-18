import { useState } from 'react';
import '../assets/css/sections/header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  const toggleMobileServices = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="currentColor"/>
            </svg>
            <span>RenderDac</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <div 
              className="nav-item nav-item-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <a href="#services" className="nav-link">
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="dropdown-icon">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              
              {/* Services Dropdown */}
              <div className={`services-dropdown ${isServicesOpen ? 'dropdown-open' : ''}`}>
                <a href="#service-1" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">Service One</span>
                    <span className="dropdown-item-desc">Description placeholder</span>
                  </div>
                </a>

                <a href="#service-2" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">Service Two</span>
                    <span className="dropdown-item-desc">Description placeholder</span>
                  </div>
                </a>

                <a href="#service-3" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10h14M10 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">Service Three</span>
                    <span className="dropdown-item-desc">Description placeholder</span>
                  </div>
                </a>

                <a href="#service-4" className="dropdown-item">
                  <div className="dropdown-item-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <polygon points="10,2 3,17 17,17" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="dropdown-item-content">
                    <span className="dropdown-item-title">Service Four</span>
                    <span className="dropdown-item-desc">Description placeholder</span>
                  </div>
                </a>
              </div>
            </div>
            
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#about" className="nav-link">About</a>
          </nav>

          {/* CTA Button */}
          <a href="#contact" className="header-cta">
            Chat With Us
          </a>
        </div>
      </header>

      {/* Mobile Menu Toggle Button - OUTSIDE header-container */}
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

            {/* Mobile Services Submenu */}
            <div className={`sidebar-submenu ${isMobileServicesOpen ? 'submenu-open' : ''}`}>
              <a href="#service-1" className="sidebar-submenu-link" onClick={toggleSidebar}>
                Service One
              </a>
              <a href="#service-2" className="sidebar-submenu-link" onClick={toggleSidebar}>
                Service Two
              </a>
              <a href="#service-3" className="sidebar-submenu-link" onClick={toggleSidebar}>
                Service Three
              </a>
              <a href="#service-4" className="sidebar-submenu-link" onClick={toggleSidebar}>
                Service Four
              </a>
            </div>
          </div>

          <a href="#pricing" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Pricing</span>
          </a>

          <a href="#faq" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 14v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>FAQ</span>
          </a>

          <a href="#blog" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Blog</span>
          </a>

          <a href="#about" className="sidebar-link" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10v4M10 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>About</span>
          </a>
        </nav>

        <a href="#contact" className="sidebar-cta" onClick={toggleSidebar}>
          Get a Quote
        </a>
      </aside>
    </>
  );
};

export default Header;