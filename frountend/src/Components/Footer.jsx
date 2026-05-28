import React, { useEffect, useState } from "react";
import "./Footer.css";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import AshuraLogo from "../assets/AshuraLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState({});
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const fetchTypes = async (categoryId) => {
    if (types[categoryId]) return;
    try {
      const res = await axios.get(`http://localhost:8080/products/types-by-category/${categoryId}`);
      setTypes((prev) => ({ ...prev, [categoryId]: res.data }));
    } catch (err) {
      console.error("Failed to fetch types", err);
    }
  };

  const handleMouseEnter = async (categoryId) => {
    setOpenCategory(categoryId);
    await fetchTypes(categoryId);
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
  };

  const handleTypeClick = (categoryId, type) => {
    navigate(`/products/${categoryId}/${encodeURIComponent(type)}`);
    setOpenCategory(null);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img
              src={AshuraLogo}
              alt="Ashura Logo"
              className="footer-logo-img"
            />
            <h3>ASHURA</h3>
          </div>

          <p className="footer-desc">
            Ashura – The Ultimate Destination for Men’s Fashion.
          </p>

          <div className="footer-contact">
            {/* Instagram DM - Opens your profile/DM */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="DM us on Instagram"
            >
              <FaInstagram />
            </a>

            {/* WhatsApp - Opens chat with pre-filled message */}
            <a
              href="https://wa.me."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp />
            </a>

            {/* Email - Opens the user's email client */}
            <a
              href="mailto:varunkonidana07@://gmail.com"
              title="Send us an Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>


        <div className="footer-middle">
          <h4>Categories</h4>
          <div className="footer-category-list">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="footer-category-item"
                onMouseEnter={() => handleMouseEnter(cat.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="footer-category-btn">
                  {cat.name}
                  <span className="arrow-icon">›</span>
                </button>

                {openCategory === cat.id && (
                  <ul className="footer-types">
                    {(types[cat.id] || []).map((type, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleTypeClick(cat.id, type);
                          }}
                        >
                          {type}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-right">
          <h4>Policies</h4>
          <ul>
            <li><Link to="/policy/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/policy/return-policy">Return Policy</Link></li>
            <li><Link to="/policy/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/policy/terms-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Ashura. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
