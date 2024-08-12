import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Grid, IconButton, createTheme, ThemeProvider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from '@mui/system'; 
import Dialog from '../../DialogBox/DialogBox';
import { bookAmenity } from './BookingSlice';

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

const Add = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    userId: '',
    payed: '',
    pending: '',
    dateOfBooking: '',
    status: '',
  });

console.log(id)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [submitHover, setSubmitHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.bookings.successMessage);
  const statusOptions = ["InProgress", "Completed", "Cancelled"];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(bookAmenity({id, formData})).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          userId: '',
          payed: '',
          pending: '',
          dateOfBooking: '',
          status: '',
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/bookings");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
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
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif',fontSize:"23px", fontWeight: '700', color: '#630000' }}>
              Add Booking
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='User Id'
                name='userId'
                value={formData.userId}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.userId}
                helperText={errors.userId}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Paid'
                name='payed'
                value={formData.payed}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.payed}
                helperText={errors.payed}
              />
            </Grid> 
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Pending'
                name='pending'
                value={formData.pending}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.pending}
                helperText={errors.pending}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Date and Time'
                name='dateOfBooking'
                value={formData.dateOfBooking}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.dateOfBooking}
                helperText={errors.dateOfBooking}
                type='datetime-local'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
            
            <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                style={{
                  backgroundColor: submitHover ? '#630000' : '#630000',
                  color: submitHover ? 'white' : 'white',
                  borderColor: submitHover ? '#630000' : 'transparent',
                  fontFamily: 'Red Hat Display, sans-serif',
                  width: "20%"
                }}
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box> 
        <Dialog
        message={successMessage}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
      </Box>
    </ThemeProvider>
  );
};

export default Add;