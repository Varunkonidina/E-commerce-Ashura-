import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminProductPage.css'
import AdminLayout from "./AdminLayout";

const AdminProductsPage = () => {

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, statusFilter, products]);

    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:8080/products");

        setProducts(res.data);
        setFiltered(res.data);
    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`http://localhost:8080/products/${id}`);

            setProducts(products.filter((p) => p.id !== id));

        } catch (err) {

            console.error(err);

            alert("Failed to delete product");

        }
    };
    const getStatus = (p) => {
        if (p.isTrending) return "ACTIVE";
        if (p.isLatest) return "SCHEDULED";
        return "DRAFT";
    };

    const filterProducts = () => {
        let data = [...products];

        if (search) {
            data = data.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter !== "ALL") {
            data = data.filter((p) => getStatus(p) === statusFilter);
        }

        setFiltered(data);
        setCurrentPage(1);
    };

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const currentItems = filtered.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <>
        
            <div className="topbar">
                <h2>Products</h2>

                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="ALL">All</option>
                        <option value="ACTIVE">Active</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="DRAFT">Draft</option>
                    </select>

                    <button
                        className="btn-add"
                        onClick={() => navigate("/admin/add-product")}
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Price</th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((product) => {

                            const primaryImage =
                                product.images?.find((img) => img.isPrimary) ||
                                product.images?.[0];

                            return (
                                <tr key={product.id}>
                                    <td className="product-cell">
                                        <img
                                            src={`http://localhost:8080${primaryImage?.imageUrl}`}
                                            alt={product.name}
                                        />

                                        <span>{product.name}</span>
                                    </td>

                                    <td>{product.stock}</td>

                                    <td>{product.productType}</td>

                                    <td>₹ {product.price}</td>

                                   
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active-page" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminProductsPage;