import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/Search";
import { useNavigate } from "react-router-dom";
const Search = () => {
  // Capitalized the "search" component to "Search"
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.length > 0 ? (
              values?.results.map((p) => (
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

export default Search;
