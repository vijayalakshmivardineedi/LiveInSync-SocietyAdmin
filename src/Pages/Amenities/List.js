import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { deleteAmenity, getAllAmenityBySocietyId } from './AmenitiesSlice';
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

const List = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAmenity, setSelectedAmenity] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);

    const amenities = useSelector(state => state.amenities.amenities || []);
    const successMessage = useSelector(state => state.amenities.successMessage);
console.log(successMessage)
    useEffect(() => {
        dispatch(getAllAmenityBySocietyId());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event, amenity) => {
        setAnchorEl(event.currentTarget);
        setSelectedAmenity(amenity);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAmenity(null);
    };

    const handleView = () => {
        handleMenuClose();
        navigate(`/viewAminity/${selectedAmenity._id}`);
    };

    const handleEditClick = () => {
        handleMenuClose();
        navigate(`/editAminity/${selectedAmenity._id}`);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteAmenity({ id: selectedAmenity._id })).then(() => {
            setDeleteDialogOpen(false);
            handleMenuClose();
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(getAllAmenityBySocietyId());
        }).catch((error) => {
            setDeleteDialogOpen(false);
            console.error("Error:", error);
        });
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        handleMenuClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                        Amenities
                    </Typography>
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
                        onClick={() => navigate('/addAminity')}
                    >
                        ADD
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>ID</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Image</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Amenity Name</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Capacity</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Location</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Cost</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Status</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Timings</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(amenities) && amenities.length > 0 ? (
                                amenities
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((amenity, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{amenity._id}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={`http://localhost:2000${amenity.image}`}
                                                    alt={amenity.amenityName}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{amenity.amenityName}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                                                {amenity.capacity ? amenity.capacity : 'N/A'}
                                                </TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{amenity.location}</TableCell>

                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                                      
                                                {amenity.cost ? amenity.cost : 'N/A'}

                                            </TableCell>

                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{amenity.status}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{amenity.timings}</TableCell>
                                            <TableCell>
                                                <GradientIconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={event => handleMenuOpen(event, amenity)}
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
                                    <TableCell colSpan={9} align="center">
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
                    count={amenities.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                 <DialogTitle sx={{fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000'}}>{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: "Red Hat Display, sans-serif" }}>
                            " Are you sure you want to delete this Amenity ?? "
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
        </ThemeProvider>
    );
};

export default List;
