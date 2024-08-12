import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  Button,
  ThemeProvider,
  DialogContentText,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import MyDialog from '../../DialogBox/DialogBox';
import { createTheme, styled } from '@mui/material/styles'
import { deleteEvent, fetchEvent } from './EventSlice'

const theme = createTheme({
  palette: {
    primary: {
      main: '#630000'
    }
  }
})

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(to right,#fb0707, #630000)',
  color: '#fff',
  border: '1px solid #fff',
  marginLeft: '10px',
  marginRight: '10px',
  '&:hover': {
    background: '#FFF',
    border: '1px solid #630000',
    '& svg': {
      color: '#630000'
    }
  },
  '& svg': {
    fontSize: '20px'
  }
}))

const List = () => {
  const dispatch = useDispatch()
  const { status, error } = useSelector(
    state => state.events.event
  );
  const successMessage = useSelector(state => state.events.successMessage);
  const event = useSelector(state => state.events.event);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate()
  console.log(event)

  useEffect(() => {
    dispatch(fetchEvent())
  }, [dispatch])

  const handleDeleteSelected = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
};

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const handleSearchChange = event => {
    setSearchText(event.target.value.toLowerCase())
  }

  const handleMenuOpen = (event, resident) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(resident)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewClick = () => {
    handleMenuClose()
    navigate(`/viewEvent/${selectedUser._id}`)
  }

  const handleEditClick = () => {
    handleMenuClose()
    navigate(`/editEvent/${selectedUser._id}`)
  }

  const handleDeleteClick = () => {
    handleDeleteSelected()
  }

  if (status === 'loading') {
    return <Typography>Loading...</Typography>
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>
  }

  const confirmDelete = () => {
    dispatch(deleteEvent(selectedUser._id)).then(() => {
        setDeleteDialogOpen(false);
        setSelectedUser(null);
        setShowDialog(true);
        setTimeout(() => {
            setShowDialog(false);
        }, 2000);
        dispatch(fetchEvent());
    }).catch((error) => {
        setDeleteDialogOpen(false);
        setSelectedUser(null);
        console.error("Error:", error);
    });
};

const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
};

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            mt: 2
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontFamily: 'Red Hat Display, sans-serif',
              fontSize: '23px',
              fontWeight: '700',
              color: '#630000'
            }}
          >
            Event
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Button
              variant='outlined'
              sx={{
                marginLeft: 2,
                color: '#630000',
                border: '2px solid #630000',
                fontWeight: '600',
                fontFamily: 'Red Hat Display, sans-serif',
                '&:hover': {
                  backgroundColor: '#630000',
                  color: '#fff',
                  borderColor: '#630000'
                }
              }}
              onClick={() => navigate('/addevent')}
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
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display, sans-serif',
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display,sans-serif',
                      fontWeight: 600,
                      fontSize: 16
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display, sans-serif',
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display, sans-serif',
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    Start Date & Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display, sans-serif',
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    End Date & Time
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Red Hat Display, sans-serif',
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(event) &&
                  event
                    .filter(resident => {
                      const Name = resident.Name?.toLowerCase() || ''
                      const startDate = resident.StartDate?.toString() || ''
                      const endDate = resident.EndDate?.toString() || ''
                      const flatType = resident.FlatType?.toLowerCase() || ''
                      const status = resident.Status?.toLowerCase() || ''

                      return (
                        Name.includes(searchText) ||
                        startDate.includes(searchText) ||
                        endDate.includes(searchText) ||
                        flatType.includes(searchText) ||
                        status.includes(searchText)
                      )
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(resident => (
                      <TableRow
                        key={resident._id}
                        selected={isSelected(resident._id)}
                      >
                        <TableCell
                          sx={{
                            fontFamily: 'Red Hat Display, sans-serif',
                            fontSize: 15
                          }}
                        >
                          {resident._id}
                        </TableCell>
                        <TableCell>
                          {' '}
                          {resident.pictures &&
                            resident.pictures.length > 0 &&
                            resident.pictures[0].img ? (
                            <img
                              src={`http://localhost:2000${resident.pictures[0].img}`}
                              alt={resident.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%'
                              }}
                            />
                          ) : (
                            <span>No Image Available</span>
                          )}{' '}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Red Hat Display, sans-serif',
                            fontSize: 15
                          }}
                        >
                          {resident.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Red Hat Display, sans-serif',
                            fontSize: 15
                          }}
                        >
                          {new Date(resident.startDate).toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Red Hat Display, sans-serif',
                            fontSize: 15
                          }}
                        >
                          {new Date(resident.endDate).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <GradientIconButton
                            aria-label='more'
                            aria-controls='long-menu'
                            aria-haspopup='true'
                            onClick={event => handleMenuOpen(event, resident)}
                          >
                            <MoreVertIcon />
                          </GradientIconButton>

                          <Menu
                            id='long-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                              style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch'
                              }
                            }}
                          >
                            <MenuItem onClick={handleViewClick}>View</MenuItem>
                            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClick} sx={{ color: 'red' }}>Delete</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog
          open={deleteDialogOpen}
          onClose={cancelDelete}
        >
          <DialogTitle sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 20, color: '#630000' }} >Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              " Are you sure you want to delete this Event ?? "
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDelete} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>Yes</Button>
            <Button onClick={cancelDelete} sx={{ fontWeight: 600, fontFamily: "Red Hat Display, sans-serif", fontSize: 16, border: "1px solid #630000", color: "#630000", "&:hover": { backgroundColor: "#630000", color: "#fff" } }}>No</Button>
          </DialogActions>
        </Dialog>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component='div'
          count={event.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <MyDialog
                message={successMessage}
                showDialog={showDialog}
                onClose={() => setShowDialog(false)}
            />
      </Box>
    </ThemeProvider>
  )
}

export default List