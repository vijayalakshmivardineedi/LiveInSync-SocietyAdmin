import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, IconButton } from '@mui/material';
import { IoArrowBackSharp } from 'react-icons/io5';
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';
import {  getAmenityById, updateAmenity } from './AmenitiesSlice';

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

const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const amenity = useSelector(state => state.amenities.amenities);
  const status = useSelector((state) => state.amenities.status);
  const error = useSelector((state) => state.amenities.error);
  const successMessage = useSelector((state) => state.amenities.successMessage);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    societyId: '',
    image: '',
    amenityName: '',
    capacity: '',
    timings: '',
    location: '',
    cost: '',
    status: '',
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [newFilesSelected, setNewFilesSelected] = useState(false); // Track if new files are selected

  useEffect(() => {
    dispatch(getAmenityById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (amenity) {
      setFormData({
        societyId: amenity.societyId || '',
        image: amenity.image || '',
        amenityName: amenity.amenityName || '',
        capacity: amenity.capacity || '',
        timings: amenity.timings || '',
        location: amenity.location || '',
        cost: amenity.cost || '',
        status: amenity.status || '',
      });

      // Update preview images
      const imagePreviews = amenity.image ? [`http://localhost:2000${amenity.image}`] : [];
      setPreviewImages(imagePreviews);
    }
  }, [amenity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setFormData(prevData => ({
        ...prevData,
        image: file,
      }));
      setPreviewImages([filePreview]); // Update preview images with the new file
      setNewFilesSelected(true); // Indicate that new files have been selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'image') {
        data.append(key, formData[key]);
      } else if (newFilesSelected) {
        data.append('image', formData[key]);
      }
    });

    dispatch(updateAmenity({ id, formData: data })).then(() => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(getAmenityById(id));
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
              Edit Amenity
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2,}}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, marginLeft: "39%" }}>
            {previewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{width: '40%', height: '10%', borderRadius: '10px'}}
              />
            ))}
          </Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-image">
            <Button
              variant="contained"
              component="span"
              sx={{
                color: '#630000',
                backgroundColor: '#fff',
                border: '1px solid #630000',
                fontWeight: '600',
                fontSize: 15,
                marginLeft: "45%",
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
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Society ID'
                  name='societyId'
                  value={formData.societyId}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Amenity Name'
                  name='amenityName'
                  value={formData.amenityName}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Capacity'
                  name='capacity'
                  type='number'
                  value={formData.capacity}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Timings'
                  name='timings'
                  value={formData.timings}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Location'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Cost'
                  name='cost'
                  value={formData.cost}
                  onChange={handleChange}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Status'
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
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

export default Edit;
