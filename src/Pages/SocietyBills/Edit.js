import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Dialog from '../../DialogBox/DialogBox';
import { editBill, getBillById } from "./SocietyBillsSlice";

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

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.societyBills.bills);
  const successMessage = useSelector((state) => state.societyBills.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [fileName, setFileName] = useState("");

  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    status: '',
    monthAndYear: '',
    pictures: null,
  });

  useEffect(() => {
    dispatch(getBillById({ id }));
  }, [dispatch, id]);

  const statusOptions = ['Paid', 'Unpaid'];

  useEffect(() => {
    if (bills) {
      setFormState({
        name: bills.name || '',
        amount: bills.amount || '',
        status: bills.status || '',
        monthAndYear: bills.monthAndYear || '',
        pictures: null,
      });
      setFileName(bills.pictures ? bills.pictures.split('/').pop() : "");
    }
  }, [bills]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormState({ ...formState, pictures: e.target.files[0] });
    setFileName(e.target.files[0] ? e.target.files[0].name : bills.pictures.split('/').pop());
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formState.name ? "" : "Name is required.";
    tempErrors.amount = formState.amount ? "" : "Amount is required.";
    tempErrors.status = formState.status ? "" : "Status is required.";
    tempErrors.monthAndYear = formState.monthAndYear ? "" : "Date is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { pictures, ...formData } = formState;
      const updateData = new FormData();
      for (const key in formData) {
        updateData.append(key, formData[key]);
      }
      if (pictures) {
        updateData.append('pictures', pictures);
      }

      dispatch(editBill({ id, formData: updateData })).then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(getBillById({ id }));
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box >
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Edit Bill
            </Typography>
          </Box>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bill"
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
                label="Amount"
                variant="outlined"
                name="amount"
                value={formState.amount}
                onChange={handleInputChange}
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Month And Year'
                name='monthAndYear'
                value={formState.monthAndYear}
                onChange={handleInputChange}
                variant='outlined'
                required
                error={!!errors.monthAndYear}
                helperText={errors.monthAndYear}
                type='month'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={formState.status}
                  onChange={handleInputChange}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
                {errors.status && <Typography color="error">{errors.status}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="*"
                style={{ display: 'none' }}
                id="file-input"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    color: '#630000',
                    backgroundColor: '#fff',
                    border: '1px solid #630000',
                    fontWeight: '600',
                    fontSize: 15,
                    fontFamily: 'Red Hat Display, sans-serif',
                    '&:hover': {
                      backgroundColor: '#630000',
                      color: '#fff',
                    },
                  }}
                >
                  Upload
                </Button>
              </label>
              {fileName && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Current File: {fileName}
                </Typography>
              )}
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

export default Edit;
