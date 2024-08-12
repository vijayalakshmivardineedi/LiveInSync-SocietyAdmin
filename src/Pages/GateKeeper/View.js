import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSequrityPerson } from './GateKeeperSlice';
import { Box, Typography, CircularProgress, IconButton, Paper, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
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
const ViewSequrity = () => {
  const dispatch = useDispatch();
  const { sequrityId } = useParams();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.gateKeepers.sequrity);
  const status = useSelector((state) => state.gateKeepers.status);
  const error = useSelector((state) => state.gateKeepers.error);
  useEffect(() => {
    dispatch(getSequrityPerson(sequrityId));
  }, [dispatch, sequrityId]);
  if (status === 'loading') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }
  if (status === 'failed') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography variant="h6" color="error">Error: {error}</Typography></Box>;
  }
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
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              View Sequrity
            </Typography>
          </Box>
        </Box>
        {profile ? (
          <Paper elevation={3} sx={{ marginTop: 3, padding: '20px', marginBottom: '20px' }}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  src={`http://localhost:2000${profile.pictures}`}
                  alt={profile.name}
                  sx={{ width: '250px', fontFamily: "Red Hat Display, sans-serif", height: '250px', borderRadius: '10%' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 23, fontWeight: 700 }}>{profile.name}</Typography>
                <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Email:</strong> {profile.email}</Typography>
                <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Mobile Number:</strong> {profile.phoneNumber}</Typography>
                <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Role:</strong> {profile.role}</Typography>
                <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>Aadhar Number:</strong> {profile.aadharNumber}</Typography>
                {profile.address && (
                  <Typography variant="body1" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17, }}><strong>
                    Address:</strong> {`${profile.address.addressLine1 || ''}, ${profile.address.addressLine2 || ''}, ${profile.address.state || ''}, ${profile.address.postalCode || ''}`}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {profile.attendance && profile.attendance.length > 0 && (
              <Box marginTop="20px">
                <Typography variant="h6" gutterBottom sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 23, fontWeight: 700, color: '#630000' }}>Attendance:</Typography>
                <Grid container spacing={2}>
                  {/* <Box sx={{ padding: '10px', fontFamily: "Red Hat Display, sans-serif", marginBottom: '10px', border: "1px solid lightgrey", borderRadius: 5 }}> */}
                  <TableContainer sx={{ padding: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 700, fontSize: 18 }}>Date</TableCell>
                          <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 700, fontSize: 18 }}>Status</TableCell>
                          <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 700, fontSize: 18 }}>Check-in Time</TableCell>
                          <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 700, fontSize: 18 }}>Check-out Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {profile.attendance.map((attendanceRecord, index) => (
                          <TableRow key={attendanceRecord._id}>
                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 16 }}>{new Date(attendanceRecord.date).toLocaleDateString()}</TableCell>
                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 16 }}>{attendanceRecord.status}</TableCell>
                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 16 }}>{attendanceRecord.checkInDateTime ? new Date(attendanceRecord.checkInDateTime).toLocaleTimeString() : '-'}</TableCell>
                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 16 }}>{attendanceRecord.checkOutDateTime ? new Date(attendanceRecord.checkOutDateTime).toLocaleTimeString() : '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Box>
            )}
          </Paper>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h6">No profile found.</Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default ViewSequrity;