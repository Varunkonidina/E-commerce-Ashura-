import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./UserOrders.css";
import Footer from "./Footer";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />

      <div className=" orders-container">
        <h2 className="text-center mb-4">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) =>
              order.items.map((item) => {
                const product = item.product;

                const primaryImage =
                  product.Productimage?.find((img) => img.isPrimary)?.imageUrl ||
                  product.Productimage?.[0]?.imageUrl;

                return (
                  <div
                    key={item.id}
                    className="card order-card"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img
                      src={`http://localhost:8080${primaryImage}`}
                      alt={product.name}
                    />

                    <div className="card-body text-center">
                      <h5 className="order-title">{product.name}</h5>

                      <p className="order-price">₹{product.price}</p>

                      <p className="order-qty">
                        Quantity: <strong>{item.quantity}</strong>
                      </p>
                      <p className="order-qty">
                        Address: <strong>{order.address}</strong>
                      </p>
                      <span
                        className={`order-status ${
                          order.status === "PAID"
                            ? "status-paid"
                            : "status-failed"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default UserOrders;