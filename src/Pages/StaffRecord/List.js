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
  TablePagination,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { fetchStaffRecord } from './ListSlice';

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
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const dispatch = useDispatch();
  const Staff = useSelector(state => state.staffRecord.staff);
  const status = useSelector(state => state.staffRecord.status);
  const error = useSelector(state => state.staffRecord.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStaffRecord());
  }, [dispatch]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (event, staff) => {
    setAnchorEl(event.currentTarget);
    setSelectedStaff(staff);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    handleMenuClose();
    navigate(`/view/visitorRecord/${selectedStaff.userId}`);
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

  const filteredStaff = Array.isArray(Staff)
    ? Staff.filter(staff =>
      staff.userId && staff.userId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const paginatedStaff = filteredStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
        <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
          Staff Passageway Record
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Service Type</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Check-In DateTime</TableCell>
              <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700 }}>Check-Out DateTime</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaff.map(staff => (
              <TableRow key={staff._id}>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{staff.userId}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>{staff.serviceType}</TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>
                  {staff.checkInDateTime
                    ? new Date(staff.checkInDateTime).toLocaleString()
                    : '----'}
                </TableCell>
                <TableCell sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 15, }}>
                  {staff.checkOutDateTime
                    ? new Date(staff.checkOutDateTime).toLocaleString()
                    : '----'}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredStaff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </ThemeProvider>
  );
}

export default List;
