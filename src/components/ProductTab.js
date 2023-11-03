import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddProduct from "./products/AddProduct";
import DisplayProducts from "./products/DisplayProducts";
import DisplayProductsExpiryDate from "./products/DisplayProductsExpiryDate";
import DisplayProductsInMarkDown from "./products/DisplayProductsInMarkDown";
import DisplayProductsForMarkDown from "./products/DisplayProductsForMarkDown";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Create Product" {...a11yProps(0)} />
          <Tab label="Display Product" {...a11yProps(1)} />
          <Tab label="Display Product Expired" {...a11yProps(2)} />
          <Tab label="Display Products In MarkDown" {...a11yProps(3)} />
          <Tab label="Display Products For MarkDown" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddProduct />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DisplayProducts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DisplayProductsExpiryDate />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DisplayProductsInMarkDown />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <DisplayProductsForMarkDown />
      </CustomTabPanel>
    </Box>
  );
}
