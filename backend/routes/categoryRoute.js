const express = require("express");
const {
  getAllcategorys,
  newcategory,
  updatecategory,
  deletecategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/admin/category")
  .get(isAuthenticatedUser,getAllcategorys)
  .post(isAuthenticatedUser, authorizeRoles("admin", "staff"), newcategory);

router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "staff"), updatecategory)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "staff"),
    deletecategory
  );

module.exports = router;
