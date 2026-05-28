import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductDetails";
import ProductList from "./Components/ProductList";
import ProductsPage from "./Components/ProductsPage";
import Auth from "./Components/Auth";
import Favorites from "./Components/Favorites";
import AddProduct from "./Components/AddProduct";
import UserProfile from "./Components/UserProfile";
import SearchResults from "./Components/SearchResults";
import CartPage from "./Components/CartPage";
import UserOrders from "./Components/UserOrders";
import AdminOrders from "./Components/AdminOrders";

import AdminLayout from "./Components/AdminLayout";
import CustomersPage from "./Components/CustomersPage";
import SalesPage from "./Components/SalesPages";
import AdminProductsPage from "./Components/AdminProductPage";
import AdminOffersPage from "./Components/AdminOfferPage";
import PolicyPage from "./Components/PolicyPage";
function App() {

  return (

    <Routes>

      {/* USER ROUTES */}

      <Route path="/" element={<Home />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route
        path="/brand/:id"
        element={<ProductList filterType="brand" />}
      />

      <Route
        path="/products/:categoryId/:type"
        element={<ProductsPage />}
      />

      <Route path="/login" element={<Auth />} />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/profile" element={<UserProfile />} />

      <Route path="/products/search" element={<SearchResults />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/orders" element={<UserOrders />} />
      <Route path="/admin" element={<AdminLayout />}>

        <Route
          path="products"
          element={<AdminProductsPage />}
        />

        <Route
          path="sales"
          element={<SalesPage />}
        />

        <Route
          path="customers"
          element={<CustomersPage />}
        />

        <Route
          path="allorders"
          element={<AdminOrders />}
        />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route
          path="add-product"
          element={<AddProduct />}
        />
        <Route
          path="addoffer"
          element={<AdminOffersPage />}
        />
        

      </Route>
      <Route path="/policy/:policyId" element={<PolicyPage />} />
    </Routes>

  );
}

export default App;