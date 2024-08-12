import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Grid, IconButton } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createCommityMembers } from './committeeSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';

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

const AddCommityMember = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    societyId: '6683b57b073739a31e8350d0',
    name: '',
    email: '',
    phoneNumber: '',
    role: 'CommityMember',
    designation: '',
    blockNumber: '',
    flatNumber: '',
    pictures: null,
    picturePreview: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [AddHover, setAddHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.commityMembers.successMessage);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pictures: file,
      picturePreview: URL.createObjectURL(file),
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'pictures' && key !== 'picturePreview') {
        newErrors[key] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(createCommityMembers(formData))
      .then(() => {
        setFormData({
          societyId: '6683b57b073739a31e8350d0',
          name: '',
          email: '',
          phoneNumber: '',
          role: 'CommityMember',
          designation: '',
          blockNumber: '',
          flatNumber: '',
          pictures: null,
          picturePreview: null,
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate('/userManagement/committee');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          sx={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Add Committee Member
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Mobile Number'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Designation'
                name='designation'
                value={formData.designation}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.designation}
                helperText={errors.designation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Block Number'
                name='blockNumber'
                value={formData.blockNumber}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.blockNumber}
                helperText={errors.blockNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Flat Number'
                name='flatNumber'
                value={formData.flatNumber}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.flatNumber}
                helperText={errors.flatNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="Image"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="Image">
                <Button variant="contained" component="span" sx={{
                  backgroundColor: '#fff',
                  color: '#630000',
                  border: '1px solid #630000',
                  '&:hover': {
                    backgroundColor: '#630000',
                    color: '#fff',
                  },
                }}>
                  Upload Image
                </Button>
              </label>
              {formData.picturePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={formData.picturePreview}
                    alt="Picture Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </Box>
              )}
              {errors.pictures && <Typography color="error">{errors.pictures}</Typography>}
            </Grid>
            <Grid item xs={12} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
              <Button
                fullWidth
                variant='contained'
                onClick={handleAdd}
                onMouseEnter={() => setAddHover(true)}
                onMouseLeave={() => setAddHover(false)}
                sx={{
                  width: '13%',
                  height: 40,
                  backgroundColor: '#630000',
                  border: '1px solid #630000',
                  '&:hover': {
                    backgroundColor: '#630000',
                    color: '#fff',
                  },
                }}
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

export default AddCommityMember;