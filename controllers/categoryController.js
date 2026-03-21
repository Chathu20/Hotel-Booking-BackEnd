import Category from "../models/category.js";
import { isAdminValid } from "./userController.js";

//--------Create Category--------
export function createCategory(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.user.type !== "admin") { // 🔥 FIXED (Admin capital)
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const newCategory = new Category(req.body);

  newCategory
    .save()
    .then((result) => {
      res.json({
        message: "Category created successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Category creation failed",
        error: err,
      });
    });
}

//--------Delete Category--------
export function deleteCategory(req, res) {
  if (!isAdminValid(req)) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const name = req.params.name;

  Category.findOneAndDelete({ name })
    .then(() => {
      res.json({
        message: "Category Deleted Successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Category Deletion Failed",
      });
    });
}

//--------Get All--------
export function getCategory(req, res) {
  Category.find()
    .then((result) => {
      res.json({
        categories: result,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to get Categories",
      });
    });
}

//--------Get By Name--------
export function getCategoryByName(req, res) {
  const name = req.params.name;

  Category.findOne({ name })
    .then((result) => {
      if (!result) {
        return res.json({
          message: "Category not found",
        });
      }

      res.json({
        category: result,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to get Category",
      });
    });
}

//--------Update--------
export function updateCategory(req, res) {
  if (!isAdminValid(req)) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const name = req.params.name;

  Category.updateOne({ name }, req.body)
    .then(() => {
      res.json({
        message: "Category Updated Successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to Update Category",
      });
    });
}