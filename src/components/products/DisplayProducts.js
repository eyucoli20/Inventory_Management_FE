import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import useGet from "../../service/useGet";
import { baseURL } from "../../constant";
import { useFormik } from "formik";
import useApi from "../../service/api";

function DisplayProducts() {
  const { data, isLoading:isLoadingAll } = useGet(`${baseURL}products`);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "productID",
        header: "productID",
      },
      {
        accessorKey: "productName",
        header: "productName",
      },
      {
        accessorKey: "expiryDate",
        header: "expiryDate",
      },
      {
        accessorKey: "timeDurationForMarkDown",
        header: "timeDurationForMarkDown",
      },
    ],
    []
  );

  const columns1 = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "productID",
        header: "productID",
      },
      {
        accessorKey: "productName",
        header: "productName",
      },
      {
        accessorKey: "expiryDate",
        header: "expiryDate",
      },
      {
        accessorKey: "timeDurationForMarkDown",
        header: "timeDurationForMarkDown",
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
          const products = await get(`products/${formik.values.productID}`); // 'products' is the endpoint you want to fetch data from
          
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
          <Typography variant="h6">Display All Products</Typography>
          <MaterialReactTable
            state={{ isLoading: isLoadingAll }}
            columns={columns}
            data={tableData || []}
          />
        </Paper>

        <Paper elevation={3}>
          <Typography> Display product by id</Typography>
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

export default DisplayProducts;
