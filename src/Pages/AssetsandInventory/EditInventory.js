import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Dialog from '../../DialogBox/DialogBox';
import { fetchEditInventoryAsync, getInventoryById } from "./InventorySlice";

const theme = createTheme({
  palette: {
    primary: {
      main: '#630000',
    },
  },
});

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(to right,#fb0707, #630000)",
  color: "#fff",
  border: "1px solid #fff",
  marginLeft: "10px",
  marginRight: "10px",
  "&:hover": {
    background: "#FFF",
    border: "1px solid #630000",
    "& svg": {
      color: "#630000",
    },
  },
  "& svg": {
    fontSize: "20px",
  },
}));

const EditInventory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.inventoryItems);
  const successMessage = useSelector((state) => state.inventory.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    quantity: '',
  });

  useEffect(() => {
      dispatch(getInventoryById({id}))
  }, [dispatch, id]);

  useEffect(() => {
    if (inventory) {
      setFormState({
        name: inventory.name || '',
        quantity: inventory.quantity || '',
      });
    }
  }, [inventory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formState.name ? "" : "Sender is required.";
    tempErrors.quantity = formState.quantity ? "" : "Subject is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { ...formData } = formState;
      dispatch(fetchEditInventoryAsync({ id, formData })).then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(getInventoryById({id}))
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ padding: "20px" }}>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Edit Inventory
            </Typography>
          </Box>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name*"
                name="name"
                variant="outlined"
                value={formState.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity*"
                variant="outlined"
                name="quantity"
                value={formState.quantity}
                onChange={handleInputChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: 'Red Hat Display, sans-serif',
                  backgroundColor: "#630000",
                  width: "11%",
                  '&:hover': {
                    backgroundColor: "#630000",
                  },
                }}
                type="Update"
              >
                Update
              </Button>
            </Grid>
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

export default EditInventory;
