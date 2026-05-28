import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesPage.css";

const SalesPage = () => {

  const [salesData, setSalesData] = useState({
    revenue: 0,
    totalSold: 0,
    topProduct: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchSalesData();

  }, []);

  const fetchSalesData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/admin/products/sales-summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSalesData(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="sales-loading">
        Loading sales data...
      </div>
    );
  }

  return (

    <div className="sales-page">

      {/* HEADER */}

      <div className="sales-header">

        <h1>Sales Report</h1>

        <p>
          Revenue, payment completion, refunds,
          and daily collection trend.
        </p>

      </div>

      {/* TOP CARDS */}

      <div className="sales-cards">

        <div className="sales-card">

          <div>

            <h3>Gross Revenue</h3>

            <h1>
              ₹{salesData.revenue}
            </h1>

          </div>

          <p>
            Before refunds
          </p>

        </div>

        <div className="sales-card">

          <div>

            <h3>Products Sold</h3>

            <h1>
              {salesData.totalSold}
            </h1>

          </div>

          <p>
            Total completed product sales
          </p>

        </div>

        <div className="sales-card">

          <div>

            <h3>Most Sold Product</h3>

            <h1 className="top-product-name">
              {salesData.topProduct || "No Sales"}
            </h1>

          </div>

          <p>
            Highest selling product
          </p>

        </div>

        <div className="sales-card">

          <div>

            <h3>Total Refunds</h3>

            <h1>
              ₹0
            </h1>

          </div>
        </div>

      </div>


    </div>
  );
};

export default SalesPage;