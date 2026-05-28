import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SidebarFilter.css";

const SidebarFilter = ({ onFilterChange }) => {
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const brandsRes = await axios.get("http://localhost:8080/products/brands");
                const typesRes = await axios.get("http://localhost:8080/products/product-types");
                setBrands(brandsRes.data);
                setTypes(typesRes.data);
            } catch (err) {
                console.error("Failed to load filters", err);
            }
        };
        fetchFilters();
    }, []);

    const handleBrandChange = (brand) => {
        let updated = [...selectedBrands];
        if (updated.includes(brand)) {
            updated = updated.filter((b) => b !== brand);
        } else {
            updated.push(brand);
        }
        setSelectedBrands(updated);
        onFilterChange({ brands: updated, types: selectedTypes, priceRange });
    };

    const handleTypeChange = (type) => {
        let updated = [...selectedTypes];
        if (updated.includes(type)) {
            updated = updated.filter((t) => t !== type);
        } else {
            updated.push(type);
        }
        setSelectedTypes(updated);
        onFilterChange({ brands: selectedBrands, types: updated, priceRange });
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const updatedRange = [...priceRange];
        if (name === "min") updatedRange[0] = Number(value);
        if (name === "max") updatedRange[1] = Number(value);
        setPriceRange(updatedRange);
        onFilterChange({ brands: selectedBrands, types: selectedTypes, priceRange: updatedRange });
    };

    return (
        <div className="sidebar">
            <h5>Filters</h5>

            <div className="filter-section">
                <h6>Brand</h6>
                {brands.map((brand) => (
                    <div key={brand.id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.name)}
                            onChange={() => handleBrandChange(brand.name)}
                        />
                        <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                            {brand.name}
                        </label>
                    </div>
                ))}
            </div>

        

            <div className="filter-section">
                <h6>Price</h6>
                <div className="d-flex gap-2">
                    <div>
                        <p>From:</p>
                        <input
                            type="number"
                            name="min"
                            className="form-control"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div>
                        <p>To:</p>
                        <input
                            type="number"
                            name="max"
                            className="form-control"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SidebarFilter;