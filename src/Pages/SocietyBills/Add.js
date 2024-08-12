import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Grid, IconButton, createTheme, ThemeProvider, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from '@mui/system';
import Dialog from '../../DialogBox/DialogBox';
import { createBill } from './SocietyBillsSlice';

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

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Red Hat Display, sans-serif',
  backgroundColor: "#630000",
  '&:hover': {
    backgroundColor: "#630000",
  },
}));

const AddSocietyBills = () => {
  const dispatch = useDispatch();
  const societyId = "6683b57b073739a31e8350d0";
  const [formData, setFormData] = useState({
    societyId: societyId,
    name: '',
    status: '',
    amount: '',
    monthAndYear: '',
    pictures: '',
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State for file name

  const statusOptions = ['Paid', 'Unpaid'];
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [AddHover, setAddHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.societyBills.successMessage);
  const fileInputRef = useRef(null);
  console.log(successMessage)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'pictures' && !formData[key]) {  // Exclude 'pictures' from validation
        newErrors[key] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // FormData to handle file uploads
    const formDataToAdd = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'pictures') {
        formDataToAdd.append(key, formData[key]);
      }
    });
    if (file) {
      formDataToAdd.append('pictures', file);  // Append file to FormData
    }

    dispatch(createBill(formDataToAdd)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          societyId: societyId,
          name: '',
          status: '',
          amount: '',
          monthAndYear: '',
          pictures: '',
        });
        setFile(null);
        setFileName('');
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/societyBills");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  const isImageFile = (file) => {
    return file && file.type.startsWith('image/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Add Bill
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Bill'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Month And Year'
                name='monthAndYear'
                value={formData.monthAndYear}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.monthAndYear}
                helperText={errors.monthAndYear}
                type='month'  // Set type to 'month'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
                {errors.status && <Typography color="error">{errors.status}</Typography>}
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <Button
                  variant="contained"
                  component="span"
                  sx={{
                    color: '#630000',
                    backgroundColor: '#fff',
                    border: '1px solid #630000',
                    fontWeight: '600',
                    fontSize: 15,
                    fontFamily: 'Red Hat Display, sans-serif',
                    '&:hover': {
                      backgroundColor: '#630000',
                      color: '#fff',
                    },
                  }}
                  onClick={handleFileClick}
                >
                  Upload Image
                </Button>
              <input
                type='file'
                name='pictures'
                accept='image/*,application/pdf,.docx,.xlsx'
                onChange={handleFileChange}
                style={{ display: 'none' }}  // Hide the file input
                ref={fileInputRef}  // Reference to trigger file input
              />
              {fileName && (
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  {fileName}
                </Typography>
              )}
              {errors.pictures && <Typography color="error">{errors.pictures}</Typography>}
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="span"
                sx={{
                  color: '#630000',
                  backgroundColor: '#fff',
                  border: '1px solid #630000',
                  fontWeight: '600',
                  fontSize: 15,
                  fontFamily: 'Red Hat Display, sans-serif',
                  '&:hover': {
                    backgroundColor: '#630000',
                    color: '#fff',
                  },
                }}
                onClick={handleFileClick}
              >
                Upload Image
              </Button>
              <input
                type='file'
                name='pictures'
                accept='image/*,application/pdf,.docx,.xlsx'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              {fileName && (
                isImageFile(file) ? (
                  <Box mt={2} mb={2}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Selected file"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    {fileName}
                  </Typography>
                )
              )}
              {errors.pictures && <Typography color="error">{errors.pictures}</Typography>}
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                style={{
                  backgroundColor: AddHover ? '#630000' : '#630000',
                  color: AddHover ? 'white' : 'white',
                  borderColor: AddHover ? '#630000' : 'transparent',
                  fontFamily: 'Red Hat Display, sans-serif',
                  width: "11%"
                }}
                onMouseEnter={
                  () => setAddHover(true)}
                onMouseLeave={() => setAddHover(false)}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Dialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AddSocietyBills;
