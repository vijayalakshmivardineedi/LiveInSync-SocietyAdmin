import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Box, Typography, Grid, Select, Link, createTheme, styled, IconButton, ThemeProvider } from '@mui/material';
import { fetchResidentProfile } from './profileSlice';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

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

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resident = useSelector(state => state.profile.profile);

  const [selectedBlock, setSelectedBlock] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [gates, setGates] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    dispatch(fetchResidentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (resident) {
      setBlocks(resident.blocks || []);
      setGates(resident.gates || []);
      setDocuments(resident.documents || []);
      if (!selectedBlock && resident.blocks && resident.blocks.length > 0) {
        setSelectedBlock(resident.blocks[0]._id);
      }
    }
  }, [resident, selectedBlock]);

  if (!resident) return <p>No resident data available.</p>;

  const { societyAddress } = resident || {};
  const addressLine1 = societyAddress?.addressLine1 || '';
  const addressLine2 = societyAddress?.addressLine2 || '';
  const state = societyAddress?.state || '';
  const postalCode = societyAddress?.postalCode || '';

  const totalBlocks = blocks.length;
  let totalFlats = 0;
  blocks.forEach((block) => {
    totalFlats += block.flats.length;
  });

  const totalGates = gates.length;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
        justifyContent: "space-between", alignItems: "center", position: 'relative', marginBottom: 3
      }}>
        <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
          <GradientIconButton onClick={() => navigate(-1)}>
            <IoArrowBackSharp />
          </GradientIconButton>
          <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
            Society Profile
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: "1px solid lightgrey", borderRadius: 5, padding: 5 }}>
        <Box>
          {resident.societyImage && resident.societyImage[0] ? (
            <img
              src={`http://localhost:2000${resident.societyImage[0]}`}
              alt={resident.societyName}
              style={{ width: '200px', height: '200px', borderRadius: '5px' }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Id Name</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident._id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Society Name</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.societyName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Society Number</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.societyMobileNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Start Date</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.startDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Expiry Date</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.expiryDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Email</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>City</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Price</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.price}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Role</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>License</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.license}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Membership</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{resident.memberShip}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Society Address</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{addressLine1}</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{addressLine2}</Typography>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 14 }}>{state}, {postalCode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Total Blocks: {totalBlocks}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Total Flats: {totalFlats}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: '700' }}>Total Gates: {totalGates}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
