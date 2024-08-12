import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Dialog from '../../DialogBox/DialogBox';
import { getAmenityByIdAndUserId, updateAmenityBooking } from "./BookingSlice";

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
  const { userId } = useParams();
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.bookings.successMessage);
  const booking = useSelector((state) => state.bookings.booking);
  const statusOptions = ["InProgress", "Completed", "Cancelled"];
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [editDate, setEditDate] = useState(false);

  // State to hold the initial date value
  const [initialDate, setInitialDate] = useState('');

  const [formState, setFormState] = useState({
    payed: '',
    pending: '',
    dateOfBooking: '',
    status: '',
  });

  useEffect(() => {
    dispatch(getAmenityByIdAndUserId({ id, userId }));
  }, [dispatch]);

  useEffect(() => {
    if (booking) {
      setFormState({
        payed: booking.payed || '',
        pending: booking.pending || '',
        dateOfBooking: booking.dateOfBooking || '',
        status: booking.status || '',
      });
      // Set the initial date
      setInitialDate(booking.dateOfBooking || '');
    }
  }, [booking]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.payed = formState.payed ? "" : "Payed is required.";
    tempErrors.pending = formState.pending ? "" : "Pending is required.";
    tempErrors.dateOfBooking = formState.dateOfBooking ? "" : "Date is required.";
    tempErrors.status = formState.status ? "" : "Status is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { ...formData } = formState;
      dispatch(updateAmenityBooking({ id, userId, formData }))
        .then(() => {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            // Reset dateOfBooking to initial state
            setFormState((prev) => ({ ...prev, dateOfBooking: initialDate }));
          }, 2000);
          dispatch(getAmenityByIdAndUserId({ id, userId }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Edit Booking
            </Typography>
          </Box>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Paid*"
                name="payed"
                variant="outlined"
                value={formState.payed}
                onChange={handleInputChange}
                error={!!errors.payed}
                helperText={errors.payed}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pending*"
                variant="outlined"
                name="pending"
                value={formState.pending}
                onChange={handleInputChange}
                error={!!errors.pending}
                helperText={errors.pending}
              />
            </Grid>
            <Grid item xs={6}>
              {editDate ? (
                <TextField
                  fullWidth
                  label="Date and Time*"
                  variant="outlined"
                  name="dateOfBooking"
                  value={formState.dateOfBooking}
                  onChange={handleInputChange}
                  error={!!errors.dateOfBooking}
                  helperText={errors.dateOfBooking}
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                />
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Date and Time*"
                    variant="outlined"
                    name="dateOfBooking"
                    value={new Date(formState.dateOfBooking).toLocaleString()}
                    onChange={handleInputChange}
                    error={!!errors.dateOfBooking}
                    helperText={errors.dateOfBooking}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Button sx={{
                    border: '1px solid #630000',
                    marginTop: "10px",
                    backgroundColor: "#ffff",
                    color: "#630000",
                    '&:hover': {
                      backgroundColor: "#630000",
                      color: "#fff",
                    },
                  }} onClick={() => setEditDate(true)}>Change Time</Button>
                </>
              )}
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
            <Grid item xs={12} sx={{marginTop: 10, display:"flex", justifyContent:"center"}}>
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
                type="submit"
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