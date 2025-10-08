import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const p = products.find((x) => x._id === id);
    setProduct(p);
  }, [id, products]);

  if (!product) return <div className={styles.loading}>Loading product...</div>;

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageSection}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
      </div>

      <div className={styles.infoSection}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={styles.productDesc}>{product.description}</p>

        <div className={styles.priceRating}>
          <span className={styles.price}>${(product.price * qty).toFixed(2)}</span>
          <span className={styles.rating}>⭐ {product.rating}</span>
        </div>

        <div className={styles.controls}>
          <label htmlFor="qty" className={styles.label}>Quantity : </label>
          <input
            id="qty"
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className={styles.qtyInput}
          />
        </div>

        <button onClick={handleAdd} className={styles.addBtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}




