const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  addToCart,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Register
router.route("/register").post(registerUser);

// Login
router.route("/login").post(loginUser);

// Logout
router.route("/logout").get(logout);

// Password
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// Profile
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/addToCart").put(addToCart);

// Admin -- Get user
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin", "staff"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin", "staff"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin", "staff"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "staff"), deleteUser);

module.exports = router;
