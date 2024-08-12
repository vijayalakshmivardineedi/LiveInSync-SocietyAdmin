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
    Button,
    ThemeProvider,
    TextField,

} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { createTheme, styled } from "@mui/material/styles";
import { getByMonthAndYear } from './SocietyMaintainanceSlice';

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
    const { status, error } = useSelector((state) => state.maintainance);
    const AllMaintainance = useSelector((state) => state.maintainance.maintainances) || [];
    const maintainance = AllMaintainance.paymentDetails || [];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [monthAndYear, setMonthAndYear] = useState(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    });
    // const monthAndYear = "2024-07"

    console.log(monthAndYear)

    useEffect(() => {
        dispatch(getByMonthAndYear(monthAndYear));
    }, [dispatch, monthAndYear]);




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

    const handleMenuOpen = (event, maintainance) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(maintainance);
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
        navigate(`/payMaintainance/${selectedUser.blockno}/${selectedUser.flatno}/${monthAndYear}`);
    };
    const handleStatusClick = () => {
        handleMenuClose();
        navigate(`/status/${selectedUser.blockno}/${selectedUser.flatno}/${monthAndYear}`);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    if (status === 'loading') {
        return <Typography>Loading...</Typography>;
    }


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                        Society Payments
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
                            onClick={() => navigate('/addMontlyMaintainance')}
                        >
                            Add Month
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, marginBottom: 2, marginLeft: "88%", width: 150 }}>
                    <TextField
                        fullWidth
                        label='Month and Year'
                        name='monthAndYear'
                        variant='outlined'
                        type='month'
                        InputLabelProps={{ shrink: true }}
                        value={monthAndYear}
                        onChange={(e) => setMonthAndYear(e.target.value)}
                    />
                </Box>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>User ID</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Image</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Block</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Flat</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Type</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Transaction-Id</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Amount</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Paid Amount</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Paid Date</TableCell>
                                    <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {status === 'failed' ? (
                                <Typography sx={{ display: 'flex', alignContent: 'center' }}>
                                    {/* Error: {error} */}
                                    No Data Found!!!
                                </Typography>
                            ) : (
                                <TableBody>
                                    {Array.isArray(maintainance) && maintainance
                                        .filter(maintainance => {
                                            const sender = maintainance.sender?.toLowerCase() || '';
                                            const subject = maintainance.Subject?.toString() || '';
                                            const description = maintainance.Description?.toString() || '';
                                            const date = maintainance.Date?.toLowerCase() || '';
                                            const status = maintainance.Status?.toLowerCase || '';

                                            return sender.includes(searchText) ||
                                                subject.includes(searchText) ||
                                                description.includes(searchText) ||
                                                date.includes(searchText) ||
                                                status.includes(searchText);
                                        })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((maintainance) => (
                                            <TableRow
                                                key={maintainance._id}
                                                selected={isSelected(maintainance._id)}
                                            >
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.userId ? maintainance.userId : '----'}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={`http://localhost:2000${maintainance.pictures}`}
                                                        alt={maintainance.name}
                                                        style={{ width: '50px', height: '50px', borderRadius: "50%" }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.name ? maintainance.name : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.blockno ? maintainance.blockno : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.flatno ? maintainance.flatno : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.transactionType ? maintainance.transactionType : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.transactionId ? maintainance.transactionId : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.amount ? maintainance.amount : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.paidAmount ? maintainance.paidAmount : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.status ? maintainance.status : '----'}</TableCell>
                                                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{maintainance.payedOn ? new Date(maintainance.payedOn).toLocaleString() : '----'}</TableCell>
                                                <TableCell>
                                                    <GradientIconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={event => handleMenuOpen(event, maintainance)}
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
                                                        <MenuItem onClick={handleEditClick}>Pay</MenuItem>
                                                        <MenuItem onClick={handleStatusClick}>Status</MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Paper>

                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                >
                    <DialogTitle sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 20, fontWeight: 600, color: "#630000" }}>Bill Details</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <>
                                {selectedUser.pictures ? (
                                    <Typography variant="body1" sx={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 3 }}>
                                        <img
                                            src={`http://localhost:2000${selectedUser.pictures}`}
                                            alt={selectedUser.name}
                                            style={{ width: '250px', height: '250px', borderRadius: "10%" }}
                                        />
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" sx={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 3 }}>
                                    </Typography>
                                )}
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                        <Typography variant="body1"><strong>ID:</strong></Typography>
                                        <Typography variant="body1"><strong>User ID:</strong></Typography>
                                        <Typography variant="body1"><strong>Name:</strong></Typography>
                                        <Typography variant="body1"><strong>Block-No:</strong></Typography>
                                        <Typography variant="body1"><strong>Flat-No:</strong></Typography>
                                        <Typography variant="body1"><strong>Transaction Type:</strong></Typography>
                                        <Typography variant="body1"><strong>Transaction Id:</strong></Typography>
                                        <Typography variant="body1"><strong>Amount:</strong></Typography>
                                        <Typography variant="body1"><strong>Paid Amount:</strong></Typography>
                                        <Typography variant="body1"><strong>Status:</strong></Typography>
                                        <Typography variant="body1"><strong>Payed On:</strong></Typography>
                                    </Grid >
                                    <Grid item>
                                        <Typography variant="body1">{selectedUser._id ? selectedUser._id : '----'}</Typography>
                                        <Typography variant="body1">{selectedUser.userId ? selectedUser.userId : '----'}</Typography>
                                        <Typography variant="body1"> {selectedUser.name ? selectedUser.name : "----"}</Typography>
                                        <Typography variant="body1">{selectedUser.blockno ? selectedUser.blockno : '----'}</Typography>
                                        <Typography variant="body1">{selectedUser.flatno ? selectedUser.flatno : "----"}</Typography>
                                        <Typography variant="body1">{selectedUser.transactionType ? selectedUser.transactionType : '----'}</Typography>
                                        <Typography variant="body1">{selectedUser.transactionId ? selectedUser.transactionId : '----'} </Typography>
                                        <Typography variant="body1">{selectedUser.amount ? selectedUser.amount : "----"}</Typography>
                                        <Typography variant="body1">{selectedUser.paidAmount ? selectedUser.paidAmount : "----"}</Typography>
                                        <Typography variant="body1">{selectedUser.status ? selectedUser.status : '----'}</Typography>
                                        <Typography variant="body1">{selectedUser.payedOn ? new Date(selectedUser.payedOn).toLocaleString() : "----"}</Typography>
                                    </Grid >
                                </Grid >
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

                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={maintainance.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </ThemeProvider >
    );
};

export default List;