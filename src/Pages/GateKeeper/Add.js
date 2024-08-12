import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, IconButton, Grid } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { createSequrity } from './GateKeeperSlice';
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

const AddSequrity = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    societyId: '6683b57b073739a31e8350d0',
    name: '',
    email: "",
    phoneNumber: "",
    role: "Sequrity",
    details: "",
    aadharNumber: "",
    address: {
      addressLine1: '',
      addressLine2: '',
      state: '',
      postalCode: '',
    },
    password: "",
    picture: null,
    picturePreview: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [submitHover, setAddHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const profile = useSelector((state) => state.gateKeepers.sequrity);
  const successMessage = useSelector((state) => state.gateKeepers.successMessage);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressKey = name.split('.')[1];
      setFormData(prevFormData => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      picture: file,
      picturePreview: URL.createObjectURL(file),
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // Validate form data
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'details' && key !== 'picture' && key !== 'picturePreview') {
        newErrors[key] = 'This field is required';
      }
    });
    Object.keys(formData.address).forEach(key => {
      if (!formData.address[key]) {
        newErrors[`address.${key}`] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append('address[addressLine1]', formData.address.addressLine1);
    submissionData.append('address[addressLine2]', formData.address.addressLine2);
    submissionData.append('address[state]', formData.address.state);
    submissionData.append('address[postalCode]', formData.address.postalCode);

    submissionData.append('societyId', formData.societyId);
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    submissionData.append('phoneNumber', formData.phoneNumber);
    submissionData.append('role', formData.role);
    submissionData.append('details', formData.details);
    submissionData.append('aadharNumber', formData.aadharNumber);
    submissionData.append('password', formData.password);
    if (formData.picture) {
      submissionData.append('picture', formData.picture);
    }

    dispatch(createSequrity(submissionData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          societyId: '6683b57b073739a31e8350d0',
          name: '',
          email: "",
          phoneNumber: "",
          role: "Sequrity",
          details: "",
          aadharNumber: "",
          address: {
            addressLine1: '',
            addressLine2: '',
            state: '',
            postalCode: '',
          },
          password: "",
          picture: null,
          picturePreview: null,
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/gatekeeper/list");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
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
              Add Security
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
                label='Aadhar Number'
                name='aadharNumber'
                value={formData.aadharNumber}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.aadharNumber}
                helperText={errors.aadharNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Address Line 1'
                name='address.addressLine1'
                value={formData.address.addressLine1}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors['address.addressLine1']}
                helperText={errors['address.addressLine1']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Address Line 2'
                name='address.addressLine2'
                value={formData.address.addressLine2}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors['address.addressLine2']}
                helperText={errors['address.addressLine2']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='State'
                name='address.state'
                value={formData.address.state}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors['address.state']}
                helperText={errors['address.state']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Postal Code'
                name='address.postalCode'
                value={formData.address.postalCode}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors['address.postalCode']}
                helperText={errors['address.postalCode']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Details'
                name='details'
                value={formData.details}
                onChange={handleChange}
                variant='outlined'
                error={!!errors.details}
                helperText={errors.details}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="picture"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="picture">
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
                >
                  Upload Image
                </Button>
              </label>
              {formData.picturePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={formData.picturePreview}
                    alt="Image Preview"
                    style={{ maxWidth: '100%', fontFamily: "Red Hat Display, sans-serif", maxHeight: '200px' }}
                  />
                </Box>
              )}
              {errors.picture && <Typography color="error">{errors.picture}</Typography>}
            </Grid>
            <Grid item xs={12} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
            <Button
                fullWidth
              variant='contained'
              onClick={handleAdd}
              onMouseEnter={() => setAddHover(true)}
              onMouseLeave={() => setAddHover(false)}
                sx={{
                  backgroundColor: "#630000",
                  fontFamily: "Red Hat Display, sans-serif",
                  width: "11%",
                  '&:hover': {
                    backgroundColor: "#630000",
                  },
                }}
                type="Add"
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

export default AddSequrity;