import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
// import './Favorites.css'; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8080/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div>
        <Header/>
    <div className="container mt-5">
      <h2 className="text-center" style={{ margin: "3em" }}> Your Favorites</h2>
      {/* {favorites ? 
      <div className="d-flex flex-wrap justify-content-center " style={{gap:"7em"}}>
        <p style={{fontFamily:"",fontWeight:"700",color:"#918f8f7c",fontSize:"30px"}}>No favorites yet</p>
        </div> : */}
      <div className="d-flex flex-wrap justify-content-center " style={{gap:"7em"}}>
        {console.log(favorites)}
        
        {favorites.map((fav) => {
          
          const product = fav.product;
          const primaryImage =
            product.Productimage?.find(img => img.isPrimary) ||
            product.Productimage?.[0];

          return (
            <div
              key={product.id}
              className="card shadow-sm"
              style={{ width: "250px", height: "50vh", cursor: "pointer" }}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={primaryImage?.imageUrl ? `http://localhost:8080${primaryImage.imageUrl}` : "https://via.placeholder.com/200"}
                className="card-img-top"
                alt={product.name}
                style={{ height: "70%", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{product.name}</h6>
                <p className="text-muted mb-1">{product.brand?.name}</p>
                <h6 className="text-success">₹ {product.price}</h6>
              </div>
            </div>
          );
        })}
      </div>
      {/* } */}
    </div>
      
    </div>
  );
};

export default Favorites;