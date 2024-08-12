import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdvertisementsById } from './AdvertisementSlice';
import { Box, Typography, CircularProgress, IconButton, Paper, Grid } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#630000',
    },
  },
});

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(to right,#FB0707, #630000)",
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

const ViewAdd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const advertisement = useSelector((state) => state.advertisements.adds);
  const status = useSelector((state) => state.advertisements.status);
  const error = useSelector((state) => state.advertisements.error);

  useEffect(() => {
    dispatch(getAdvertisementsById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (status === 'failed') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography variant="h6" color="error">Error: {error}</Typography></Box>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ width: "100%", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", position: 'relative' }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}> View Advertisement </Typography>
          </Box>
        </Box>

        {advertisement ? (
          <Paper elevation={3} sx={{ marginTop: 3, padding: '20px', marginBottom: '20px' }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={true} transitionTime={1500}>
                  {Array.isArray(advertisement.pictures) && advertisement.pictures.length > 0 ? (
                    advertisement.pictures.map((pic, index) => (
                      <Box key={index} sx={{ width: '100%', height: '300px', overflow: 'hidden', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`http://localhost:2000${pic.img}`} alt={`Advertisement ${index}`} style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography variant="body1">No images available.</Typography>
                    </Box>
                  )}
                </Carousel>
              </Grid>
              <Grid item xs={6}  sx={{ display: "flex", justifyContent: "space-between", marginTop: 5}}>
                <Grid>
                  <Typography variant="h4" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>User ID:</strong> {advertisement.userId}</Typography>
                  <Typography variant="h4" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Name:</strong> {advertisement.userName}</Typography>
                  <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Mobile Number:</strong> {advertisement.phoneNumber}</Typography>
                  <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Type:</strong> {advertisement.adv}</Typography>
                  <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Status:</strong> {advertisement.status}</Typography>
                  {advertisement.address && (
                    <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Address:</strong> {`${advertisement.address.addressLine1 || ''}, ${advertisement.address.addressLine2 || ''}, ${advertisement.address.state || ''}, ${advertisement.address.postalCode || ''}`}</Typography>
                  )}
                </Grid>
                <Grid sx={{marginRight: '20%'}}>
                  {advertisement.details ? (
                    <>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Block:</strong> {advertisement.details.block}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Flat No:</strong> {advertisement.details.flat_No}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Flat Area:</strong> {advertisement.details.flat_Area}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Rooms:</strong> {advertisement.details.rooms}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Rest-Rooms:</strong> {advertisement.details.washrooms}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Price:</strong> {advertisement.details.price}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Maintainance Price:</strong> {advertisement.details.maintainancePrice}</Typography>
                      <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Parking Space:</strong> {advertisement.details.parkingSpace}</Typography>
                    </>
                  ) : (
                    <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Details:</strong> Information not available</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {advertisement.attendance && advertisement.attendance.length > 0 && (
              <Box marginTop="20px">
                <Typography variant="h6" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 23, fontWeight: 700 }}>Attendance:</Typography>
                <Grid container spacing={2}>
                  {advertisement.attendance.map((attendanceRecord, index) => (
                    <Grid item xs={12} sm={6} key={attendanceRecord._id}>
                      <Box sx={{ padding: '10px', fontFamily: "Red Hat Display, sans-serif", marginBottom: '10px', border: "1px solid lightgrey", borderRadius: 5 }}>
                        <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Date:</strong> {new Date(attendanceRecord.date).toLocaleDateString()}</Typography>
                        <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Status:</strong> {attendanceRecord.status}</Typography>
                        <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Check-in Time:</strong> {attendanceRecord.checkInDateTime ? new Date(attendanceRecord.checkInDateTime).toLocaleTimeString() : '-'}</Typography>
                        <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Check-out Time:</strong> {attendanceRecord.checkOutDateTime ? new Date(attendanceRecord.checkOutDateTime).toLocaleTimeString() : '-'}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h6">No advertisement found.</Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ViewAdd;
