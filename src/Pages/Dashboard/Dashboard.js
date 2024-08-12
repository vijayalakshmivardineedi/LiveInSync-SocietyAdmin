import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Card, CardContent, Divider, Button, } from '@mui/material';
import { BiSolidBellRing } from "react-icons/bi";
import Avatar from '@mui/material/Avatar'; import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calender from "../../Components/Calender";
import LineChart from "../../Components/Charts/LineChart";
import PieChart from "../../Components/Charts/PieChart";
import BarCharts from "../../Components/Charts/BarChart";
import { fetchComplaints } from "../Complaint/ComplaintSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicePersons } from "../StaffMember/StaffSlice";
import { useNavigate } from "react-router-dom";
import { fetchResidentProfile } from "../Profile/profileSlice";
import { fetchGatekeepers } from "../GateKeeper/GateKeeperSlice";
import { fetchAdvertisements } from "../Advertisements/AdvertisementSlice";
import { fetchnoticeById } from "../Notice/NoticeSlice";
import { fetchEvent } from "../Event/EventSlice";
import { getByMonthAndYear } from "../SocietyMaintainance/SocietyMaintainanceSlice";

const emergencyAlert = [
    { id: 1, issue: 'Fire Alarm Alert', flat: 'A102' },
    { id: 2, issue: 'Gas Leak Alert', flat: 'B102' },
];

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //complaints
    const fetchedcomplaints = useSelector(state => state.complaintList.Complaints || []);
    const complaints = fetchedcomplaints.map(complaint => ({
        id: complaint.complaintId,
        resident: complaint.complaintBy,
        raiseDate: complaint.dateAndTime,
        status: complaint.resolution,
    }));
    const complaintsCount = complaints ? complaints.length : 0;

    //staff
    const fetchedstaff = useSelector(state => state.staff.data || []);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const serviceCounts = Object.entries(fetchedstaff).slice(1).map(([serviceType, serviceList]) => ({
        ServiceType: capitalizeFirstLetter(serviceType),
        NoOfPersons: serviceList.length,
    }));
    const StaffCount = serviceCounts.reduce((total, service) => total + service.NoOfPersons, 0);

    //users
    const fetchedProfile = useSelector(state => state.profile.profile);
    const blocksCount = fetchedProfile.blocks ? fetchedProfile.blocks.length : 0;
    const flatsCount = fetchedProfile.blocks
        ? fetchedProfile.blocks.reduce((total, block) => total + (block.flats ? block.flats.length : 0), 0)
        : 0;

    //gatekeepers or sequrity
    const fetchedsequrity = useSelector(state => state.gateKeepers.sequrity || []);
    const gaurdsCount = fetchedsequrity ? fetchedsequrity.length : 0;

    //adds
    const fetchedAdds = useSelector(state => state.advertisements.adds || []);

    //notices
    const notice = useSelector((state) => state.notice.notice);
    const noticeCount = notice ? notice.length : 0;
    const formattedNotices = notice.map((n) => ({
        date: new Date(n.date).getDate(),
        month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(n.date)),
        time: new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Notice',
        title: n.subject,
        message: n.description
    }));

    // Process events
    const events = useSelector((state) => state.events.event || []);
    const formattedEvents = events.map((e) => ({
        date: new Date(e.startDate).getDate(),
        month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(e.startDate)),
        time: new Date(e.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Event',
        title: e.name,
        message: `Join us for the event: ${e.name} from ${new Date(e.startDate).toLocaleDateString()} to ${new Date(e.endDate).toLocaleDateString()}`
    }));

    const noticesAndEventsData = [...formattedNotices, ...formattedEvents];

    const handleNavigation = (category) => {
        console.log(category)
        if (category === 'Notice') {
            navigate('/notice');
        } else if (category === 'Event') {
            navigate('/event');
        }
    };

    const getCurrentMonthAndYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    };
    const monthAndYear = getCurrentMonthAndYear();

    const AllMaintainance = useSelector((state) => state.maintainance.maintainances) || [];
    const payment = AllMaintainance.paymentDetails || [];
    console.log(monthAndYear)
    console.log(AllMaintainance)
    console.log(payment)
    const totalPaymentAmount = payment.reduce((total, payment) => total + (parseFloat(payment.paidAmount) || 0), 0);

    useEffect(() => {
        dispatch(fetchComplaints());
        dispatch(getAllServicePersons());
        dispatch(fetchResidentProfile());
        dispatch(fetchGatekeepers());
        dispatch(fetchAdvertisements());
        dispatch(fetchnoticeById());
        dispatch(fetchEvent());
        dispatch(getByMonthAndYear(monthAndYear));
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={3}>
                <Grid item md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif" }}>
                                        Blocks
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                                        {blocksCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                        color: '#fff',
                                        borderColor: '#630000',
                                    }
                                }}
                                onClick={() => navigate('/userManagement')}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif", }}>
                                        Flats
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                                        {flatsCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                        color: '#fff',
                                        borderColor: '#630000',
                                    }
                                }}
                                onClick={() => navigate('/gatekeeper/list')}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif" }}>
                                        Guards
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
                                        {gaurdsCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                        color: '#fff',
                                        borderColor: '#630000',
                                    }
                                }}
                                onClick={() => navigate('/staffMember')}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif", }}>
                                        Staff
                                    </Typography>
                                    <Typography variant="h3" color="#fff" sx={{ fontWeight: 700 }}>
                                        {StaffCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                        color: '#fff',
                                        borderColor: '#630000',
                                    }
                                }}
                                onClick={() => navigate('/complaints')}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif", }}>
                                        Complaints
                                    </Typography>
                                    <Typography variant="h3" color="#fff" sx={{ fontWeight: 700 }}>
                                        {complaintsCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(to left, #ffdddd, #ae0606)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                        color: '#fff',
                                        borderColor: '#630000',
                                    }
                                }}
                                onClick={() => navigate('/notice')}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "#fff", fontFamily: "Red Hat Display, sans-serif" }}>
                                        Notices
                                    </Typography>
                                    <Typography variant="h3" color="#fff" sx={{ fontWeight: 700 }}>
                                        {noticeCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box sx={{ background: "#fff0f0", borderRadius: 2, height: 200, padding: 2, display: "flex" }}>
                                <Box >
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: "#630000", display: "flex", fontFamily: "Red Hat Display, sans-serif", }}>
                                        Accounts
                                    </Typography>
                                    <Typography variant="h4" color="#630000" sx={{ fontWeight: 700 }}>
                                        {totalPaymentAmount}
                                    </Typography>
                                </Box>
                                <LineChart />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box sx={{
                                background: '#fff0f0',
                                borderRadius: 2,
                                height: 200,
                                padding: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: "#630000", fontFamily: "Red Hat Display, sans-serif", }}>
                                        Today Visit's
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#630000",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            '&:hover': {
                                                color: '#777',
                                            }
                                        }}
                                        onClick={() => navigate('/visitorRecord')}>
                                        View All
                                    </Typography>
                                </Grid>
                                <PieChart />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Box sx={{
                                background: '#fff0f0',
                                borderRadius: 2,
                                padding: 1,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: "#630000", marginBottom: 1, fontFamily: "Red Hat Display, sans-serif", textAlign: "start" }}>
                                    Income and Expenses
                                </Typography>
                                <BarCharts />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff0f0",
                                    borderRadius: "10px",
                                    padding: 1,
                                    paddingTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    height: '400px',
                                }}
                            >
                                <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", fontWeight: "600", fontSize: "20px", marginBottom: 1 }}>Complaints</Typography>
                                    <Typography
                                        sx={{
                                            color: "#630000",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            '&:hover': {
                                                color: '#777',
                                            }
                                        }}
                                        onClick={() => navigate('/complaints')}>
                                        View All
                                    </Typography>
                                </Grid>

                                <Divider sx={{ border: "2px solid #630000" }} />
                                <Box sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em',
                                        backgroundColor: 'transparent', // Hides the scrollbar track
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'transparent', // Hides the scrollbar thumb
                                    },
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TableContainer
                                            sx={{ marginTop: 1, flexGrow: 1, overflowX: 'auto' }}>
                                            <Table aria-label="invoice table">
                                                <TableBody>
                                                    {complaints.map((complaint) => (
                                                        <TableRow key={complaint.id}>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{complaint.id}</TableCell>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{complaint.resident}</TableCell>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{new Date(complaint.raiseDate).toLocaleString()}</TableCell>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{complaint.status}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff0f0",
                                    borderRadius: "10px",
                                    padding: 1,
                                    paddingTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    height: '400px',
                                }}
                            >
                                <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", fontWeight: "600", fontSize: "20px", marginBottom: 1 }}>Services</Typography>
                                    <Typography
                                        sx={{
                                            color: "#630000",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            '&:hover': {
                                                color: '#777',
                                            }
                                        }}
                                        onClick={() => navigate('/staffMember')}>
                                        View All
                                    </Typography>
                                </Grid>

                                <Divider sx={{ border: "2px solid #630000" }} />
                                <Box sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em',
                                        backgroundColor: 'transparent', // Hides the scrollbar track
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'transparent', // Hides the scrollbar thumb
                                    },
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TableContainer
                                            sx={{ marginTop: 1, flexGrow: 1, overflowX: 'auto' }}>
                                            <Table aria-label="invoice table">
                                                <TableBody>
                                                    {serviceCounts.map((serviceCounts) => (
                                                        <TableRow key={serviceCounts.id}>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{serviceCounts.ServiceType}</TableCell>
                                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{serviceCounts.NoOfPersons}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Carousel
                                autoPlay={true}
                                interval={3000}
                                infiniteLoop={true}
                                showThumbs={false}
                                showStatus={false}
                                showIndicators={true}
                                transitionTime={1500}
                            >
                                {Array.isArray(fetchedAdds) && fetchedAdds.length > 0 ? (
                                    fetchedAdds.map((user, index) => (
                                        <Box key={index} sx={{
                                            width: '100%', height: '100%', cursor: "pointer"

                                        }}
                                            onClick={() => navigate('/addsList')}
                                        >
                                            <img
                                                src={`http://localhost:2000${user.pictures[0].img}`}
                                                alt={user.name}
                                                style={{
                                                    width: '100%',
                                                    height: '85%',
                                                    objectFit: 'cover',
                                                    marginBottom: 15,
                                                    borderRadius: 10
                                                }}
                                            />
                                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: "15px" }}>{user.adv}</Typography>
                                                <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: "15px" }}>{user.details.rooms}</Typography>
                                                <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: "15px" }}>{user.details.block}</Typography>
                                                <Typography sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: "15px" }}>{user.details.flat_No}</Typography>
                                            </Grid>
                                        </Box>
                                    ))
                                ) : (
                                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="subtitle1">
                                            No data found
                                        </Typography>
                                    </Box>
                                )}
                            </Carousel>
                        </Grid>
                        <Grid item md={12}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff0f0",
                                    borderRadius: "10px",
                                    padding: 1,
                                    paddingTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography variant="h5" sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", marginBottom: 1, fontWeight: "600" }}>
                                    <BiSolidBellRing style={{ fontSize: 20, marginRight: 10 }} />
                                    Emergency Alerts
                                </Typography>
                                <Divider sx={{ border: "2px solid #630000" }} />
                                <TableContainer sx={{ marginTop: 1, flexGrow: 1, overflowClipBox: 'auto' }}>
                                    <Table aria-label="invoice table">
                                        <TableBody>
                                            {emergencyAlert.map((Emergency) => (
                                                <TableRow key={Emergency.id}>
                                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{Emergency.issue}</TableCell>
                                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>{Emergency.flat}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>
                        </Grid>

                        <Grid item md={12}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff0f0",
                                    borderRadius: "10px",
                                    padding: 1,
                                    paddingTop: 2
                                }}
                            >
                                <Typography variant="h5" sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", fontWeight: "600" }}>
                                    Calender
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: "space-around", marginTop: 1 }}>
                                    <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: "600", cursor: 'pointer' }}
                                        onClick={() => navigate('/notice')}>
                                        🔴 Notice
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: "600", cursor: 'pointer' }}
                                        onClick={() => navigate('/event')}>
                                        🔵 Event
                                    </Typography>
                                </Box>
                                <Calender />
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff0f0",
                                    borderRadius: "10px",
                                    padding: 1,
                                    paddingTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    height: '400px',
                                }}
                            >
                                <Typography variant="h5" sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", marginBottom: 1, fontWeight: "600" }}>
                                    Notices & Events
                                </Typography>
                                <Divider sx={{ border: "2px solid #630000" }} />

                                <Box sx={{
                                    flex: 1,
                                    overflowY: 'auto', // Enable vertical scrolling
                                    padding: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em',
                                        backgroundColor: 'transparent', // Hides the scrollbar track
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'transparent', // Hides the scrollbar thumb
                                    },
                                }}>
                                    {noticesAndEventsData.map((item, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => handleNavigation(item.category)}
                                            sx={{
                                                backgroundColor: "#fff",
                                                margin: 1,
                                                borderRadius: 2,
                                                display: "flex",
                                                position: "relative",
                                                cursor: "pointer" // Add cursor pointer to indicate clickable item
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography gutterBottom sx={{ textAlign: "center", alignItems: "center" }}>
                                                    <Typography variant="h4">
                                                        {item.date}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {item.month}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontSize: "14px" }}>
                                                        {item.time}
                                                    </Typography>
                                                </Typography>
                                            </Box>
                                            <Divider sx={{ borderLeft: "4px solid #630000", marginTop: 1, marginBottom: 1, borderRadius: 4, marginRight: 2 }} />
                                            <Box sx={{ flex: 3 }}>
                                                <Typography variant="body2" sx={{ marginTop: 1, color: "#777" }}>
                                                    {item.category}
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 12 }}>
                                                    {item.message}
                                                </Typography>
                                            </Box>
                                            <MdOutlineKeyboardDoubleArrowRight style={{ position: "absolute", bottom: 1, right: 1, color: "#630000", fontSize: 18 }} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
};
export default Dashboard;
