import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import usePost from "../../service/usePost";

export default function AddProduct() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid whiteSmoke",
    boxShadow: 24,
    p: 4,
  };
  const formik = useFormik({
    initialValues: {
      productID: "",
      productName: "",
      expiryDate: "",
      timeDurationForMarkDown: "",
    },
  });

  const { mutate, error, isError, isLoading, isSuccess, data } = usePost(
    "products",
    formik.values
  );

  
  const handleAdd = async () => {
    try {
      mutate(formik.values);
      
      // Handle the response data as needed
    } catch (error) {
      // Handle the error
    }
  };
  return (
    <Box sx={style}>
      <TextField
        style={{ margin: "10px" }}
        name="productID"
        fullWidth
        label="productID"
        value={formik.values.productID}
        onChange={formik.handleChange}
      />
      <TextField
        style={{ margin: "10px" }}
        name="productName"
        fullWidth
        label="productName"
        value={formik.values.productName}
        onChange={formik.handleChange}
      />
      <InputLabel
        style={{
          display: "flex",
          justifyContent: "start",
          paddingLeft: "15px",
        }}
      >
        expiryDate
      </InputLabel>
      <TextField
        style={{ margin: "10px" }}
        name="expiryDate"
        fullWidth
        // label="expiryDate"
        type="date"
        value={formik.values.expiryDate}
        onChange={formik.handleChange}
      />
      <TextField
        style={{ margin: "10px" }}
        name="timeDurationForMarkDown"
        fullWidth
        type="number"
        label="timeDurationForMarkDown"
        value={formik.values.timeDurationForMarkDown}
        onChange={formik.handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={handleAdd}
      >
        {isLoading ? "Adding..." : "Add"}
      </Button>
      
      <p style={{color:'green'}}>{isSuccess ? data?.data?.message : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.productID : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.productName : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.message : ""}</p>
    </Box>
  );
}
