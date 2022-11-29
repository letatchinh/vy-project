import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
// import { Button, Input } from "@material-ui/core";
import { Input } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
// import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { getAllUsers, clearErrors} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  // const deleteUserHandler = (id) => {
  //   dispatch(deleteUser(id));
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 120,
      flex: 0.4,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            {/* <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState("");
  useEffect(() => {
    const data = [];
    users &&
      users.forEach((item) => {
        data.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });
    if (search) {
      setRows(
        data.filter(
          (item) => item.name.includes(search) || item.email.includes(search)
        )
      );
    } else {
      setRows(data);
    }
  }, [users, search]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All users</h1>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name or email"
            style={{ marginBottom: 5, width: "50%", marginLeft: 10 }}
          />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
