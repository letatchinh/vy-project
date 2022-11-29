const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const Category = require("../models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create New Categiry
exports.newcategory = catchAsyncErrors(async (req, res, next) => {
  const { name, description } = req.body;

  const category = await Category.create({
    name,
    description,
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// get all Categiry -- Admin
exports.getAllcategorys = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// update Categiry Status -- Admin
exports.updatecategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHander("category not found with this Id", 404));
  }
  category.name = req.body.name;
  category.description = req.body.description;
  await category.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// delete Categiry -- Admin
exports.deletecategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("category not found with this Id", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
  });
});
