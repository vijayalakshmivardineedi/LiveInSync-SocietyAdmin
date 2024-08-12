import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    MenuItem,
    Menu,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
    ThemeProvider,
    Grid,

} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { createTheme, styled } from "@mui/material/styles";
import MyDialog from '../../DialogBox/DialogBox';
import { deleteAmenityBooking, getAmenityOfCommunityHal } from './BookingSlice';

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

const List = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.bookings.status);
    const error = useSelector((state) => state.bookings.error);
    const successMessage = useSelector((state) => state.bookings.successMessage);
    const Allbooking = useSelector((state) => state.bookings.booking);
    const booking = Allbooking && Allbooking.list ? Allbooking.list : [];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selected, setSelected] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    console.log(Allbooking)
    console.log(booking)

    useEffect(() => {
        dispatch(getAmenityOfCommunityHal());
    }, [dispatch]);


    const handleDeleteSelected = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        dispatch(deleteAmenityBooking({ id: Allbooking._id, userId: selectedUser.userId })).then(() => {
            setDeleteDialogOpen(false);
            setSelectedUserIdToDelete(null);
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(getAmenityOfCommunityHal());
        }).catch((error) => {
            setDeleteDialogOpen(false);
            setSelectedUserIdToDelete(null);
            console.error("Error:", error);
        });
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setSelectedUserIdToDelete(null);
    };

    const handleClick = (event, id) => {
        event.stopPropagation();
        let newSelected = [...selected];
        const selectedIndex = selected.indexOf(id);
        if (selectedIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSearchChange = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    const handleMenuOpen = (event, booking) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(booking);
        setSelectedUserIdToDelete(booking._id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewClick = () => {
        setDialogOpen(true);
        handleMenuClose();
    };

    const handleEditClick = () => {
        handleMenuClose();
        navigate(`/editBookings/${Allbooking._id}/${selectedUser.userId}`);
    };

    const handleDeleteClick = () => {
        handleDeleteSelected();
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    if (status === 'loading') {
        return <Typography>Loading...</Typography>;
    }

    if (status === 'failed') {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                        Community Hall
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {/* <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            marginTop:1,
                            width: '500px',
                            height: '50px',
                            fontFamily: 'Red Hat Display, sans-serif',
                        }}
                    /> */}
                        <Button
                            variant="outlined"
                            sx={{
                                marginLeft: 2,
                                color: '#630000',
                                border: '2px solid #630000',
                                fontWeight: '600',
                                fontFamily: "Red Hat Display, sans-serif",
                                '&:hover': {
                                    backgroundColor: '#630000',
                                    color: '#fff',
                                    borderColor: '#630000',
                                },
                            }}
                            onClick={() => navigate(`/addBookings/${Allbooking._id}`)}
                        >
                            Book Community Hall
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3, marginBottom: 2 }}>
                        <img
                            src={`http://localhost:2000${Allbooking.image}`}
                            alt={Allbooking.societyName}
                            style={{ width: '450px', height: '200px', borderRadius: '5px', marginRight:"50px",paddingRight:"20px",paddingLeft:"20px" }}
                        />
                    <Grid  container spacing={2}>
                        <Grid item>
                        <Typography sx={{ marginBottom: 2 }}><strong>Name:</strong></Typography>
                        <Typography sx={{ marginBottom: 2 }}><strong>Capacity:</strong> </Typography>
                        <Typography><strong>Total Charge:</strong> </Typography>
                        </Grid>
                        <Grid item>
                        <Typography sx={{ marginBottom: 2 }}> {Allbooking.amenityName}</Typography>
                        <Typography sx={{ marginBottom: 2 }}> {Allbooking.capacity}</Typography>
                        <Typography>{Allbooking.cost}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Booking Date</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Paid</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Pending</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(booking) && booking
                                    .filter(booking => {
                                        const sender = booking.sender?.toLowerCase() || '';
                                        const subject = booking.Subject?.toString() || '';
                                        const description = booking.Description?.toString() || '';
                                        const date = booking.Date?.toLowerCase() || '';
                                        const status = booking.Status?.toLowerCase || '';

                                        return sender.includes(searchText) ||
                                            subject.includes(searchText) ||
                                            description.includes(searchText) ||
                                            date.includes(searchText) ||
                                            status.includes(searchText);
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((booking) => (
                                        <TableRow
                                            key={booking._id}
                                            selected={isSelected(booking._id)}
                                        >
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{booking._id}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{new Date(booking.dateOfBooking).toLocaleString()}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{booking.payed}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{booking.pending}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{booking.status}</TableCell>
                                            <TableCell>
                                                <GradientIconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={event => handleMenuOpen(event, booking)}
                                                >
                                                    <MoreVertIcon />
                                                </GradientIconButton>

                                                <Menu
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: 48 * 4.5,
                                                            width: '20ch',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem onClick={handleViewClick}>View</MenuItem>
                                                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                                                    <MenuItem onClick={handleDeleteClick} sx={{ color: "red" }}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                >
                    <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: "#630000" }} >Booking Details</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography variant="body1"><strong>ID:</strong></Typography>
                                        <Typography variant="body1"><strong>Date:</strong></Typography>
                                        <Typography variant="body1"><strong>Paid:</strong></Typography>
                                        <Typography variant="body1"><strong>Pending:</strong></Typography>
                                        <Typography variant="body1"><strong>Status:</strong></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{selectedUser._id}</Typography>
                                        <Typography variant="body1"> {new Date(selectedUser.dateOfBooking).toLocaleString()}</Typography>
                                        <Typography variant="body1"> {selectedUser.payed}</Typography>
                                        <Typography variant="body1"> {selectedUser.pending}</Typography>
                                        <Typography variant="body1"> {selectedUser.status}</Typography>
                                    </Grid>
                                </ Grid>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            sx={{
                                height: 40,
                                marginLeft: 2,
                                color: '#630000',
                                border: '2px solid #630000',
                                fontWeight: '600',
                                fontFamily: "Red Hat Display, sans-serif",
                                '&:hover': {
                                    backgroundColor: '#630000',
                                    color: '#fff',
                                    borderColor: '#630000',
                                },
                            }}
                            onClick={handleDialogClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={cancelDelete}
                >
                    <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000' }} >Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            " Are you sure you want to delete this Booking ?? "
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmDelete} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
                        <Button onClick={cancelDelete} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
                    </DialogActions>
                </Dialog>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={booking.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <MyDialog
                message={successMessage}
                showDialog={showDialog}
                onClose={() => setShowDialog(false)}
            />
        </ThemeProvider >
    );
};

export default List;