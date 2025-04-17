import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About-E-Commerce"}>
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          We are an innovative e-commerce platform committed to offering the
          best products with an exceptional shopping experience. Our mission is
          to provide customers with high-quality products, reliable service, and
          fast delivery. Join us in making your online shopping journey seamless
          and enjoyable!
        </p>

        <div className="about-features">
          <h2 className="features-title">Our Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3 className="feature-heading">Fast Shipping</h3>
              <p className="feature-description">
                Get your orders delivered swiftly and safely with our fast
                shipping options.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-heading">Quality Products</h3>
              <p className="feature-description">
                We offer a vast selection of high-quality products to meet your
                every need.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-heading">24/7 Customer Support</h3>
              <p className="feature-description">
                Our dedicated customer support team is available around the
                clock to assist you.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-heading">Secure Payments</h3>
              <p className="feature-description">
                We offer secure payment methods to ensure your transactions are
                safe and worry-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
