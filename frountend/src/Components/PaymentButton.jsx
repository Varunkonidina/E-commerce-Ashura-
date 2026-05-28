import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/create-order",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Successful & Order Placed");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{
        padding: "12px 20px",
        backgroundColor: "#ff9900",
        border: "none",
        borderRadius: "5px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        width: "100%",
      }}
    >
      {loading ? "Processing..." : "Proceed to Payment"}
    </button>
  );
};

export default PaymentButton;