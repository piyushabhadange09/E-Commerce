import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaRegAddressBook } from "react-icons/fa6";
import { HiOfficeBuilding } from "react-icons/hi";
const Contact = () => {
  return (
    <Layout title={"Contect-ECommerce"}>
      <div className="contact-container">
        <div className="contact-overlay">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            Have questions, feedback, or need assistance? We’re here to help!
          </p>
          <div className="contact-content">
            {/* Contact Form */}
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here"
                  required
                />
              </div>
              <button type="submit" className="contact-submit-button">
                Send Message
              </button>
            </form>

            {/* Contact Details */}
            <div className="contact-details">
              <h2>Get in Touch</h2>
              <p>
                <BiMailSend /> : Email: support@ecommerce.com
              </p>
              <p>
                <BiPhoneCall /> : Phone: +1 234 567 890
              </p>
              <p>
                {" "}
                <FaRegAddressBook /> : Address: 123 E-commerce St, Shopville,
                USA
              </p>
              <p>
                {" "}
                <HiOfficeBuilding /> : Working Hours: Mon - Fri, 9 AM - 6 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
