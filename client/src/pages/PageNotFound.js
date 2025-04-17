import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"Go Back"}>
      <div className="black-white-container">
        <h1 className="black-white-title">404</h1>
        <p className="black-white-subtitle">Page Not Found</p>
        <p className="black-white-message">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="black-white-button">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
