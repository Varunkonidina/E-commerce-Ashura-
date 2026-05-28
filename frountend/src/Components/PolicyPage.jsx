import React from "react";
import { useParams, Link } from "react-router-dom";
import "./PolicyPage.css";

const policyContent = {
  "privacy-policy": {
    title: "Privacy Notice",
    content: "At Ashura, we take your privacy seriously. This notice describes how we collect and process your personal information through Ashura websites, devices, products, and services...",
  },
  "return-policy": {
    title: "Returns & Replacements",
    content: "You can return most new, unopened items sold and fulfilled by Ashura within 30 days of delivery for a full refund. During the holidays, items shipped between November 1 and December 31 may be returned until January 31...",
  },
  "shipping-policy": {
    title: "Shipping Rates & Policies",
    content: "Ashura offers various shipping options to meet your needs. Standard shipping typically takes 3-5 business days, while Expedited shipping takes 1-2 business days...",
  },
  "terms-conditions": {
    title: "Conditions of Use",
    content: "Welcome to Ashura.com. Ashura and its affiliates provide website features and other products and services to you when you visit or shop at Ashura.com...",
  }
};

const PolicyPage = () => {
  const { policyId } = useParams();
  const policy = policyContent[policyId] || policyContent["privacy-policy"];

  return (
    <div className="policy-container">
      <div className="policy-wrapper">
        {/* Amazon-style Sidebar */}
        <aside className="policy-sidebar">
          <h3>Help & Help</h3>
          <ul>
            <li><Link to="/policy/privacy-policy">Privacy Notice</Link></li>
            <li><Link to="/policy/return-policy">Returns & Replacements</Link></li>
            <li><Link to="/policy/shipping-policy">Shipping Rates</Link></li>
            <li><Link to="/policy/terms-conditions">Conditions of Use</Link></li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="policy-content">
          <h1>{policy.title}</h1>
          <div className="policy-text">
            <p>{policy.content}</p>
            <section>
              <h2>1. Information We Collect</h2>
              <p>We receive and store any information you provide in relation to Ashura Services.</p>
            </section>
            <section>
              <h2>2. Purpose of Processing</h2>
              <p>We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers.</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyPage;
