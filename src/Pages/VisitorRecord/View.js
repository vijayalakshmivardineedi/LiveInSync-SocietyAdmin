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
            <Box sx={{ fontFamily: 'Red Hat Display, sans-serif', }}>
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
                <Box key={visitors.visitorId}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: "space-between", marginTop: 2 }}>
                            <Box>
                                <img
                                    src={`http://localhost:2000${visitors.pictures}`}
                                    alt={visitors.name}
                                    style={{ width: '150px', marginLeft: "50%", height: '150px', borderRadius: '50%', marginTop: 25 }}
                                />
                            </Box>
                            {visitors.qrImage !== 'null' && visitors.qrImage && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700, marginLeft: 5 }}>
                                        QR scan:
                                    </Typography>
                                    <Box
                                        component="img"
                                        src={`http://localhost:2000${visitors.qrImage}`}
                                        alt="QR Code"
                                        sx={{ width: '150px', marginRight: "70px", height: '150px', marginBottom: '20px' }}
                                    />
                                </Box>
                            )}
                        </Grid>

                        <Box sx={{ padding: '20px',  border: '1px solid lightgrey', width: '80%', mb: 2 }}>
                            <Typography variant="body1" gutterBottom sx={{ fontSize: 18, fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700, color: "#630000", marginBottom: 3 }}>
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
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Reason</Typography>
                                    <Typography variant="body1">{visitors.reason}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Mobile Number</Typography>
                                    <Typography variant="body1">{visitors.phoneNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Block</Typography>
                                    <Typography variant="body1">{visitors.block}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>In Vehicle Number</Typography>
                                    <Typography variant="body1">{visitors.inVehicleNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Flat Number</Typography>
                                    <Typography variant="body1">{visitors.flatNo}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Status</Typography>
                                    <Typography variant="body1">{visitors.status}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Role</Typography>
                                    <Typography variant="body1">{visitors.role}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>In Gate Number</Typography>
                                    <Typography variant="body1">{visitors.inGateNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Details</Typography>
                                    <Typography variant="body1">{visitors.details}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Company</Typography>
                                    <Typography variant="body1">{visitors.company}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Check In Date Time</Typography>
                                    <Typography variant="body1">{visitors.checkInDateTime
                                        ? new Date(visitors.checkInDateTime).toLocaleString()
                                        : '----'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Check Out Date Time</Typography>
                                    <Typography variant="body1">{visitors.checkOutDateTime
                                        ? new Date(visitors.checkOutDateTime).toLocaleString()
                                        : '-----'}
                                    </Typography>
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