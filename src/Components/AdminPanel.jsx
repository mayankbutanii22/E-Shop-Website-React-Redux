import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AdminPanel.module.css";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../Redux/productsSlice.js";
import { fetchAllUsers } from "../Redux/userSlice";

function AdminPanel() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    countInStock: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchProducts()); 
    dispatch(fetchAllUsers()); 
  }, [dispatch]);

  // --- Redux State ---
  const products = useSelector((state) => state.products.items || []);
  const users = useSelector((state) => state.user.allUsers || []); 
  const orders = useSelector((state) => state.orders.items || []);


  // --- Dashboard Stats ---
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
    [orders]
  );

  // --- Handlers ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price) return alert("Enter name & price!");
    dispatch(addProduct({ ...form, _id: Date.now().toString() }));
    setForm({
      name: "",
      category: "",
      price: "",
      image: "",
      countInStock: "",
      description: "",
    });
    alert("Product added successfully!");
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      countInStock: p.countInStock,
      description: p.description,
    });
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct({ ...editingProduct, ...form }));
    setEditingProduct(null);
    alert("Product updated successfully!");
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Delete this product?")) dispatch(deleteProduct(id));
  };

  // --- UI ---
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin Panel</h2>
        <ul className={styles.navList}>
          {["dashboard", "products", "users", "orders"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? styles.active : ""}
              onClick={() => {
                setActiveTab(tab);
                setEditingProduct(null);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* --- Dashboard --- */}
        {activeTab === "dashboard" && (
          <section className={styles.dashboard}>
            <h2>Dashboard Overview</h2>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </div>
              <div className={styles.card}>
                <h3>{users.length}</h3>
                <p>Registered Users</p>
              </div>
              <div className={styles.card}>
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>
              <div className={styles.card}>
                <h3>${totalRevenue.toFixed(2)}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </section>
        )}

        {/* --- Manage Products --- */}
        {activeTab === "products" && (
          <section className={styles.tableSection}>
            <div className={styles.headerRow}>
              <h2>Manage Products</h2>
            </div>

            {/* Product Form */}
            <div className={styles.formBox}>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Name"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleFormChange}
                placeholder="Category"
              />
              <input
                name="price"
                value={form.price}
                onChange={handleFormChange}
                placeholder="Price"
                type="text"
              />
              <input
                name="image"
                value={form.image}
                onChange={handleFormChange}
                placeholder="Image URL"
              />
              <input
                name="countInStock"
                value={form.countInStock}
                onChange={handleFormChange}
                placeholder="Stock"
                type="text"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Description"
              />
              {editingProduct ? (
                <button
                  className={styles.updateBtn}
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
              ) : (
                <button className={styles.addBtn} onClick={handleAddProduct}>
                  + Add Product
                </button>
              )}
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img src={p.image} alt={p.name} className={styles.thumb} />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td>{p.countInStock}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditProduct(p)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* --- Manage Users --- */}
        {activeTab === "users" && (
          <section className={styles.tableSection}>
            <h2>Manage Users</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length ? (
                  users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name || "Unknown"}</td>
                      <td>{u.email || "N/A"}</td>
                      <td>{u.isAdmin ? "Admin" : "User"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* --- Manage Orders --- */}
        {activeTab === "orders" && (
          <section className={styles.tableSection}>
            <h2>Manage Orders</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((o, i) => (
                    <tr key={i}>
                      <td>{o._id || "ORD-001"}</td>
                      <td>
                        {o.createdAt
                          ? new Date(o.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>₹{o.totalPrice || 0}</td>
                      <td>{o.isDelivered ? "Delivered" : "Pending"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;

