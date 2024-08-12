import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { IoArrowBackSharp } from 'react-icons/io5';
import { fetchEventById } from './EventSlice';

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
    const event = useSelector(state => state.events.event);

    useEffect(() => {
        dispatch(fetchEventById(id));
    }, [dispatch, id]);

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
                    key={event._id}
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
                        <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px', marginTop: 2 }}>
                            <Box sx={{ display: 'inline-flex' }}>
                                {event.pictures && event.pictures.map((picture) => (
                                    <Box key={picture._id} sx={{ display: 'inline-block', marginRight: '10px' }}>
                                        <img
                                            src={`http://localhost:2000${picture.img}`}
                                            alt={event.name}
                                            style={{ width: '220px', height: '220px', borderRadius: '50%' }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700, color:"#630000" }}>
                                Society Profile Details:
                            </Typography>
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Name</Typography>
                                    <Typography variant="body1">{event.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Start Date & Time</Typography>
                                    <Typography variant="body1">{event.startDate}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>End Date & Time</Typography>
                                    <Typography variant="body1">{event.endDate}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Activities Section */}
                        <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700, color:"#630000" }}>
                                Activities:
                            </Typography>
                            <Grid container spacing={2}>
                                {event.activities && event.activities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity._id}>
                                        <Box sx={{ padding: '10px', border: '1px solid lightgrey', borderRadius: '8px' }}>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Type</Typography>
                                            <Typography variant="body1">{activity.type}</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Start Date & Time</Typography>
                                            <Typography variant="body1">{activity.startDate}</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>End Date & Time</Typography>
                                            <Typography variant="body1">{activity.endDate}</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Winner</Typography>
                                            <Typography variant="body1">{activity.winner}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        {/* Registrations Section */}
                        <Box sx={{ marginLeft: 2, padding: '15px', border: '1px solid lightgrey', width: '100%', mb: 2 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 20, fontWeight: 700, color:"#630000"}}>
                                Registrations:
                            </Typography>
                            <Grid container spacing={2}>
                                {event.registrations && event.registrations.map((registration) => (
                                    <Grid item xs={12} sm={6} md={4} key={registration._id}>
                                        <Box sx={{ padding: '10px', border: '1px solid lightgrey', borderRadius: '8px' }}>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Participant Id</Typography>
                                            <Typography variant="body1">{registration.participantId}</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Participant Name</Typography>
                                            <Typography variant="body1">{registration.participantName}</Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600 }}>Activities</Typography>
                                            {registration.activity.map((act, index) => (
                                                <li key={index}>{act}</li>
                                            ))} 
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default View;
