import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSequrityPerson, updateSequrity } from './GateKeeperSlice';
import { Box, Button, TextField, Typography, Grid, IconButton } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
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

const EditSequrity = () => {
  const dispatch = useDispatch();
  const { sequrityId } = useParams();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.gateKeepers.sequrity);
  const status = useSelector((state) => state.gateKeepers.status);
  const error = useSelector((state) => state.gateKeepers.error);
  const successMessage = useSelector((state) => state.gateKeepers.successMessage);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    aadharNumber: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      state: '',
      postalCode: '',
    },
    picture: null,
  });

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    dispatch(getSequrityPerson(sequrityId));
  }, [dispatch, sequrityId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        role: profile.role,
        aadharNumber: profile.aadharNumber,
        address: {
          addressLine1: profile.address?.addressLine1 || '',
          addressLine2: profile.address?.addressLine2 || '',
          state: profile.address?.state || '',
          postalCode: profile.address?.postalCode || '',
        },
        picture: null,
      });
      setPreviewImage(`http://localhost:2000${profile.pictures}`);
    }
  }, [profile]);

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
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      picture: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'address') {
        Object.keys(formData[key]).forEach((nestedKey) => {
          data.append(`address[${nestedKey}]`, formData[key][nestedKey]);
        });
      } else if (key === 'picture' && formData[key]) {
        data.append('picture', formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(updateSequrity({ sequrityId, formData: data })).then(() => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(getSequrityPerson(sequrityId));
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
              Edit Security
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <form onSubmit={handleSubmit}>
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
                {previewImage && (
                  <Box mt={2} textAlign="center">
                    <img
                      src={previewImage}
                      alt="Iamge Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius:'10px'}}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    fontFamily: "Red Hat Display, sans-serif",
                    backgroundColor: "#630000",
                    width: "11%",
                    '&:hover': {
                      backgroundColor: "#630000",
                    },
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
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

export default EditSequrity;