import { Typography } from '@material-ui/core';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import MetaData from "../layout/MetaData";
// import { getAllCategories } from "../../actions/categoryAction";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
    products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#196B69"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["red", "#196B69"],
                hoverBackgroundColor: ["#8a0101", "#132F2B"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ${totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <h1 className='lineChart_Heading'>Total Amount</h1>
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <h1 className='doughnutChart_Heading'>The number of products</h1>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;