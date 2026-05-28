import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const AdminOrdersPage = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:8080/admin/products/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders(res.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load orders");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (error) {
        return <p className="text-danger text-center mt-5">{error}</p>;
    }

    return (
        <div>

            <div className="container mt-5">

                <h1 className="mb-4">
                    Admin Orders
                </h1>

                <div className="d-flex flex-wrap gap-4 justify-content-center">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="card shadow-sm p-3"
                            style={{
                                width: "350px",
                                borderRadius: "12px",
                            }}
                        >

                            {/* Order Header */}
                            <div className="mb-3">

                                <h5 className="fw-bold">
                                    {order.username}
                                </h5>

                                <p className="mb-1">
                                    <strong>Order ID:</strong> #{order.id}
                                </p>

                                <p className="mb-1">
                                    <strong>Status:</strong>{" "}
                                    <span className="text-success">
                                        {order.status}
                                    </span>
                                </p>

                                <p className="mb-0">
                                    <strong>Address:</strong>{" "}
                                    {order.address || "No address"}
                                </p>

                            </div>

                            <hr />

                            {/* Order Items */}
                            <h6 className="mb-3">
                                Order Items
                            </h6>

                            {order.items.map((item) => {

                                const primaryImage =
                                    item.product.productimage?.find(
                                        (img) => img.isPrimary
                                    ) || item.product.productimage?.[0];

                                return (

                                    <div
                                        key={item.id}
                                        className="d-flex align-items-center mb-3"
                                    >

                                        {/* Product Image */}
                                        <img
                                            src={`http://localhost:8080${primaryImage?.imageUrl}`}
                                            alt={item.product.name}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                marginRight: "12px",
                                            }}
                                        />

                                        {/* Product Details */}
                                        <div className="flex-grow-1">

                                            <h6 className="mb-1">
                                                {item.product.name}
                                            </h6>

                                            <p className="text-muted mb-1">
                                                {item.product.brand.name}
                                            </p>

                                            <small>
                                                Qty: {item.quantity}
                                            </small>

                                        </div>

                                        {/* Price */}
                                        <h6 className="text-success">
                                            ₹ {item.product.price}
                                        </h6>

                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;