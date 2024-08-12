import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TablePagination,
  ThemeProvider,
  createTheme,
  styled
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { fetchVisitors } from './ListSlice';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const dispatch = useDispatch();
  const Visitors = useSelector(state => state.visitorsRecords.visitors);
  const status = useSelector(state => state.visitorsRecords.status);
  const error = useSelector(state => state.visitorsRecords.error);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (event, visitor) => {
    setAnchorEl(event.currentTarget);
    setSelectedVisitor(visitor);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    handleMenuClose();
    navigate(`/view/visitorRecord/${selectedVisitor.visitorId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const filteredVisitors = Array.isArray(Visitors)
    ? Visitors.filter(visitor =>
      visitor.name && visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];
  const paginatedVisitors = filteredVisitors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
        <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
          Visitors Passageway Record
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Type</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Mobile Number</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Block</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Flat</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Check-In</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Check-Out</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVisitors.map(visitor => (
              <TableRow key={visitor._id}>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.visitorId}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>
                  <Box>
                    <img
                      src={`http://localhost:2000${visitor.pictures}`}
                      alt={visitor.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.name}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.role}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.phoneNumber}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.block}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.flatNo}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>
                  {visitor.date ? visitor.date : "----"}
                </TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>
                  {visitor.checkInDateTime
                    ? new Date(visitor.checkInDateTime).toLocaleString()
                    : '----'}
                </TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>
                  {visitor.checkOutDateTime
                    ? new Date(visitor.checkOutDateTime).toLocaleString()
                    : '----'}
                </TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15 }}>{visitor.status}</TableCell>
                <TableCell>
                  <GradientIconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={event => handleMenuClick(event, visitor)}
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
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredVisitors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
}

export default List;
