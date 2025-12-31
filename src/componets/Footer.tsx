import { Link, useNavigate } from "react-router-dom";
import "../assets/css/sections/footer.css";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

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
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* Quick Links Column */}
          <div className="footer-column">
            <Link to="/" className="header-logo">
              <img
                src="/images/RDLogo.png"
                alt="RenderDac Logo"
                className="header-logo-img"
                width="100"
                height="100"
              />
              <span>Render Dac Studios</span>
            </Link>
            <br />
            <p className="footer-subtitle">
              Experience next-level 3D animation. We create cinematic visuals
              that elevate brands and products.
            </p>
          </div>

          {/* Reach Us Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Reach us</h3>
            <div className="footer-contact-list">
              <a href="tel:+917206181859" className="footer-contact-item">
                <Phone size={20} className="footer-contact-icon" />
                <span>+91 7206181859</span>
              </a>

              <a href="tel:+447848119123" className="footer-contact-item">
                <Phone size={20} className="footer-contact-icon" />
                <span>+44 7848119123</span>
              </a>

              <a
                href="mailto:renderdacbusiness1@gmail.com"
                className="footer-contact-item"
              >
                <Mail size={20} className="footer-contact-icon" />
                <span>renderdacbusiness1@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Delhi+110006+India"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <MapPin size={20} className="footer-contact-icon" />
                <span>Delhi 110006, India</span>
              </a>

              <a
                href="https://maps.google.com/?q=20+Wenlock+Road+London+N1+7GU+United+Kingdom"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <MapPin size={20} className="footer-contact-icon" />
                <span>20 Wenlock Road, London N1 7GU, United Kingdom</span>
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleSectionClick("pricing", e)}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSectionClick("faq", e)}>
                  FAQ
                </a>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {/* <li>
                <Link to="/blog">Blogs</Link>
              </li> */}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li>
                <Link to="">Privacy Policy</Link>
              </li>
              <li>
                <Link to="">Terms & Services</Link>
              </li>
              <li>
                <Link to="">Terms of Use</Link>
              </li>
              <li>
                <Link to="">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} RenderDac. All rights reserved.
          </p>
          <p className="footer-credit">
            Designed & Developed by{" "}
            <a
              href="https://veena-solanki-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Veena Solanki
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
