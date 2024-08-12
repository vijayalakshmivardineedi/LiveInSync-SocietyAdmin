import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  MenuItem,
  Menu,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { fetchComplaints, deleteComplaintAsync } from "../Complaint/ComplaintSlice";
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

const initialUsers = [];

const List = () => {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const complaints = useSelector(state => state.complaintList.Complaints || []);
  const status = useSelector(state => state.complaintList.status);
  const error = useSelector(state => state.complaintList.error);
  const successMessage = useSelector(state => state.complaintList.successMessage);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchComplaints())
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data...</div>;
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      dispatch(deleteComplaintAsync({ complaintId: selectedUser.complaintId })).then(() => {
        setDeleteDialogOpen(false);
        handleMenuClose();
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(fetchComplaints())
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleMenuClose();
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

  const handleSelectAllClick = event => {
    const newSelected = event.target.checked
      ? filteredUsers.map(data => data.id)
      : [];
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };

  const filteredUsers = complaints.filter(data =>
    data.complaintBy.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleMenuOpen = (event, data) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(data);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

  };

  const handleViewClick = () => {
    setDialogOpen(true);
    handleMenuClose(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
          <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
            Complaints
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Name & User-ID</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Date & Time</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Resolution</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => {
                  const isItemSelected = isSelected(data.complaintId);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={data.complaintId}
                      selected={isItemSelected}
                    >
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.complaintId}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.complaintCategory}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.complaintType}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.complaintTitle}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{data.complaintBy}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>{data.userId}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {new Date(data.dateAndTime).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.description}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}>
                        {data.resolution}
                      </TableCell>
                      <TableCell >
                        <GradientIconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={event => handleMenuOpen(event, data)}
                        >
                          <MoreVertIcon />
                        </GradientIconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000' }}>{" Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 17 }}>
              " Are you sure you want to delete this complaint?? "
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirm} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: 600, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
            <Button onClick={handleDeleteCancel} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, fontWeight: 600, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
          </DialogActions>
        </Dialog>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch"
            }
          }}
        >
          <MenuItem onClick={handleViewClick}>View</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "red" }}>Delete</MenuItem>
        </Menu>

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: "#630000" }} >Complaint Details</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", }}>
                      <strong> ID:</strong></Typography>
                    <Typography variant="body1">
                      <strong> Category:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong> Type:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong> Title:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong> By:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Date & Time:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Description:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Resolution:</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", }}>
                      {selectedUser.complaintId}</Typography>
                    <Typography variant="body1">
                      {selectedUser.complaintCategory}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.complaintType}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.complaintTitle}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.complaintBy}
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedUser.dateAndTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.description}
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.resolution}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{
              border: "1px solid #630000",
              color: "#630000",
              fontSize: 15,
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#630000',
                color: "white",
              }
            }}>
              Close
            </Button>
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
