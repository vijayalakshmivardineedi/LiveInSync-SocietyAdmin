import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Typography,
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
import { useNavigate } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { fetchDocuments, deleteDocuments } from './DocumentsSlice';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
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
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector(state => state.documents.successMessage);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const doccument = useSelector(state => state.documents.document || []);

  useEffect(() => {
    dispatch(fetchDocuments());
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
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    setOpenViewDialog(true);
    handleMenuClose();
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };


  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      dispatch(deleteDocuments({ id: selectedUser._id })).then(() => {
        setDeleteDialogOpen(false);
        handleMenuClose();
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(fetchDocuments());
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
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
            Residents Documents
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Document</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Block</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Flat</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(doccument) && doccument.length > 0 ? (
                doccument
                  .filter(user =>
                    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>
                        <a
                          href={`http://localhost:2000${user.pictures}`} // Assuming this is the correct path to the file
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {/* Here you can display an icon or text representing the file */}
                          <Typography variant="body2">
                            Download File
                          </Typography>
                        </a>
                      </TableCell>
                      <TableCell>{user.documentTitle}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.blockNumber}</TableCell>
                      <TableCell>{user.flatNumber}</TableCell>
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
          count={doccument.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

<Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
          <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 20, fontWeight: 700, color: "#630000" }} >Document</DialogTitle>
          {selectedUser && (
            <DialogContent dividers={false}>
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                {/* <TableCell>
                  <a
                    href={`http://localhost:2000${selectedUser.pictures}`} // Assuming this is the correct path to the file
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Typography variant="body2">
                      Download File
                    </Typography>
                  </a>
                </TableCell> */}
                <Box>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>ID:</strong>
                      </Typography>
                      <Typography variant="body1">
                        <strong>Title:</strong>
                      </Typography>
                      <Typography variant="body1">
                        <strong>Name:</strong>
                      </Typography>
                      <Typography variant="body1">
                        <strong>Block:</strong>
                      </Typography>
                      <Typography variant="body1">
                        <strong>Flat:</strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {selectedUser._id}
                      </Typography>
                      <Typography variant="body1">
                        {selectedUser.documentTitle}
                      </Typography>
                      <Typography variant="body1">
                        {selectedUser.name}
                      </Typography>
                      <Typography variant="body1">
                        {selectedUser.blockNumber}
                      </Typography>
                      <Typography variant="body1">
                        {selectedUser.flatNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              variant="outlined"
              sx={{
                height: 40,
                marginLeft: 2,
                color: '#630000',
                border: '2px solid #630000',
                fontWeight: '600',
                fontSize: 15,
                fontFamily: "Red Hat Display, sans-serif",
                '&:hover': {
                  backgroundColor: '#630000',
                  color: '#fff',
                  borderColor: '#630000',
                },
              }}
              onClick={handleCloseViewDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle sx={{fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000'}}>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              " Are you sure you want to delete this Document ?? "
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirm} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
            <Button onClick={handleDeleteCancel} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
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