import React, { use, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  //form -handleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success("User LoggedIn Sucessfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Login:E-Commerce"}>
      <div className="register-box">
        <div className="register">
          <h1>LOGIN FORM</h1>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>

            <div className="mt-3" style={{ width: "100vw" }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "25%" }}
                onClick={() => navigate("/forgot-password")}
              >
                FORGOT PASSWORD
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
