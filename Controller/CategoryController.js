import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";
export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating  New Category",
      error,
    });
  }
};

export const UpdateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Category",
    });
  }
};
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories list",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while gwtting all categories",
    });
  }
};
export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await CategoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single category",
    });
  }
};
export const deleteCategeoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};
