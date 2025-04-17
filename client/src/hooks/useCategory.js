import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      console.log("API Response:", data); // Debugging
      setCategories(data?.categories || []); // Ensure it doesn't break if undefined
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log("Categories State:", categories); // Debugging

  return categories;
}
