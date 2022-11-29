import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import WebFont from "webfontloader";
import { useState, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import store from "./store";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
// import { getAllCategories } from "./actions/categoryAction";
import CategoryList from "./component/Admin/Category";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  const ElementsLayout = ({ stripe }) => (
    <Elements stripe={stripe}>
      <Outlet />
    </Elements>
  );

  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid Sans", "Chilanka"],
    //   },
    // });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        {stripeApiKey && (
          <Route element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          </Route>
        )}

        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact element={<ProtectedRoute />}>
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/login/shipping" element={<Shipping />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/category" element={<CategoryList />} />
        </Route>
        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/products" element={<ProductList />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/users" element={<UsersList />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>

        <Route isAdmin={true} exact element={<ProtectedRoute />}>
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
