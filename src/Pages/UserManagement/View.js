import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUsers, fetchUserProfiles } from './ListSlice';
import { Box, Typography, Grid, IconButton, Button } from '@mui/material';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
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

const View = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const profiles = useSelector((state) => state.user.profiles) || [];
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [expandedProfile, setExpandedProfile] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
    if (userId) {
      dispatch(fetchUserProfiles({ userId }));
    }
  }, [dispatch, userId]);

  const handleToggleExpand = (id, section) => {
    setExpandedProfile((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [section]: !prevState[id]?.[section],
      },
    }));
  };

  if (status === 'loading') {
    return <Typography sx={{ fontFamily: 'Red Hat Display, sans-serif' }}>Loading...</Typography>;
  }
  if (status === 'failed') {
    return <Typography sx={{ fontFamily: 'Red Hat Display, sans-serif' }}>Error: {error}</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ fontFamily: 'Red Hat Display, sans-serif', textAlign: 'center', }}>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center', }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              View Members
            </Typography>
          </Box>
        </Box>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Box
              key={profile._id}
              sx={{
                border: '1px solid lightgrey',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'left',
                width: '100%',
                marginBottom: '20px',
                marginTop: '20px',
              }}
            >
              <Grid container spacing={2}>
                {/* Centered Image Row */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <img
                      src={`http://localhost:2000${profile.profilePicture}`}
                      alt={profile.name}
                      style={{ width: '220px', height: '220px', borderRadius: '50%' }}
                    />
                  </Box>
                </Grid>

                <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 5}}>
                  <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 23, fontWeight: 700, color: '#630000', marginBottom: 3 }}>
                    Society Profile Details:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Name</Typography>
                      <Typography variant="body1">{profile.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>User Id</Typography>
                      <Typography variant="body1">{profile.userId}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Email</Typography>
                      <Typography variant="body1">{profile.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Mobile Number</Typography>
                      <Typography variant="body1">{profile.mobileNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Society Name</Typography>
                      <Typography variant="body1">{profile.societyName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Block</Typography>
                      <Typography variant="body1">{profile.buildingName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Flat</Typography>
                      <Typography variant="body1">{profile.flatNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>User Type</Typography>
                      <Typography variant="body1">{profile.userType}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', mb: 2 }}>
                      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 23, fontWeight: 700, color: '#630000', marginBottom: 3 }}>Family Members:</Typography>
                      <Grid container spacing={2}>
                        {profile.familyMembers.slice(0, expandedProfile[profile._id]?.family ? profile.familyMembers.length : 3).map((member, index) => (
                          <React.Fragment key={member._id}>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Name</Typography>
                              <Typography variant="body1">{member.name}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Age</Typography>
                              <Typography variant="body1">{member.age}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Gender</Typography>
                              <Typography variant="body1">{member.gender}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Mobile Number</Typography>
                              <Typography variant="body1">{member.mobileNumber}</Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                      {profile.familyMembers.length > 3 && (
                        <Button onClick={() => handleToggleExpand(profile._id, 'family')} sx={{ marginTop: '10px', fontWeight:800}}>
                          {expandedProfile[profile._id]?.family ? 'See Less' : 'See All'}
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', mb: 2 }}>
                      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 23, fontWeight: 700, color: '#630000', marginBottom: 3 }}>Pets:</Typography>
                      <Grid container spacing={2}>
                        {profile.pets.slice(0, expandedProfile[profile._id]?.pets ? profile.pets.length : 3).map((pet, index) => (
                          <React.Fragment key={pet._id}>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Name</Typography>
                              <Typography variant="body1">{pet.name}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Type</Typography>
                              <Typography variant="body1">{pet.type}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Breed</Typography>
                              <Typography variant="body1">{pet.breed}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Age</Typography>
                              <Typography variant="body1">{pet.age}</Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                      {profile.pets.length > 3 && (
                        <Button onClick={() => handleToggleExpand(profile._id, 'pets')} sx={{ marginTop: '10px' }}>
                          {expandedProfile[profile._id]?.pets ? 'See Less' : 'See All'}
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography sx={{ fontFamily: 'Red Hat Display, sans-serif' }}>No profiles found.</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default View;