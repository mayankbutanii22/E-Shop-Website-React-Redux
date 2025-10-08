import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

  const location = useLocation();
  const isLoginActive = location.pathname === "/login";

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      {/* Left - Logo */}
      <div className={styles.logo}>
        <Link to="/" onClick={closeMenu}>
          E-Commerce-Shop
        </Link>
      </div>

      {/* Center - Desktop Nav Links */}
      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/cart">
          Cart {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* Right Auth Buttons */}
      <div className={styles.authButtons}>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${styles.loginBtn} ${styles.activeBtn}` : styles.loginBtn
          }
        >
          Login
        </NavLink>
        <Link
          to="/signup"
          className={
            isLoginActive
              ? styles.signupBtn
              : `${styles.signupBtn} ${styles.fixedSignup}`
          }
        >
          Sign Up
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar for Mobile & Tablet */}
      <div
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
      >
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/admin" onClick={closeMenu}>Admin</Link>
        <Link to="/cart" onClick={closeMenu}>
          Cart {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
        <Link to="/profile" onClick={closeMenu}>Profile</Link>

        {/* Login & Signup Buttons */}
        <div className={styles.sidebarAuth}>
          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? `${styles.loginBtn} ${styles.activeBtn}` : styles.loginBtn
            }
          >
            Login
          </NavLink>
          <Link
            to="/signup"
            onClick={closeMenu}
            className={
              isLoginActive
                ? styles.signupBtn
                : `${styles.signupBtn} ${styles.fixedSignup}`
            }
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





