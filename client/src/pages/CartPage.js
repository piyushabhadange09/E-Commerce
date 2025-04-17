import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const TotalPrice = () => {
    try {
      let total = cart?.reduce((sum, item) => sum + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Braintree token
  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/braintree/token");
        console.log("Braintree Token:", data?.clientToken);
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log("Error fetching Braintree token:", error);
      }
    };
    if (auth?.token) getToken();
  }, [auth?.token]);

  // Handle payment
  const handleOrderCreation = async () => {
    try {
      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      setLoading(true);

      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        cart,
      });

      setLoading(false);

      if (data.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Order placed successfully");
      } else {
        toast.error(data.message || "Failed to create order.");
      }
    } catch (error) {
      console.error("Order Creation Error:", error);
      setLoading(false);
      toast.error("Order creation failed. Please try again.");
    }
  };

  return (
    <Layout title={"My Cart: E-Commerce"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mt-4 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? " " : "please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/get-product-photo/${p._id}`}
                    className="card-img-top product-container"
                    alt={p.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {TotalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleOrderCreation}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
