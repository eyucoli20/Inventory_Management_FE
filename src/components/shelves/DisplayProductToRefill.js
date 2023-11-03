import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import useGet from "../../service/useGet";
import { baseURL } from "../../constant";
import { useFormik } from "formik";
import useApi from "../../service/api";

function DisplayProductToRefill() {
  const { data, isLoading:isLoadingAll } = useGet(`${baseURL}shelves/products-to-refill`);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "product.productID",
        header: "productID",
      },
      {
        accessorKey: "product.productName",
        header: "productName",
      },
      {
        accessorKey: "quantityOnShelf",
        header: "quantityOnShelf",
      },
      {
        accessorKey: "minThreshold",
        header: "minThreshold",
      },
      {
        accessorKey: "maxThreshold",
        header: "maxThreshold",
      },
      {
        accessorKey: "amountToReplenish",
        header: "amountToReplenish",
      },
      {
        accessorKey: "lastReplenishmentTimestamp",
        header: "lastReplenishmentTimestamp",
      },
    ],
    []
  );

  const columns1 = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "product.productID",
        header: "productID",
      },
      {
        accessorKey: "product.productName",
        header: "productName",
      },
      {
        accessorKey: "quantityOnShelf",
        header: "quantityOnShelf",
      },
      {
        accessorKey: "minThreshold",
        header: "minThreshold",
      },
      {
        accessorKey: "maxThreshold",
        header: "maxThreshold",
      },
      {
        accessorKey: "amountToReplenish",
        header: "amountToReplenish",
      },
      {
        accessorKey: "lastReplenishmentTimestamp",
        header: "lastReplenishmentTimestamp",
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues: {
      productID: "",
      productName: "",
      expiryDate: "",
      timeDurationForMarkDown: "",
    },
  });
  const [singleData,setSingleData] = useState([])
  const { loading, error, get,clearError} = useApi();
  

  const handleGet = () => {
    const fetchData = async () => {
        clearError()
        try {
          const products = await get(`shelves/products-to-refill/${formik.values.productID}`); // 'products' is the endpoint you want to fetch data from
         
          setSingleData([products]);
        
        } catch (error) {
            setSingleData([]);
            
        //   console.error(error); // Handle errors if the request fails
        }
      };
      fetchData();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "80%",
            height: "80vh",
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h6">Display Product To Refill </Typography>
          <MaterialReactTable
            state={{ isLoading: isLoadingAll }}
            columns={columns}
            data={tableData || []}
          />
        </Paper>

        <Paper elevation={3}>
          <Typography> Display Product To Refill by id</Typography>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <TextField
                name="productID"
                label="productID"
                fullWidth
                value={formik.values.productID}
                onChange={formik.handleChange}
              />
            </div>

            <div style={{ display: "flex", justifySelf: "center" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={isLoadingAll}
                onClick={handleGet}
              >
                {loading ? "Fetching..." : "Display"}
              </Button>
              
            </div>
            
          </div>
          <MaterialReactTable
            state={{ isLoading: loading }}
            columns={columns1}
            data={singleData}
          />
          <p style={{color:'red'}}>{error?error?.message:''}</p>
        
        </Paper>
      </Box>
    </div>
  );
}

export default DisplayProductToRefill;
