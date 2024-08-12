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
    MenuItem,
    TablePagination,
    Menu,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import MyDialog from '../../DialogBox/DialogBox';
import { deleteAdvertisement, fetchAdvertisements } from './AdvertisementSlice';

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAdd, setSelectedAdd] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);

    const adds = useSelector(state => state.advertisements.adds || []);
    const successMessage = useSelector(state => state.advertisements.successMessage);

    useEffect(() => {
        dispatch(fetchAdvertisements());
    }, [dispatch]);

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

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedAdd(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAdd(null);
    };

    const handleView = () => {
        handleMenuClose();
        navigate(`/view/Adds/${selectedAdd._id}`);
    };

    const handleEditClick = () => {
        handleMenuClose();
        navigate(`/edit/Adds/${selectedAdd._id}`);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteAdvertisement({ id: selectedAdd._id })).then(() => {
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(fetchAdvertisements());
        }).catch((error) => {
            console.error("Error:", error);
        });
        setDeleteDialogOpen(false);
        handleMenuClose();
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        handleMenuClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                        Advertisements
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
                            onClick={() => navigate('/add/Adds')}
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>ID</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Image</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>User ID</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Type</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Name</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Mobile</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Status</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Block</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Flat</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Area</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Rooms</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Price</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(adds) && adds.length > 0 ? (
                                adds
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user._id}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={`http://localhost:2000${user.pictures[0].img}`}

                                                    alt={user.name}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.userId}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.adv}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.userName}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.phoneNumber}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.status}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.details.block}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.details.flat_No}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.details.flat_Area}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.details.rooms}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.details.price}</TableCell>
                                            <TableCell>
                                                <GradientIconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={event => handleMenuOpen(event, user)}
                                                >
                                                    <MoreVertIcon />
                                                </GradientIconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={handleView}>View</MenuItem>
                                                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                                                    <MenuItem onClick={handleDelete} style={{ color: "red" }}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography variant="subtitle1">
                                            No data found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={adds.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                >
                    <DialogTitle sx={{fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000'}}>{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: "Red Hat Display, sans-serif" }}>
                            " Are you sure you want to delete this Advertisement ?? "
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteConfirm} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
                        <Button onClick={handleDeleteCancel} sx={{fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
                    </DialogActions>
                </Dialog>
                <MyDialog
                    message={successMessage}
                    showDialog={showDialog}
                    onClose={() => setShowDialog(false)}
                />
            </Box>
        </ThemeProvider >
    );
};

export default List;