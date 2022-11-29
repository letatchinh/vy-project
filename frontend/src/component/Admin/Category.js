import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./Category.css";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Input } from "@material-ui/core";
import MetaData from "../layout/MetaData";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import axios from "axios";
import FormCategory from "./FormCategory";

const CategoryList = () => {
  const columns = [
    { field: "id", headerName: "category ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "description",
      headerName: "Description",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
            <FormCategory getData={getData} type="edit" data={params} />
            <Button
              onClick={() => {
                deleteCategory(params.row.id);
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const alert = useAlert();
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/admin/category/${id}`);
      if (res) {
        alert.success("Category Deleted Successfully");
        getData();
      }
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };
  const [categories, setCategories] = React.useState([]);

  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState("");
  useEffect(() => {
    const data = [];
    categories &&
      categories.forEach((item) => {
        data.push({
          id: item._id,
          name: item.name,
          description: item.description,
        });
      });
    if (search) {
      setRows(data.filter((item) => item.name.includes(search)));
    } else {
      setRows(data);
    }
  }, [categories, search]);

  const getData = async () => {
    const res = await axios.get("/api/v1/admin/category");
    setCategories(res.data.categories);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <MetaData title={`ALL Categories - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="CContainer">
          <h1 id="categoryListHeading">All categories</h1>
          <FormCategory getData={getData} type="add" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name of category"
            style={{ marginBottom: 5, width: "50%", marginLeft: 10 }}
          />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="categoryListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;
