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
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { deleteNotice, fetchnotice, fetchnoticeById } from './NoticeSlice';
import { createTheme, styled } from "@mui/material/styles";
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
    const dispatch = useDispatch();
    const { status, error, successMessage } = useSelector((state) => state.notice);
    const notice = useSelector((state) => state.notice.notice);
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
        dispatch(fetchnoticeById());
    }, [dispatch]);

    useEffect(() => {
    }, [notice]);

    const handleDeleteSelected = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        dispatch(deleteNotice({ id: selectedUser._id })).then(() => {
            setDeleteDialogOpen(false);
            setSelectedUserIdToDelete(null);
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(fetchnoticeById());
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

    const handleMenuOpen = (event, notice) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(notice);
        setSelectedUserIdToDelete(notice._id);
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
        navigate(`/editnotice/${selectedUser._id}`);
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
                        Notice
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
                            onClick={() => navigate('/addnotice')}
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
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Creater</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Subject</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Description</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Date & Time</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(notice) && notice
                                    .filter(notice => {
                                        const sender = notice.sender?.toLowerCase() || '';
                                        const subject = notice.Subject?.toString() || '';
                                        const description = notice.Description?.toString() || '';
                                        const date = notice.Date?.toLowerCase() || '';
                                        const status = notice.Status?.toLowerCase || '';

                                        return sender.includes(searchText) ||
                                            subject.includes(searchText) ||
                                            description.includes(searchText) ||
                                            date.includes(searchText) ||
                                            status.includes(searchText);
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((notice) => (
                                        <TableRow
                                            key={notice._id}
                                            selected={isSelected(notice._id)}
                                        >
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{notice._id}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{notice.sender}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{notice.subject}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{notice.description}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{new Date(notice.date).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <GradientIconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={event => handleMenuOpen(event, notice)}
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
                    <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: "#630000" }} >Notice Details</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography variant="body1"><strong>ID:</strong></Typography>
                                        <Typography variant="body1"><strong>Creater:</strong></Typography>
                                        <Typography variant="body1"><strong>Subject:</strong></Typography>
                                        <Typography variant="body1"><strong>Description:</strong></Typography>
                                        <Typography variant="body1"><strong>Date & Time:</strong></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{selectedUser._id}</Typography>
                                        <Typography variant="body1"> {selectedUser.sender}</Typography>
                                        <Typography variant="body1">{selectedUser.subject}</Typography>
                                        <Typography variant="body1">{selectedUser.description}</Typography>
                                        <Typography variant="body1">{selectedUser.date}</Typography>
                                    </Grid>
                                </Grid>
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
                            " Are you sure you want to delete this Notice ?? "
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
                    count={notice.length}
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