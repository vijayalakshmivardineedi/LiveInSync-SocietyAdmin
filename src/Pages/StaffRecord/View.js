import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getVisitor } from './ListSlice';
import { Box, Typography, Grid, IconButton } from '@mui/material';
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
    const { visitorId } = useParams();
    const navigate = useNavigate();
    const visitors = useSelector((state) => state.visitorsRecords.visitors) || [];
    const status = useSelector((state) => state.visitorsRecords.status);
    const error = useSelector((state) => state.visitorsRecords.error);

    useEffect(() => {
        dispatch(getVisitor(visitorId));
    }, [dispatch, visitorId]);

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
                            View Members
                        </Typography>
                    </Box>
                </Box>
                <Box
                    key={visitors.visitorId}
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
                        <Box sx={{ display: 'flex', justifyContent: "space-between", marginTop: 2 }}>
                            <Box>
                                <img
                                    src={`http://localhost:2000${visitors.pictures}`}
                                    alt={visitors.name}
                                    style={{ width: '220px', height: '220px', borderRadius: '50%', marginLeft: "50%" }}
                                />
                            </Box>
                            <Grid sx={{ marginLeft: "400px"}} > 
                                <Typography variant="h6" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700, marginLeft: 5 }}>QR scan:</Typography>
                                <Box>
                                    <img
                                        src={`http://localhost:2000${visitors.qrImage}`}
                                        alt="QR Code"
                                        style={{ width: '150px', height: '150px', marginBottom: '20px' }}
                                    />
                                </Box>
                            </Grid>
                        </Box>
                        

                        {/* Society Profile Details */}
                        <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700 }}>
                                Society Profile Details:
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Visitor Id</Typography>
                                    <Typography variant="body1">{visitors.visitorId}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Name</Typography>
                                    <Typography variant="body1">{visitors.name}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Email</Typography>
                                    <Typography variant="body1">{visitors.email}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Mobile Number</Typography>
                                    <Typography variant="body1">{visitors.mobileNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Society Name</Typography>
                                    <Typography variant="body1">{visitors.societyName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Building Name</Typography>
                                    <Typography variant="body1">{visitors.buildingName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Flat Number</Typography>
                                    <Typography variant="body1">{visitors.flatNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>User Type</Typography>
                                    <Typography variant="body1">{visitors.userType}</Typography>
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
