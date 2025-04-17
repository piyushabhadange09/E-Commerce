import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [realtedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);
  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get realted product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-3 ms-1">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/get-product-photo/${product._id}`}
            className="card-img-top product-conatiner mt-5 ms-5"
            alt={product.name}
            style={{
              width: "300px",
              height: "250px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Category : {product.category?.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Quantity : {product.quantity}</h6>
          <button
            href="#"
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product Added to your cart Successfully");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        <div className="d-flex flex-wrap">
          {realtedProduct.length > 0 ? (
            realtedProduct.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>

                  <button
                    href="#"
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Product Added to your cart Successfully");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No related products available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
