import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Grid, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createNotice } from '../Notice/NoticeSlice';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from '@mui/system'; 
import Dialog from '../../DialogBox/DialogBox';

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

const AddNotice = () => {
  const dispatch = useDispatch();
  const societyId = "6683b57b073739a31e8350d0";
  const [formData, setFormData] = useState({
    societyId: societyId, 
    sender: '',
    subject: '',
    description: '',
    date: '',
  });


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [submitHover, setSubmitHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.notice.successMessage);

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
    dispatch(createNotice(formData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          societyId: societyId, 
          sender: '',
          subject: '',
          description: '',
          date: '',
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/notice");
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
              Add Notice
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Sender'
                name='sender'
                value={formData.sender}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.sender}
                helperText={errors.sender}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.subject}
                helperText={errors.subject}
              />
            </Grid> 
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Date and Time'
                name='date'
                value={formData.date}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.date}
                helperText={errors.date}
                type='datetime-local'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                style={{
                  backgroundColor: submitHover ? '#630000' : '#630000',
                  color: submitHover ? 'white' : 'white',
                  borderColor: submitHover ? '#630000' : 'transparent',
                  fontFamily: 'Red Hat Display, sans-serif',
                  width: "11%"
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

export default AddNotice;