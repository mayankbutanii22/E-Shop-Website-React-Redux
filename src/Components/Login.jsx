import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Single source of truth for form fields
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resultAction = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/profile");
      } else {
        setError(resultAction.payload?.message || "Login failed");
      }
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Login to your account to continue.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
        </form>

        <p className={styles.loginText}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}









