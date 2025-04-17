import React from "react";
import Layout from "../components/Layout/Layout";

const Policies = () => {
  const policyData = [
    {
      title: "Data Collection",
      content:
        "We collect personal information when you register, place an order, or interact with our website. This includes your name, email address, shipping address, phone number, and payment details.",
    },
    {
      title: "Use of Data",
      content:
        "The information we collect is used to process orders, improve our services, communicate with you about your orders and promotions, and personalize your shopping experience.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "We use cookies to enhance user experience and track website activity. Cookies help us personalize content, analyze website traffic, and improve site functionality.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may share your information with trusted third-party services such as payment processors, shipping companies, and marketing partners.",
    },
    {
      title: "Security Measures",
      content:
        "We take the security of your personal data seriously. We use industry-standard encryption protocols to protect your payment information and prevent unauthorized access.",
    },
    {
      title: "User Rights",
      content:
        "You have the right to access, correct, or delete your personal information at any time. You may also request a copy of your data.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.",
    },
    {
      title: "Updates to This Policy",
      content:
        "We may update our Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
    },
  ];

  return (
    <Layout title={"Pollicies:E-Commerce"}>
      <div className="policies-container">
        <h1 className="policies-title">Privacy Policies</h1>

        <div className="policies-cards-container">
          {policyData.map((policy, index) => (
            <div key={index} className="policy-card">
              <h2 className="policy-card-title">{policy.title}</h2>
              <p className="policy-card-content">{policy.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Policies;
