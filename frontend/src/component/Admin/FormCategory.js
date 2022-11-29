import { Box, Button, Input, Modal, Typography } from "@material-ui/core";
import * as React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useAlert } from "react-alert";
import axios from "axios";
import "./FormCategory.css";

export default function FormCategory({ type, data, getData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);

    if (type === "edit") {
      setNameCategory(data.row.name);
      setDescriptionCategory(data.row.description);
    } else {
      setNameCategory("");
      setDescriptionCategory("");
    }
  };
  const handleClose = () => setOpen(false);
  const [nameCategory, setNameCategory] = React.useState("");
  const [descriptionCategory, setDescriptionCategory] = React.useState("");

  const alert = useAlert();
  const onSave = async () => {
    if (nameCategory && nameCategory.length <= 0) {
      alert.error("Name is required");
    }
    // call api
    if (type === "edit") {
      const res = await axios.put(`/api/v1/admin/category/${data.row.id}`, {
        name: nameCategory,
        description: descriptionCategory,
      });
      if (res.status === 200) {
        alert.success("Update category success");
        getData();
        handleClose();
      }
    } else {
      const res = await axios.post(`/api/v1/admin/category`, {
        name: nameCategory,
        description: descriptionCategory,
      });
      if (res.status === 201) {
        alert.success("Create category success");
        getData();
        handleClose();
      }
    }
  };
  // La hai cái này

  return (
    <div>
      {type === "add" ? (
        <Button className="cate" variant="contained" onClick={handleOpen} p>
          Add Category
        </Button>
      ) : (
        <Button onClick={handleOpen} p>
          <EditIcon />
        </Button>
      )}

      <Modal
        style={{
          marginTop: "250px",
          width: "400px",
          margin: "auto",
        }}
        open={open}
        onClose={handleClose}
      >
        <Box>
            <div className="cate-box">
            <Typography
              style={{  fontFamily: "Verdana, Geneva, Tahoma, sans-serif", 
                        fontWeight: "800" ,
                        fontSize: "2rem",
                        textAlign: "center"
                    }}
            >
              {type === "edit" ? `Edit Category` : `Create Category`}
            </Typography>
            <div className="cate-content">
              {/* create form to create category */}
              <p>Name</p>
              <Input
                required
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
                style={{ width: "90%", marginLeft: "1rem" }}
                placeholder="Name"
              />{" "}
              <br />
              <p>Description</p>
              <Input
                value={descriptionCategory}
                onChange={(e) => setDescriptionCategory(e.target.value)}
                style={{ width: "90%", marginLeft: "1rem" }}
                placeholder="Description"
              />
              <br />
              <div className="cate-btn"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "15px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#196B69",
                    color: "white",
                  }}
                  onClick={onSave}
                  variant="contained"
                >
                  {type === "edit" ? `Edit` : `Create`}
                </Button>
                <br />
                <Button
                  style={{ backgroundColor: "#196B69", color: "white"}}
                  variant="contained"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
