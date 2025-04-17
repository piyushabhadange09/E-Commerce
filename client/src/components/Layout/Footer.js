import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-3 col-md-6">
            <h5>About Us</h5>
            <p>
              E-commerce offers a wide range of quality products at great
              prices, with a focus on customer satisfaction and fast, secure
              shopping.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-lg-3 col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/pollicies" className="text-white">
                  Privacy Pollicies
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-6">
            <h5>Contact Us</h5>
            <p>Email: support@E-commerce.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>

          {/* Social Media Section */}
          <div className="col-lg-3 col-md-6">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" className="text-white me-3">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                Instagram
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
