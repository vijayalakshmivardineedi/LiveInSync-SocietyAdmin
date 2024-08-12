import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
  TablePagination,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServicePerson, fetchAllServiceTypes } from './StaffSlice';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { IoArrowBackSharp } from 'react-icons/io5';
import MyDialog from '../../DialogBox/DialogBox';

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

const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staff = useSelector((state) => state.staff.data);
  const status = useSelector((state) => state.staff.status);
  const error = useSelector((state) => state.staff.error);
  const successMessage = useSelector((state) => state.staff.successMessage);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const { serviceType } = useParams();
  const [showDialog, setShowDialog] = useState(false);

  const societyId = "6683b57b073739a31e8350d0";

  useEffect(() => {
    dispatch(fetchAllServiceTypes(serviceType));
  }, [dispatch, serviceType]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredStaff = Array.isArray(staff) ? staff.filter((member) => {
    const name = member.name ? member.name : '';
    const email = member.email ? member.email : '';
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      email.toLowerCase().includes(searchText.toLowerCase())
    );
  }) : [];

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    const userid = selectedUser.userid;
    navigate(`/editstaffMember/${serviceType}/${userid}`);
  };

  const handleView = () => {
    setOpenViewDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setOpenDeleteConfirmation(true);
    handleMenuClose();
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  // societyId, serviceType, userid 
  const handleConfirmDelete = () => {
    const userid = selectedUser.userid;

    dispatch(deleteServicePerson({ userid, serviceType, societyId })).then(() => {
      setOpenDeleteConfirmation(false);
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(fetchAllServiceTypes(serviceType));
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedServiceType = capitalizeFirstLetter(serviceType);


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
            <Typography variant='body1' sx={{
              fontFamily: "Red Hat Display, sans-serif",
              color: '#630000',
              fontSize: "23px",
              fontWeight: '700',
            }}>
              {formattedServiceType}
            </Typography>
          </Box>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Mobile Number</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Badge ID</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                    <TableCell>{member._id}</TableCell>
                    <TableCell>
                      <img
                        src={`http://localhost:2000${member.pictures}`}
                        alt={member.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>{member.name}</Typography>
                    </TableCell>
                    <TableCell>{member.phoneNumber}</TableCell>
                    <TableCell>{member.userid}</TableCell>
                    <TableCell>
                      <GradientIconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={event => handleMenuOpen(event, member)}
                      >
                        <MoreVertIcon />
                      </GradientIconButton>
                      {/* <IconButton
                      onClick={(event) => handleMenuOpen(event, member)}
                    >
                      <MoreVertIcon />
                    </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStaff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {selectedUser && (
            <>
              <MenuItem onClick={handleView}>View</MenuItem>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
                Delete
              </MenuItem>
            </>
          )}
        </Menu>
        {/* <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
          <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: '#630000'}}>Staff Member Details</DialogTitle>
          {selectedUser && (
            <DialogContent dividers={false}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <img
                  src={`http://localhost:2000${selectedUser.pictures}`}
                  alt={selectedUser.name}
                  // style={{ width: '200px', height: '200px', borderRadius: "10px"}}
                  style={{ width: '250px', height: '250px', borderRadius: "10px"}}
                />
                
              </Box>
              <Typography variant="body1" >
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>ID:</strong> {selectedUser._id}
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Mobile Number:</strong> {selectedUser.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Address:</strong> {selectedUser.address}
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Timings:</strong>{' '}
                {selectedUser.timings.map((time, index) => (
                  <span key={index}>{time} </span>
                ))}
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Badge ID:</strong> {selectedUser.userid}
              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleCloseViewDialog} sx={{
              color: '#630000',
              fontSize: 15,
              border: '2px solid #630000',
              fontWeight: '600',
              fontFamily: "Red Hat Display, sans-serif",
              '&:hover': {
                backgroundColor: '#630000',
                color: '#fff',
                borderColor: '#630000',
              },
            }}>
              Close
            </Button>
          </DialogActions>
        </Dialog> */}

<Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
          <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: '#630000'}}>Staff Member Details</DialogTitle>
          {selectedUser && (
            <DialogContent dividers={false}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <img
                  src={`http://localhost:2000${selectedUser.pictures}`}
                  alt={selectedUser.name}
                  // style={{ width: '200px', height: '200px', borderRadius: "10px"}}
                  style={{ width: '250px', height: '250px', borderRadius: "10px"}}
                />
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item>
              <Typography variant="body1" >
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>ID:</strong>
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Name:</strong>
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Mobile Number:</strong>
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Address:</strong>
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Timings:</strong>
              </Typography>
              <Typography variant="body1">
                <strong sx={{ fontFamily: "Red Hat Display, sans-serif", }}>Badge ID:</strong>
              </Typography>
              </Grid>
              <Grid item>
              <Typography variant="body1" >
                {selectedUser._id}
              </Typography>
              <Typography variant="body1">
                {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                {selectedUser.phoneNumber}
              </Typography>
              <Typography variant="body1">
                {selectedUser.address}
              </Typography>
              <Typography variant="body1">
               {' '}
                {selectedUser.timings.map((time, index) => (
                  <span key={index}>{time} </span>
                ))}
              </Typography>
              <Typography variant="body1">
                {selectedUser.userid}
              </Typography>
              </Grid>
              </Grid>
              </Box>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleCloseViewDialog} sx={{
              color: '#630000',
              fontSize: 15,
              border: '2px solid #630000',
              fontWeight: '600',
              fontFamily: "Red Hat Display, sans-serif",
              '&:hover': {
                backgroundColor: '#630000',
                color: '#fff',
                borderColor: '#630000',
              },
            }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeleteConfirmation}>
        <DialogTitle sx={{fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000'}}>{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: "Red Hat Display, sans-serif" }}>
                            " Are you sure you want to delete this Service Person ?? "
                        </DialogContentText>
                    </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete} sx={{ fontWeight:600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
            <Button onClick={handleCloseDeleteConfirmation} sx={{fontWeight:600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
          </DialogActions>
        </Dialog>
        <MyDialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ListPage;