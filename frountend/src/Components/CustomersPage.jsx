import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const CustomersPage = () => {

  const [customerData, setCustomerData] = useState({
    totalCustomers: 0,
    vipCustomers: 0,
    regularCustomers: 0,
    newCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCustomerData();

  }, []);

 const fetchCustomerData = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:8080/admin/products/customers-summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCustomerData(res.data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }
};

  if (loading) {

    return (
      <div className="sales-loading">
        Loading customer analytics...
      </div>
    );
  }

  return (

    <div className="sales-page">

      {/* HEADER */}

      <div className="sales-header">

        <h1>Customer Analytics</h1>

        <p>
          Track customer engagement, loyalty,
          and growth performance.
        </p>

      </div>

      {/* TOP CUSTOMER CARDS */}

      <div className="sales-cards">

        {/* TOTAL CUSTOMERS */}

        <div className="sales-card">

          <div>

            <h3>Total Active Customers</h3>

            <h1>
              {customerData.totalCustomers}
            </h1>

          </div>

          <p>
            Registered and active users
          </p>

        </div>

        {/* VIP CUSTOMERS */}

        <div className="sales-card">

          <div>

            <h3>VIP Customers</h3>

            <h1>
              {customerData.vipCustomers}
            </h1>

          </div>

          <p>
            High spending loyal customers
          </p>

        </div>

        {/* REGULAR CUSTOMERS */}

        <div className="sales-card">

          <div>

            <h3>Regular Customers</h3>

            <h1>
              {customerData.regularCustomers}
            </h1>

          </div>

          <p>
            Frequently purchasing users
          </p>

        </div>

        {/* NEW CUSTOMERS */}

        <div className="sales-card">

          <div>

            <h3>New Customers</h3>

            <h1>
              {customerData.newCustomers}
            </h1>

          </div>

          <p>
            Recently joined customers
          </p>

        </div>

      </div>

      {/* BOTTOM SECTION */}

      <div className="sales-bottom">

        {/* CUSTOMER INSIGHTS */}

        <div className="bottom-card">

          <h2>
            Customer Insights
          </h2>

          <p>
            User activity and engagement trends
          </p>

          <div className="trend-placeholder">

            <div className="trend-line"></div>

            <span>
              Customer growth analytics coming soon
            </span>

          </div>

        </div>

        {/* CUSTOMER SEGMENTS */}

        <div className="bottom-card">

          <h2>
            Customer Segments
          </h2>

          <p>
            Classification based on activity
          </p>

          <div className="payment-list">

            {/* VIP */}

            <div className="payment-item">

              <div className="payment-left">

                <div className="payment-badge razorpay">
                  VIP
                </div>

                <div className="payment-orders">
                  Premium loyal customers
                </div>

              </div>

              <div className="payment-amount">
                {customerData.vipCustomers}
              </div>

            </div>

            {/* REGULAR */}

            <div className="payment-item">

              <div className="payment-left">

                <div className="payment-badge cod">
                  REGULAR
                </div>

                <div className="payment-orders">
                  Consistent active users
                </div>

              </div>

              <div className="payment-amount">
                {customerData.regularCustomers}
              </div>

            </div>

          </div>

          <div className="info-box">

            Customer classifications are based on
            purchase frequency and spending patterns.

          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomersPage;