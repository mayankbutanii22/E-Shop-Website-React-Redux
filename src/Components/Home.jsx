import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice.js";
import ProductCard from "./ProductCard.jsx";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((state) => state.products);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const categories = ["All", "Electronics", "Fashion", "Home", "Toys", "Beauty"];

  // --- Filter logic (search + category) ---
  const filtered = useMemo(() => {
    let list = [...items];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [items, query, category]);

  // --- Category-wise visible (default 8 per category when "All") ---
  const visible = useMemo(() => {
    if (category === "All" && !query.trim()) {
      const result = [];
      categories.slice(1).forEach((cat) => {
        const catItems = items.filter((p) => p.category === cat).slice(0, 8);
        result.push(...catItems);
      });
      return result;
    }
    return filtered;
  }, [filtered, items, category, query]);

  return (
    <div className={styles.home}>
      <div className={styles.topbar}>
        <input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.categories}>
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.categoryBtn} ${category === c ? styles.active : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productsGrid}>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : visible.length ? (
          visible.map((p) => <ProductCard key={p._id} product={p} />)
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
}

export default Home;



