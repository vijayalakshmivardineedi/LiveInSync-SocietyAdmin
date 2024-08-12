import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, MenuItem, IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { checkAttendanceStatus, sequrityCheckIn, sequrityCheckOut } from './GateKeeperSlice'; // Replace with correct import path
import { useParams } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
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

const AttendanceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    date: new Date().toISOString().slice(0, 10),
    status: '',
    checkInDateTime: '',
    checkOutDateTime: '',
  });

  const { sequrityId } = useParams();
  const data = useSelector((state) => state.gateKeepers.sequrity);
  const successMessage = useSelector((state) => state.gateKeepers.successMessage);
  const sequrity = data?.status || '';
  const sequrityAttendance = data?.attendanceRecords || {};
  const [showDialog, setShowDialog] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const selectedDate = new Date(attendance.date).toISOString().slice(0, 10);

  useEffect(() => {
    const formattedDate = new Date(attendance.date).toISOString();
    dispatch(checkAttendanceStatus({ sequrityId, date: formattedDate }));
  }, [dispatch, sequrityId, attendance.date]);

  const handleAttendanceChange = (e) => {
    const { name, value } = e.target;
    setAttendance(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckin = async () => {
    try {
      if (selectedDate !== today) {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        return;
      }

      let formData = {
        date: attendance.date,
        status: attendance.status,
      };
      if (attendance.status === 'present') {
        formData.checkInDateTime = new Date().toISOString();
      }

      await dispatch(sequrityCheckIn({ sequrityId, formData }))
        .then(() => {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
          }, 2000);

          const formattedDate = new Date(attendance.date).toISOString();
          dispatch(checkAttendanceStatus({ sequrityId, date: formattedDate }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const formData = {
        checkOutDateTime: new Date().toISOString()
      };
      const attendanceId = sequrityAttendance._id;

      await dispatch(sequrityCheckOut({ sequrityId, attendanceId, formData }))
        .then(() => {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
          }, 2000);

          const formattedDate = new Date(attendance.date).toISOString();
          dispatch(checkAttendanceStatus({ sequrityId, date: formattedDate }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error('Error during check-out:', error);
    }
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
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Attendance
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 3, borderRadius: 2 }}>
          {sequrityAttendance && (
            <Box marginBottom="30px" marginTop="10px">
              <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "20px", fontWeight: '700', color: '#630000' }}>
                Last Attendance Record:
              </Typography>
              <Box sx={{ padding: '10px', fontFamily: "Red Hat Display, sans-serif", marginBottom: '10px', border: "1px solid lightgrey", borderRadius: 5 }}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Date:</strong></Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Status:</strong></Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Check-in Time:</strong></Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}><strong>Check-out Time:</strong></Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}>{new Date(sequrityAttendance.date).toLocaleDateString()}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}> {sequrityAttendance.status}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}>
                        {sequrityAttendance.checkInDateTime
                          ? new Date(sequrityAttendance.checkInDateTime).toLocaleString()
                          : '-'}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Red Hat Display, sans-serif", }}>
                        {sequrityAttendance.checkOutDateTime
                          ? new Date(sequrityAttendance.checkOutDateTime).toLocaleString()
                          : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

              </Box>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Date'
                name='date'
                type='date'
                value={attendance.date}
                onChange={handleAttendanceChange}
                variant='outlined'
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {selectedDate === today && sequrity !== 'Already checkin But no checkOut' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label='Status'
                  name='status'
                  value={attendance.status}
                  onChange={handleAttendanceChange}
                  variant='outlined'
                  required
                >
                  <MenuItem value='' sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600 }}>Select Status</MenuItem>
                  <MenuItem value='present' sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Present</MenuItem>
                  <MenuItem value='leave' sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Leave</MenuItem>
                </TextField>
              </Grid>
            )}
            {selectedDate === today && sequrity === 'No CheckIn' && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={handleCheckin}
                  sx={{
                    backgroundColor: "#630000",
                    fontFamily: "Red Hat Display, sans-serif",
                    width: "20%",
                    '&:hover': {
                      backgroundColor: "#630000",
                    },
                  }}>
                  Check-in
                </Button>
              </Grid>
            )}
            {selectedDate === today && sequrity === 'In Leave' && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, }}>You are on leave for this date.</Typography>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={handleCheckin}
                  sx={{
                    backgroundColor: "#630000",
                    fontFamily: "Red Hat Display, sans-serif",
                    width: "20%",
                    '&:hover': {
                      backgroundColor: "#630000",
                    },
                  }}>
                  Check-in Anyway
                </Button>
              </Grid>
            )}
            {selectedDate === today && sequrity === 'Already Checked In' && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={handleCheckin}
                  sx={{
                    backgroundColor: "#630000",
                    fontFamily: "Red Hat Display, sans-serif",
                    width: "20%",
                    '&:hover': {
                      backgroundColor: "#630000",
                    },
                  }}>
                  Check-in Again
                </Button>
              </Grid>
            )}
            {sequrity === 'Already checkin But no checkOut' && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, }}>You have already checked in but not checked out.</Typography>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={handleCheckout}
                  sx={{
                    backgroundColor: "#630000",
                    fontFamily: "Red Hat Display, sans-serif",
                    width: "20%",
                    '&:hover': {
                      backgroundColor: "#630000",
                    },
                  }}>
                  Check-out
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <Dialog
        message={successMessage}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </ThemeProvider>
  );
};

export default AttendanceForm;