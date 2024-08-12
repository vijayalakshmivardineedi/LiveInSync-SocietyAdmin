import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';
import { editAdvertisement, getAdvertisementsById } from './AdvertisementSlice';

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

const EditAdd = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const advertisement = useSelector(state => state.advertisements.adds);
  const status = useSelector((state) => state.advertisements.status);
  const error = useSelector((state) => state.advertisements.error);
  const successMessage = useSelector((state) => state.advertisements.successMessage);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    adv: '',
    phoneNumber: '',
    userName: '',
    status: '',
    details: {
      block: '',
      flat_No: '',
      flat_Area: '',
      rooms: '',
      washrooms: '',
      price: "",
      maintainancePrice: "",
      parkingSpace: '',
    },
    pictures: [], // Initialize with an empty array
  });

  const statusOptions = ['Occupied', 'Unoccupied'];
  const roomOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'];

  const [previewImages, setPreviewImages] = useState([]);
  const [newFilesSelected, setNewFilesSelected] = useState(false); // Track if new files are selected

  useEffect(() => {
    dispatch(getAdvertisementsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (advertisement) {
      setFormData({
        adv: advertisement.adv || '',
        phoneNumber: advertisement.phoneNumber || '',
        userName: advertisement.userName || '',
        status: advertisement.status || '',
        details: {
          block: advertisement.details?.block || '',
          flat_No: advertisement.details?.flat_No || '',
          flat_Area: advertisement.details?.flat_Area || '',
          rooms: advertisement.details?.rooms || '',
          washrooms: advertisement.details?.washrooms || '',
          price: advertisement.details?.price || '',
          maintainancePrice: advertisement.details?.maintainancePrice || '',
          parkingSpace: advertisement.details?.parkingSpace || '',
        },
        pictures: advertisement.pictures || [], // Set existing pictures
      });

      // Update preview images
      const imagePreviews = advertisement.pictures?.map(pic => `http://localhost:2000${pic.img}`) || [];
      setPreviewImages(imagePreviews);
    }
  }, [advertisement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailKey = name.split('.')[1];
      setFormData(prevFormData => ({
        ...prevFormData,
        details: {
          ...prevFormData.details,
          [detailKey]: value,
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
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      pictures: files, // Update formData with new files
    }));
    setPreviewImages(filePreviews); // Update preview images with new files
    setNewFilesSelected(true); // Indicate that new files have been selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'details') {
        Object.keys(formData[key]).forEach((nestedKey) => {
          data.append(`details[${nestedKey}]`, formData[key][nestedKey]);
        });
      } else if (key !== 'pictures') {
        data.append(key, formData[key]);
      }
    });

    // Append pictures only if new files were selected
    if (newFilesSelected) {
      formData.pictures.forEach(file => data.append('pictures', file));
    }

    dispatch(editAdvertisement({ id, formData: data })).then(() => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(getAdvertisementsById(id));
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
              Edit Advertisement
            </Typography>
          </Box>
        </Box>

        {/* Display Existing Images and Upload New Images */}
        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#630000" }}>Current Images:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {previewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }}
              />
            ))}
          </Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-pictures"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="upload-pictures">
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
              Upload New Images
            </Button>
          </label>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Advertisement'
                  name='adv'
                  value={formData.adv}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant='outlined' required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                    label='Status'
                  >
                    {statusOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='User Name'
                  name='userName'
                  value={formData.userName}
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
                  label='Block'
                  name='details.block'
                  value={formData.details.block}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Flat Number'
                  name='details.flat_No'
                  value={formData.details.flat_No}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Flat Area'
                  name='details.flat_Area'
                  value={formData.details.flat_Area}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant='outlined' required>
                  <InputLabel>Rooms</InputLabel>
                  <Select
                    name='details.rooms'
                    value={formData.details.rooms}
                    onChange={handleChange}
                    label='Rooms'
                  >
                    {roomOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Washrooms'
                  name='details.washrooms'
                  value={formData.details.washrooms}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Price'
                  name='details.price'
                  value={formData.details.price}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Maintainance Price'
                  name='details.maintainancePrice'
                  value={formData.details.maintainancePrice}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Parking Space'
                  name='details.parkingSpace'
                  value={formData.details.parkingSpace}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
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

export default EditAdd;