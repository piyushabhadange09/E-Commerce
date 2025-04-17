import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  // State declarations
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // For shipping, assume the backend expects "0" or "1"
  const [shipping, setShipping] = useState("");
  // Store category as a string (the category id)
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  // Get single product details
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      const product = data.product;
      setName(product.name);
      setDescription(product.description);
      setId(product._id);
      // Optionally, set the photo if needed:
      // setPhoto(product.photo);
      setPrice(product.price);
      setQuantity(product.quantity);
      // Set category properly (if it's an object, extract _id)
      setCategory(
        typeof product.category === "object"
          ? product.category._id
          : product.category
      );
      setShipping(product.shipping);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching product details");
    }
  };

  useEffect(() => {
    if (params.slug) {
      getSingleProduct();
    }
  }, [params.slug]);

  // Get all categories to populate the category dropdown
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the product");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.data?.message || error.message
      );
      toast.error("Something went wrong while deleting the product");
    }
  };

  return (
    <Layout title={"Update Product : E-Commerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Category Select */}
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category} // value is the category id string
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Product Image Preview */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-preview"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/get-product-photo/${id}`}
                      alt="product-preview"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Enter Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price Input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity Input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping Select */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping Option"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping} // expect "0" or "1"
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Update Button */}
              <div className="mb-3 text-center">
                <button
                  className="btn btn-primary text-center"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>

              {/* Delete Button */}
              <div className="mb-3 text-center">
                <button
                  className="btn btn-danger text-center"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
