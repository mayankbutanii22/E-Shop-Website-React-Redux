import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({
          name: form.fullName,
          email: form.email,
          password: form.password,
        })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/profile");
      } else {
        setError(resultAction.payload?.message || "Signup failed");
      }
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create Your Account</h1>
        <p className={styles.subtitle}>Get started with your free account in seconds.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.primaryBtn}>
            Sign Up
          </button>
        </form>
        <p className={styles.loginText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}





