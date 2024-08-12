import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { IoArrowBackSharp } from 'react-icons/io5';
import { getAmenityById } from './AmenitiesSlice';

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
    const { id } = useParams();
    const navigate = useNavigate();
    const amenity = useSelector(state => state.amenities.amenities);
    const status = useSelector((state) => state.amenities.status);
    const error = useSelector((state) => state.amenities.error);
console.log(amenity)
    useEffect(() => {
        dispatch(getAmenityById(id));
    }, [dispatch, id]);

    if (status === 'loading') {
        return <Typography>Loading...</Typography>;
    }

    if (status === 'failed') {
        return <Typography>Error: {error}</Typography>;
    }

    // Handle case where amenity might be undefined
    if (!amenity) {
        return <Typography>No data available</Typography>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ fontFamily: 'Red Hat Display, sans-serif', textAlign: 'center', padding: '20px' }}>
                <Box sx={{
                    width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
                    justifyContent: "space-between", alignItems: "center", position: 'relative'
                }}>
                    <Box sx={{ display: "flex", position: 'relative', alignItems: 'center', }}>
                        <GradientIconButton onClick={() => navigate(-1)}>
                            <IoArrowBackSharp />
                        </GradientIconButton>
                        <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                            View Amenity
                        </Typography>
                    </Box>
                </Box>
                <Box
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
                        <Box sx={{ display: 'flex',  marginTop: 2, justifyContent: "center", marginBottom: 2,}}>
                                <img
                                    src={`http://localhost:2000${amenity.image}`}
                                    alt={amenity.amenityName}
                                    style={{ width: '220px', height: '220px', borderRadius: '10px', marginLeft: 500 }}
                                />
                        </Box>

                        {/* Amenity Details */}
                        <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700, color: "#630000", marginBottom: 3 }}>
                                Amenity Details:
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Amenity Name</Typography>
                                    <Typography variant="body1">{amenity.amenityName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Capacity</Typography>
                                    <Typography variant="body1">{amenity.capacity}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Cost</Typography>
                                    <Typography variant="body1">{amenity.cost}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Location</Typography>
                                    <Typography variant="body1">{amenity.location}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Timings</Typography>
                                    <Typography variant="body1">{amenity.timings}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Status</Typography>
                                    <Typography variant="body1">{amenity.status}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default View;
