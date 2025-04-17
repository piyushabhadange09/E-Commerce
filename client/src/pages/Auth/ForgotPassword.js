import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  //form -handleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success("Password Reset Successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Forgot Password : E-Commerce App"}>
      <div className="register-box">
        <div className="register">
          <h1>RESET PASSWORD</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="What is Your Favourite Place?"
                required
              />
            </div>

            <div className="mb-3">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter Your New Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
