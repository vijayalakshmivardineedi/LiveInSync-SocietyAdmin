import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, IconButton } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { editCommityMembers, getCommityMembersById } from './committeeSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
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

const EditCommityMembers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const profile = useSelector((state) => state.commityMembers.commityMember);
  const status = useSelector((state) => state.commityMembers.status);
  const error = useSelector((state) => state.commityMembers.error);
  const successMessage = useSelector((state) => state.commityMembers.successMessage);

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

  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCommityMembersById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        societyId: profile.societyId,
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        role: profile.role,
        designation: profile.designation,
        blockNumber: profile.blockNumber,
        flatNumber: profile.flatNumber,
        pictures: null,
        picturePreview: `http://localhost:2000${profile.pictures}`,
      });
      setPreviewImage(`http://localhost:2000${profile.pictures}`);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pictures: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append non-picture fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== 'pictures') {
        data.append(key, formData[key]);
      }
    });

    // Append new picture file if selected
    if (formData.pictures) {
      data.append('pictures', formData.pictures);
    }

    // Log FormData keys and values (optional)
    for (const pair of data.entries()) {
    }

    dispatch(editCommityMembers({ id, formData: data })).then(() => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(getCommityMembersById(id));
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GradientIconButton onClick={() => navigate(-1)}>
            <IoArrowBackSharp />
          </GradientIconButton>
          <Typography
            variant="h5"
            sx={{ fontFamily: "Red Hat Display, sans-serif", color: "#630000", fontSize: 25, fontWeight: 600 }}>
            Edit Committee Member
          </Typography>
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
                  label='Designation'
                  name='designation'
                  value={formData.designation}
                  onChange={handleChange}
                  variant='outlined'
                  required
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="pictures"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="pictures">
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
                      alt="Picture Preview"
                      style={{ maxWidth: '200px', maxHeight: '250px', borderRadius: "10px" }}
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
                    fontFamily: 'Red Hat Display, sans-serif', fontSize: 17, marginTop: '20px', width: "20%", '&:hover': {
                      backgroundColor: '#630000',
                    },
                  }} > Update
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

export default EditCommityMembers;