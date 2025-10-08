import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateProfile } from "../Redux/userSlice";
import styles from "./Profile.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = userInfo || JSON.parse(localStorage.getItem("userInfo"));

    if (!savedUser) {
      navigate("/login");
    } else {
      setForm({
        name: savedUser.name || "",
        email: savedUser.email || "",
        address: savedUser.address || "",
        phone: savedUser.phone || "",
        avatar: savedUser.avatar || "/public/1000015783[1].jpg",
      });
    }

    setLoading(false); 
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save updates (Redux + LocalStorage)
  const handleSave = () => {
    const updatedUser = { ...userInfo, ...form };
    dispatch(updateProfile(updatedUser));
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");

    // Clear input fields after saving
    setForm({
      name: "",
      email: "",
      address: "",
      phone: "",
      avatar: "",
    });
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Show loading text only while fetching data
  if (loading) {
    return <p className={styles.loading}>Loading Profile...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Profile</h2>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <img
            src={form.avatar || "/public/1000015783[1].jpg"}
            alt="User Avatar"
            className={styles.avatar}
          />
        </div>

        <div className={styles.info}>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Avatar URL:
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <div className={styles.buttons}>
            <button onClick={handleSave} className={styles.primaryBtn}>
              Save Profile
            </button>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




