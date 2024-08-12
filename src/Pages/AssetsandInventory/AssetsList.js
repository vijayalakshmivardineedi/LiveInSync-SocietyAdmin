// const Assetlist = useSelector(state => state.Assetlist.Assets || []);
// const status = useSelector(state => state.Assetlist.status);
// const error = useSelector(state => state.Assetlist.error);


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
import { createTheme, styled } from "@mui/material/styles";
import MyDialog from '../../DialogBox/DialogBox';
import { fetchAsset, fetchDeleteAssetsAsync } from './AssetsListSlice';

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

const AssetsList = () => {
    const dispatch = useDispatch();
    const successMessage = useSelector((state) => state.Assetlist.successMessage);
    const status = useSelector((state) => state.Assetlist.status);
    const error = useSelector((state) => state.Assetlist.error);
    const Assetlist = useSelector(state => state.Assetlist.Assets || []);
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
        dispatch(fetchAsset());
    }, [dispatch]);



    const handleDeleteSelected = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        dispatch(fetchDeleteAssetsAsync({ assetId: selectedUser.assetId })).then(() => {
            setDeleteDialogOpen(false);
            setSelectedUserIdToDelete(null);
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
            }, 2000);
            dispatch(fetchAsset());
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

    const handleMenuOpen = (event, Assetlist) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(Assetlist);
        setSelectedUserIdToDelete(Assetlist._id);
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
        navigate(`/editAssets/${selectedUser.assetId}`);
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
                        Assets
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
                            onClick={() => navigate("/addAssets")}
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
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Asset Id</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Image</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Facility Name</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Cost</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(Assetlist) && Assetlist
                                    .filter(Assetlist => {
                                        const sender = Assetlist.sender?.toLowerCase() || '';
                                        const subject = Assetlist.Subject?.toString() || '';
                                        const description = Assetlist.Description?.toString() || '';
                                        const date = Assetlist.Date?.toLowerCase() || '';
                                        const status = Assetlist.Status?.toLowerCase || '';

                                        return sender.includes(searchText) ||
                                            subject.includes(searchText) ||
                                            description.includes(searchText) ||
                                            date.includes(searchText) ||
                                            status.includes(searchText);
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((Assetlist) => (
                                        <TableRow
                                            key={Assetlist._id}
                                            selected={isSelected(Assetlist._id)}
                                        >
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{Assetlist.assetId}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={`http://localhost:2000${Assetlist.image}`}
                                                    alt={Assetlist.facilityName}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{Assetlist.facilityName}</TableCell>
                                            <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{Assetlist.assetCost}</TableCell>
                                            <TableCell>
                                                <GradientIconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={event => handleMenuOpen(event, Assetlist)}
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
                    <DialogTitle sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 20, fontWeight: 600, color: "#630000"}}>Asset Details :</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <>
                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, marginBottom: 2 }}>
                                    <img
                                        src={`http://localhost:2000${selectedUser.image}`}
                                        alt={selectedUser.facilityName}
                                        style={{ width: '200px', height: '200px', borderRadius: "10px" }}
                                    />
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Typography variant="body1"><strong>ID:</strong></Typography>
                                            <Typography variant="body1"><strong>Asset Id:</strong></Typography>
                                            <Typography variant="body1"><strong>Facility Name:</strong></Typography>
                                            <Typography variant="body1"><strong>Asset Cost:</strong></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1"> {selectedUser._id}</Typography>
                                            <Typography variant="body1"> {selectedUser.assetId}</Typography>
                                            <Typography variant="body1">{selectedUser.facilityName}</Typography>
                                            <Typography variant="body1"> {selectedUser.assetCost}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
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
                    <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color:"#630000" }}>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            " Are you sure you want to delete this Asset ?? "
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmDelete} sx={{fontWeight:600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
                        <Button onClick={cancelDelete} sx={{fontWeight:600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
                    </DialogActions>
                </Dialog>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={Assetlist.length}
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

export default AssetsList;