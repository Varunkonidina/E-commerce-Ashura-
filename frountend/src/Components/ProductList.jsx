import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const ProductList = ({ filterType }) => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (filterType === "brand") {

            axios
                .get(`http://localhost:8080/products/brand/${id}`)
                .then((res) => {
                    setProducts(res.data);
                    if (res.data.length > 0) setTitle(`Products from ${res.data[0].brand.name}`);
                })
                .catch((err) => console.error(err));
        }

    }, [id, filterType]);

    if (products.length === 0) {
        return <p className="text-center mt-5">No products found.</p>;
    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h3 className="text-center mb-4">{title}</h3>
                <div className="d-flex flex-wrap justify-content-center gap-5">
                    {products.map((product) => {
                        const primaryImage =
                            product.Productimage?.find((img) => img.isPrimary) ||
                            product.Productimage?.[0];

                        return (
                            <div
                                key={product.id}
                                className="card shadow-sm"
                                style={{ width: "220px", cursor: "pointer" }}
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                <img
                                    src={`http://localhost:8080${primaryImage?.imageUrl}`}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    <h6 className="card-title">{product.name}</h6>
                                    <p className="text-muted mb-1">{product.brand.name}</p>
                                    <h6 className="text-success">₹ {product.price}</h6>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;