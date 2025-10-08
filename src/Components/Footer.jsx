import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { logout } from "../Redux/userSlice";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userInfo || null);
  const cartCount = useSelector(
    (state) =>
      state.cart?.cartItems?.reduce((acc, item) => acc + (item.qty || 0), 0) || 0
  );

  const handleLogout = () => {
    dispatch(logout());
    alert("You have been logged out!");
    window.location.href = "/login";
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* --- ABOUT --- */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerTitle}>About E-Shop</h3>
          <p>
            e-Shop is a modern SaaS-inspired eCommerce platform in Horizons style.
            Smooth UI, fast performance, premium experience.
          </p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* --- QUICK LINKS --- */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart ({cartCount})</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        {/* --- SUPPORT --- */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerTitle}>Support</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
          {user ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className={styles.loginLink}>Login</Link>
          )}
        </div>

        {/* --- NEWSLETTER --- */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerTitle}>Stay Updated</h3>
          <p>Subscribe for exclusive offers and updates.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Subscribed successfully with ${email}!`);
              setEmail(""); 
            }}
            className={styles.newsletterForm}
          >
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} E-Commerce-Shop. All rights reserved.</p>
        <p className={styles.madeBy}>Made with by Mayank Butani</p>
      </div>
    </footer>
  );
};

export default Footer;



