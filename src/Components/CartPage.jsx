import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/cartSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency, calculateCartTotal } from "../Utils/helpers.js";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dynamically calculate total based on qty
  const total = calculateCartTotal(cartItems || []);

  const handleQtyChange = (item, qty) => {
    if (qty < 1) return;
    dispatch(addToCart({ ...item, qty }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>
          Your cart is empty.{" "}
          <Link to="/" className={styles.shopLink}>
            Shop Now
          </Link>
        </p>
      ) : (
        <div className={styles.cartBox}>
          {cartItems.map((item, index) => (
            <div
              key={item._id || `${item.name}-${index}`}
              className={styles.item}
            >
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.meta}>
                <Link to={`/product/${item._id}`} className={styles.title}>
                  {item.name}
                </Link>
                <p className={styles.category}>{item.category}</p>

                <div className={styles.controls}>
                  <div className={styles.qtyBox}>
                    <label>Qty :</label>
                    <input
                      type="number"
                      min={1}
                      step={1} 
                      value={item.qty}
                      onChange={(e) =>
                        handleQtyChange(item, Number(e.target.value))
                      }
                      className={styles.qtyInput}
                    />
                  </div>

                  {/* Show total price per item (price * qty) */}
                  <span className={styles.price}>
                    {formatCurrency((item.price || 0) * (item.qty || 1))}
                  </span>

                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <hr className={styles.divider} />

          <div className={styles.summary}>
            <strong className={styles.totalText}>
              Total : {formatCurrency(total)}
            </strong>
            <button
              className={styles.checkoutBtn}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}






