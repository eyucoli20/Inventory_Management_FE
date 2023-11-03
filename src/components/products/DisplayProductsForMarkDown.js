import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import useGet from "../../service/useGet";
import { baseURL } from "../../constant";

function DisplayProductsForMarkDown() {
  const { data, isLoading: isLoadingAll } = useGet(
    `${baseURL}products/for-mark-down`
  );
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
          <Typography variant="h6">Display All Products For Markdown</Typography>
          <MaterialReactTable
            state={{ isLoading: isLoadingAll }}
            columns={columns}
            data={tableData || []}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default DisplayProductsForMarkDown;
