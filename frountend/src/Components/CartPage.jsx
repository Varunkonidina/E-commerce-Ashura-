import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartPage.css";
import Header from "./Header";
import Footer from "./Footer";
import PaymentButton from "./PaymentButton";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:8080/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (itemId) => {
        await axios.delete(
            `http://localhost:8080/cart/remove/${itemId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        fetchCart();
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity <= 0) return;

        await axios.put(
            "http://localhost:8080/cart/update",
            { itemId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        fetchCart();
    };

    if (!cart || cart.items.length === 0) {
        return (<><Header/><h2 className="empty-cart">Cart is empty</h2><Footer /></>);
    }

    return (
        <>
            <Header/>
            <div className="cart-container">
                <h2>Your Cart</h2>

                <div className="cart-list">
                    {cart.items.map((item) => (
                        <div key={item.id} className="cart-card">

                            <img
                                src={`http://localhost:8080${item.imageUrl}`}
                                className="cart-img"
                                alt={item.name}
                            />

                            <div className="cart-info">
                                <h4>{item.name}</h4>

                                <p className="price">₹{item.price}</p>

                                <div className="qty-box">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity - 1)
                                        }
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <p>Total: ₹{item.price * item.quantity}</p>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                <h3 className="cart-total">Total: ₹{cart.total}</h3>
                <div style={{ marginTop: "20px", maxWidth: "300px" }}>
                    <PaymentButton />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CartPage;