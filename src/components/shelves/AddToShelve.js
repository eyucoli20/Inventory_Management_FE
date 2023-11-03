import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import usePost from "../../service/usePost";

export default function AddToShelve() {
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
      quantityOnShelf: "",
      minThreshold: "",
      maxThreshold: "",
      numericOrWeightValue: 'lbs'

    },
  });

  const { mutate, error, isError, isLoading, isSuccess, data } = usePost("shelves/add-product",formik.values);

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
        name="quantityOnShelf"
        fullWidth
        label="quantityOnShelf"
        value={formik.values.quantityOnShelf}
        onChange={formik.handleChange}
      />

      <TextField
        style={{ margin: "10px" }}
        name="minThreshold"
        fullWidth
        // label="expiryDate"
        type="number"
        value={formik.values.minThreshold}
        onChange={formik.handleChange}
      />
      <TextField
        style={{ margin: "10px" }}
        name="maxThreshold"
        fullWidth
        type="number"
        label="maxThreshold"
        value={formik.values.maxThreshold}
        onChange={formik.handleChange}
      />

<TextField
        style={{ margin: "10px" }}
        name="numericOrWeightValue"
        fullWidth
        label="numericOrWeightValue"
        value={formik.values.numericOrWeightValue}
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
      <p style={{ color: "red" }}>{isError ? error?.response?.data.maxThreshold : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.minThreshold : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.productID : ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.quantityOnShelf: ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.numericOrWeightValue: ""}</p>
      <p style={{ color: "red" }}>{isError ? error?.response?.data.message: ""}</p>
    </Box>
  );
}
