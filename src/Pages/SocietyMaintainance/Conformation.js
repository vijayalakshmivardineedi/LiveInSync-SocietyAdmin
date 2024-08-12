import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Dialog from '../../DialogBox/DialogBox';
import { getOne, updatePaymentStatus } from "./SocietyMaintainanceSlice";

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

const Confirm = () => {
  const { blockno, flatno, monthAndYear } = useParams();
  const dispatch = useDispatch();
  const maintainance = useSelector((state) => state.maintainance.maintainances);
  const successMessage = useSelector((state) => state.maintainance.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const societyId = "6683b57b073739a31e8350d0";

  const statusOptions = ["Paid", "UnPaid", "Confirm", "Pending"];
  const [formState, setFormState] = useState({
    societyId: societyId,
    userId: '',
    name: '',
    blockno: '',
    flatno: '',
    paidAmount: '',
    transactionType: '',
    status: '',
    monthAndYear: '',
  });

  useEffect(() => {
    dispatch(getOne({ blockno, flatno, monthAndYear }));
  }, [dispatch, blockno, flatno, monthAndYear]);

  useEffect(() => {
    if (maintainance) {
      setFormState({
        societyId: societyId,
        userId: maintainance.userId || '',
        name: maintainance.name || '',
        blockno: maintainance.blockno || '',
        flatno: maintainance.flatno || '',
        paidAmount: maintainance.paidAmount || '',
        transactionType: "Cash",
        status: maintainance.status || '',
        monthAndYear: monthAndYear,
      });
    }
  }, [maintainance]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.userId = formState.userId ? "" : "User Id is required.";
    tempErrors.name = formState.name ? "" : "Name is required.";
    tempErrors.paidAmount = formState.paidAmount ? "" : "Amount is required.";
    tempErrors.monthAndYear = formState.monthAndYear ? "" : "Month and Year are required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      for (const key in formState) {
        formData.append(key, formState[key]);
      }
      dispatch(updatePaymentStatus({ formData })).then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(getOne({ blockno, flatno, monthAndYear }));
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
              Status Update
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 3 }}>
          <img
            src={`http://localhost:2000${maintainance.pictures}`}
            alt={maintainance.name}
            style={{ width: '250px', height: '250px', borderRadius: "10%" }}
          />
        </Typography>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="User Id"
                name="userId"
                variant="outlined"
                value={formState.userId}
                onChange={handleInputChange}
                error={!!errors.userId}
                helperText={errors.userId}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formState.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled
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
                disabled
                error={!!errors.monthAndYear}
                helperText={errors.monthAndYear}
                type='month'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Block-No"
                name="blockno"
                variant="outlined"
                value={formState.blockno}
                onChange={handleInputChange}
                error={!!errors.blockno}
                helperText={errors.blockno}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Flat-No"
                name="flatno"
                variant="outlined"
                value={formState.flatno}
                onChange={handleInputChange}
                error={!!errors.flatno}
                helperText={errors.flatno}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Paid Amount"
                variant="outlined"
                name="paidAmount"
                value={formState.paidAmount}
                onChange={handleInputChange}
                error={!!errors.paidAmount}
                helperText={errors.paidAmount}
                disabled
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
          </Grid>
          <Box style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                color: "#fff",
                backgroundColor: "#630000",
                border: "1px solid #630000",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Red Hat Display, sans-serif",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#630000",
                  border: "1px solid #fff",
                  color: "#fff",
                },
              }}
            >
              Save
            </Button>
          </Box>
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

export default Confirm;