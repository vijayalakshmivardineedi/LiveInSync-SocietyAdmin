import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Grid, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from '@mui/system';
import Dialog from '../../DialogBox/DialogBox';
import { createMaintenanceRecords } from './SocietyMaintainanceSlice';

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
  const societyId = "6683b57b073739a31e8350d0";
  const [formData, setFormData] = useState({
    societyId: societyId,
    amount: '',
    monthAndYear: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [AddHover, setAddHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.maintainance.successMessage || state.maintainance.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
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

    setErrors({});
    const formDataToAdd = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToAdd.append(key, formData[key]);
    });

    try {
      const response = await dispatch(createMaintenanceRecords(formDataToAdd)).unwrap();

      if (response) {
        setFormData({
          societyId: societyId,
          amount: '',
          monthAndYear: '',
        });
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowDialog(true);
    }
  };

  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => {
        setShowDialog(false);
        navigate("/maintainance");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showDialog, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Create Monthly Maintenance Sheet
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Month And Year'
                name='monthAndYear'
                value={formData.monthAndYear}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.monthAndYear}
                helperText={errors.monthAndYear}
                type='month'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                style={{
                  backgroundColor: '#630000',
                  color: 'white',
                  borderColor: 'transparent',
                  fontFamily: 'Red Hat Display, sans-serif',
                  width: "11%"
                }}
                onMouseEnter={() => setAddHover(true)}
                onMouseLeave={() => setAddHover(false)}
                onClick={handleAdd}
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
