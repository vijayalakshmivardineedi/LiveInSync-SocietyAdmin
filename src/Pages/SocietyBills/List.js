import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    IconButton,
    Table,
    Grid,
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { createTheme, styled } from "@mui/material/styles";
import MyDialog from '../../DialogBox/DialogBox';
import { deleteBill, fetchBillsBySocietyId } from './SocietyBillsSlice';

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
    const { status, error, successMessage } = useSelector((state) => state.societyBills);
    // const bills = useSelector((state) => state.societyBills.bills) || []; 
    const bills = useSelector((state) => Array.isArray(state.societyBills.bills) ? state.societyBills.bills : []);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [selected, setSelected] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchBillsBySocietyId());
    }, [dispatch]);

    const handleDeleteSelected = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        dispatch(deleteBill({ id: selectedUser._id })).then(() => {
            setDeleteDialogOpen(false);
            setSelectedUserIdToDelete(null);
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(fetchBillsBySocietyId());
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

    const handleMenuOpen = (event, bills) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(bills);
        setSelectedUserIdToDelete(bills._id);
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
        navigate(`/edit/societyBills/${selectedUser._id}`);
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
                        Society Bills
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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
                            onClick={() => navigate('/add/societyBills')}
                        >
                            ADD
                        </Button>
                    </Box>
                </Box>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Document</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Bill</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Month & Year</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Amount</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Date & Time</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bills.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography variant="body1">No Data Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bills
                                        .filter(bills => {
                                            const sender = bills.sender?.toLowerCase() || '';
                                            const subject = bills.Subject?.toString() || '';
                                            const description = bills.Description?.toString() || '';
                                            const date = bills.Date?.toLowerCase() || '';
                                            const status = bills.Status?.toLowerCase || '';

                                            return sender.includes(searchText) ||
                                                subject.includes(searchText) ||
                                                description.includes(searchText) ||
                                                date.includes(searchText) ||
                                                status.includes(searchText);
                                        })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((bills) => (
                                            <TableRow
                                                key={bills._id}
                                                selected={isSelected(bills._id)}
                                            >
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills._id}</TableCell>
                                                <TableCell>
                                                    {bills.pictures ? (
                                                        <a
                                                            href={`http://localhost:2000${bills.pictures}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            download
                                                        >
                                                            <Typography variant="body2">
                                                                Download File
                                                            </Typography>
                                                        </a>
                                                    ) : (
                                                        <Typography variant="body2">No Document</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills.name}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills.monthAndYear}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills.amount}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills.status}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{bills.date}</TableCell>
                                                <TableCell>
                                                    <GradientIconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={(event) => handleMenuOpen(event, bills)}
                                                    >
                                                        <MoreVertIcon />
                                                    </GradientIconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <TablePagination
                rowsPerPageOptions={[7, 14, 21]}
                component="div"
                count={bills.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleViewClick}>View</MenuItem>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'red' }}>Delete</MenuItem>
            </Menu>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: "#630000" }}>Details</DialogTitle>
                <DialogContent>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography><strong>ID:</strong></Typography>
                                <Typography><strong>Bill:</strong></Typography>
                                <Typography><strong>Amount:</strong></Typography>
                                <Typography><strong>Status:</strong></Typography>
                                <Typography><strong>Date:</strong></Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{selectedUser?._id}</Typography>
                                <Typography>{selectedUser?.name}</Typography>
                                <Typography>{selectedUser?.amount}</Typography>
                                <Typography>{selectedUser?.status}</Typography>
                                <Typography>{selectedUser?.date}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{
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
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={cancelDelete}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this bill?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <MyDialog
                message={successMessage}
                showDialog={showDialog}
                onClose={() => setShowDialog(false)}
            />
        </ThemeProvider>
    );
};

export default List;
