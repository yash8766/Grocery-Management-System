import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer py-5" style={{ color: 'black' }}>
      <div className="container1" style={{ padding: '5rem' }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mr-5">
            <h4>About Us</h4>
            <p>
            Welcome to Grocefy, your trusted destination for fresh groceries, pantry staples, and everyday 
          essentials. We are dedicated to providing top-quality products with same-day delivery and a seamless
           shopping experience. 
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-black" style={{ textDecoration: 'none' }}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>Pune, 12345</li>
              <li>Email: Grocefy@example.com</li>
              <li>Phone: 1234567896</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="d-flex justify-content-center mt-4 mb-2">
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: '#3b5998', color: 'white' }}
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: '#dd4b39', color: 'white' }}
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: '#ac2bac', color: 'white' }}
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-3 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '10px' }}>
          © 2024 Copyright: Grocefy
        </div>
      </div>
    </footer>
  );
}

export default Footer;
