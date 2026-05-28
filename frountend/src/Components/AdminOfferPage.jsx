import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOffersPage = () => {

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const [formData, setFormData] = useState({
        categoryId: "",
        productType: "",
        discountPercentage: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCategories();
        fetchTypes();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/products/categories"
            );

            setCategories(res.data);

        } catch (err) {

            console.error(err);
        }
    };

    const fetchTypes = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/products"
            );

            const uniqueTypes = [
                ...new Set(
                    res.data.map(
                        (product) => product.productType
                    )
                ),
            ];

            setTypes(uniqueTypes);

        } catch (err) {

            console.error(err);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await axios.post(
                "http://localhost:8080/admin/products/apply",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Offer applied successfully");

            setFormData({
                categoryId: "",
                productType: "",
                discountPercentage: "",
            });

        } catch (err) {

            console.error(err);

            setMessage("Failed to apply offer");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{
                    maxWidth: "500px",
                    borderRadius: "15px",
                    marginTop: "120px"
                }}
            >

                <h2 className="text-center mb-4">
                    Apply Offer
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Category
                        </label>

                        <select
                            className="form-select"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="ALL">
                                All Categories
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Product Type
                        </label>

                        <select
                            className="form-select"
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Product Type
                            </option>

                            <option value="ALL">
                                All Types
                            </option>

                            {types.map((type, index) => (

                                <option
                                    key={index}
                                    value={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-bold">
                            Discount Percentage
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="discountPercentage"
                            placeholder="Enter discount percentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                            required
                            min="1"
                            max="90"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Applying Offer..."
                            : "Apply Offer"}

                    </button>
                </form>

                {message && (

                    <div
                        className={`alert mt-4 ${
                            message.includes("success")
                                ? "alert-success"
                                : "alert-danger"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOffersPage;