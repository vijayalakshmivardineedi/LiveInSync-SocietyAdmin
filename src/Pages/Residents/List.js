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
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MyDialog from '../../DialogBox/DialogBox';
import { deleteUser, getAllOwners } from '../UserManagement/ListSlice';

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
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users);

    const successMessage = useSelector(state => state.user.successMessage);

    useEffect(() => {
        dispatch(getAllOwners());
    }, [dispatch,]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };


    const handleView = () => {
        handleMenuClose();
        navigate(`/view/${selectedUser.userId}`);
    };


    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteUser({ _id: selectedUser._id })).then(() => {
            setDeleteDialogOpen(false);
            handleMenuClose();
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(getAllOwners());
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
            <Box sx={{ padding: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                        Owners
                    </Typography>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        size='small'
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
                            width: "500px",
                            height: "50px",
                            fontFamily: 'Red Hat Display, sans-serif',
                        }}
                    />
                </Box> */}
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>User ID</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Image</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Name & Email</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>User Type</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Block</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Flat</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Mobile Number</TableCell>
                                <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontWeight: 600, fontSize: 16 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .filter(user =>
                                    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                    user.email.toLowerCase().includes(searchText.toLowerCase())
                                )
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.userId}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                src={`http://localhost:2000${user.profilePicture}`}
                                                alt={user.name}
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.name}</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.email}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.userType}</TableCell>
                                        <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.buildingName}</TableCell>
                                        <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.flatNumber}</TableCell>
                                        <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{user.mobileNumber}</TableCell>
                                        <TableCell>
                                            <GradientIconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={event => handleMenuOpen(event, user)}
                                            >
                                                <MoreVertIcon />
                                            </GradientIconButton>
                                            {/* <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                                                <MoreVertIcon />
                                            </IconButton> */}
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={handleView}>View</MenuItem>
                                                <MenuItem onClick={handleDelete} style={{ color: "red" }}>Delete</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
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
                            " Are you sure you want to delete this User ?? "
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteConfirm} sx={{fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
                        <Button onClick={handleDeleteCancel} sx={{fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <MyDialog
                message={successMessage}
                showDialog={showDialog}
                onClose={() => setShowDialog(false)}
            />
        </ThemeProvider>
    );
};

export default List;
