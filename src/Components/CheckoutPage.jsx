import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, clearCart } from "../Redux/cartSlice.js";
import { placeOrder } from "../Redux/orderSlice.js";
import { formatCurrency, calculateCartTotal } from "../Utils/helpers.js";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const total = calculateCartTotal(cartItems);

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [step, setStep] = useState("shipping"); // shipping | payment | success
  const [paymentStatus, setPaymentStatus] = useState(null);

  // --- Proceed from shipping to payment ---
  const handleShippingSubmit = () => {
    if (!address.fullName || !address.address || !address.city || !address.pincode || !address.phone) {
      alert("Please fill all shipping details!");
      return;
    }
    dispatch(saveShippingAddress(address));
    setStep("payment");
  };

  // --- Simulate payment process ---
  const handlePayment = () => {
    // Simulate processing delay
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      const order = {
        orderItems: cartItems,
        shippingAddress: address,
        totalPrice: total,
        paymentStatus: "Paid",
        createdAt: new Date().toISOString(),
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
      };
      dispatch(placeOrder(order));
      dispatch(clearCart());
      setStep("success");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h2>Checkout</h2>

      {step === "shipping" && (
        <>
          <div className={styles.form}>
            <label>Full Name</label>
            <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />

            <label>Address</label>
            <input value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} />

            <label>City</label>
            <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />

            <label>Pincode</label>
            <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />

            <label>Phone</label>
            <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
          </div>

          <div className={styles.summary}>
            <strong>Total Amount: {formatCurrency(total)}</strong>
            <button onClick={handleShippingSubmit}>Proceed to Payment</button>
          </div>
        </>
      )}

      {step === "payment" && (
        <div className={styles.payment}>
          <h3>Payment Options</h3>
          <p>Simulating secure payment...</p>
          <button onClick={handlePayment} disabled={paymentStatus === "processing"}>
            {paymentStatus === "processing" ? "Processing..." : `Pay ${formatCurrency(total)}`}
          </button>
        </div>
      )}

      {step === "success" && (
        <div className={styles.success}>
          <h3>Payment Successful!</h3>
          <p>Your order has been placed successfully.</p>
          <button onClick={() => navigate("/")}>Back to Shop</button>
        </div>
      )}
    </div>
  );
}




