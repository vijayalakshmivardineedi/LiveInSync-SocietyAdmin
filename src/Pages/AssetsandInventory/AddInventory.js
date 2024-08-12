import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Box, Grid, createTheme, ThemeProvider, styled, IconButton } from "@mui/material";
import { fetchaddInventory } from "../AssetsandInventory/InventorySlice";
import { IoArrowBackSharp } from "react-icons/io5";
import Dialog from '../../DialogBox/DialogBox';

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(to right, #630000, #630000)',
  color: '#fff',
  border: "1px solid #fff",
  marginLeft: "10px",
  marginRight: "10px",
  '&:hover': {
    background: "#FFF",
    border: "1px solid #630000",
    '& svg': {
      color: '#630000',
    },
  },
  '& svg': {
    fontSize: "20px",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000"
    }
  }
});

const AddInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector(state => state.inventory.successMessage);
  const [showDialog, setShowDialog] = useState(false);
  const [inventoryData, setInventoryData] = useState({
    name: "",
    quantity: "",
    societyId: "6683b57b073739a31e8350d0"
  });
  const [error, setError] = useState(null);


  const handleChange = e => {
    const { name, value } = e.target;
    setInventoryData({
      ...inventoryData,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(fetchaddInventory(inventoryData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/inventory");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ marginTop: "20px", padding: "15px", color: "#630000" }}>
        <Box
          sx={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Add Inventory
            </Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={inventoryData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity"
                variant="outlined"
                type="number"
                value={inventoryData.quantity}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "#630000",
              color: "#ffffff",
              width: "11%",
            }}
          >
            Add
          </Button>
          </Grid>
        </form>
        <Dialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AddInventory;