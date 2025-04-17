import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const params = useParams();
  const navigate = useNavigate();
  //get product by catgeory wise
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, []);
  return (
    <Layout>
      <div className="container mt-3">
        <h2 className="text-center">Catgeory : {category?.name}</h2>
        <h6 className="text-center">{products?.length} matches found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/get-product-photo/${p._id}`}
                    className="card-img-top product-container"
                    alt={p.name}
                    style={{
                      width: "285px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">$ {p.price}</p>
                    <button
                      href="#"
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button href="#" className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
