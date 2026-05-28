import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Brands.css";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/products/brands")
      .then(res => setBrands(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="brand-title  "style={{margin:"3em"}}>🏷 Shop By Brand</h2>

      <div className="brand-scroll d-flex gap-4 overflow-auto pb-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="brand-card text-center"
            onClick={() => navigate(`/brand/${brand.id}`)} 
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:8080/images${brand.logoUrl}`}
              alt={brand.name}
              className="brand-logo"
            />
            {/* <div className="brand_name">
              <p>{brand.name}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;