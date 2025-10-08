import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { addToCart } from "../Redux/cartSlice.js";
import { formatCurrency } from "../Utils/helpers.js";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };
    
  return (
    <div className={styles.card}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
        <p className={styles.rating}>{product.rating} ★</p>
        <div className={styles.actions}>
          <button onClick={handleAdd} className={styles.addBtn}>Add to Cart</button>
          <Link to={`/product/${product._id}`} className={styles.viewBtn}>View</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


