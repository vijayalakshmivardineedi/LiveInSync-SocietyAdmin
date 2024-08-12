import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, IconButton, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';
import { createAdvertisements } from './AdvertisementSlice';
import { fetchResidentProfile } from '../Profile/profileSlice';

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

const AddAdvertisements = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societyId: '6683b57b073739a31e8350d0',
    adv: "",
    phoneNumber: "",
    userName: "",
    status: "",
    details: {
      block: '',
      flat_No: '',
      flat_Area: '',
      rooms: '',
      washrooms: '',
      price: '',
      maintainancePrice: '',
      parkingSpace: '',
    },
    pictures: [],
    picturePreviews: [],
  });

  const profileData = useSelector(state => state.profile.profile);
  const [blockOptions, setBlockOptions] = useState([]);
  const [flatOptions, setFlatOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitHover, setSubmitHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.advertisements.successMessage || state.advertisements.error);

  const statusOptions = ['Occupied', 'Unoccupied'];
  const roomOptions = ['1BHK', '2BHK', '3BHK', '4BHK','5BHK'];

  useEffect(() => {
    dispatch(fetchResidentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData.blocks) {
      setBlockOptions(profileData.blocks.map(block => block.blockName));
    }
  }, [profileData.blocks]);

  useEffect(() => {
    const selectedBlock = profileData.blocks?.find(block => block.blockName === formData.details.block);
    if (selectedBlock) {
      setFlatOptions(selectedBlock.flats.map(flat => flat.flatNumber));
    } else {
      setFlatOptions([]);
    }
  }, [formData.details.block, profileData.blocks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailsKey = name.split('.')[1];
      setFormData(prevFormData => ({
        ...prevFormData,
        details: {
          ...prevFormData.details,
          [detailsKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.pictures.length > 5) {
      alert("You can upload a maximum of 5 pictures.");
      return;
    }

    const newPictures = [...formData.pictures, ...files];
    const newPicturePreviews = files.map(file => URL.createObjectURL(file));

    setFormData(prevFormData => ({
      ...prevFormData,
      pictures: newPictures.slice(-5), // Keep only the last 5 pictures
      picturePreviews: [...prevFormData.picturePreviews.slice(-5), ...newPicturePreviews], // Keep only the last 5 previews
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'details' && key !== 'pictures') {
        newErrors[key] = 'This field is required';
      }
    });
    Object.keys(formData.details).forEach(key => {
      if (!formData.details[key]) {
        newErrors[`details.${key}`] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append('societyId', formData.societyId);
    submissionData.append('adv', formData.adv);
    submissionData.append('userName', formData.userName);
    submissionData.append('status', formData.status);
    submissionData.append('phoneNumber', formData.phoneNumber);

    // Append details as a JSON string
    submissionData.append('details', JSON.stringify(formData.details));

    // Append all pictures with the correct field name
    formData.pictures.forEach(picture => {
      submissionData.append('pictures', picture); // Use 'pictures' field name
    });

    dispatch(createAdvertisements(submissionData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          societyId: '6683b57b073739a31e8350d0',
          adv: "",
          phoneNumber: "",
          userName: "",
          status: "",
          details: {
            block: '',
            flat_No: '',
            flat_Area: '',
            rooms: '',
            washrooms: '',
            price: '',
            maintainancePrice: '',
            parkingSpace: '',
          },
          pictures: [],
          picturePreviews: [],
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/addsList");
        }, 2000);
      } else {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    return () => {
      // Clean up URLs to avoid memory leaks
      formData.picturePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [formData.picturePreviews]);

  return (
    <ThemeProvider theme={theme}>
      <Box  >
        <Box sx={{
          width: "100%", padding: "5px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Add Advertisements
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required error={!!errors.adv}>
                <InputLabel>Advertisement</InputLabel>
                <Select
                  label="Advertisement"
                  name="adv"
                  value={formData.adv}
                  onChange={handleChange}
                >
                  {['Rent', 'Sale'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.adv && <Typography color="error">{errors.adv}</Typography>}
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
                error={!!errors.userName}
                helperText={errors.userName}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Block</InputLabel>
                <Select
                  label="Block"
                  name="details.block"
                  value={formData.details.block}
                  onChange={handleChange}
                >
                  {blockOptions.map((block) => (
                    <MenuItem key={block} value={block}>
                      {block}
                    </MenuItem>
                  ))}
                </Select>
                {errors['details.block'] && <Typography color="error">{errors['details.block']}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Flat Number</InputLabel>
                <Select
                  label="Flat Number"
                  name="details.flat_No"
                  value={formData.details.flat_No}
                  onChange={handleChange}
                >
                  {flatOptions.map((flat) => (
                    <MenuItem key={flat} value={flat}>
                      {flat}
                    </MenuItem>
                  ))}
                </Select>
                {errors['details.flat_No'] && <Typography color="error">{errors['details.flat_No']}</Typography>}
              </FormControl>
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
                error={!!errors['details.flat_Area']}
                helperText={errors['details.flat_Area']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required error={!!errors['details.rooms']}>
                <InputLabel>Rooms</InputLabel>
                <Select
                  label="Rooms"
                  name="details.rooms"
                  value={formData.details.rooms}
                  onChange={handleChange}
                >
                  {roomOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors['details.rooms'] && (
                  <Typography color="error">{errors['details.rooms']}</Typography>
                )}
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
                error={!!errors['details.washrooms']}
                helperText={errors['details.washrooms']}
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
                error={!!errors['details.price']}
                helperText={errors['details.price']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Maintenance Price'
                name='details.maintainancePrice'
                value={formData.details.maintainancePrice}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors['details.maintainancePrice']}
                helperText={errors['details.maintainancePrice']}
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
                error={!!errors['details.parkingSpace']}
                helperText={errors['details.parkingSpace']}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
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
                  Upload Images
                </Button>
              </label>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
                {formData.picturePreviews.map((preview, index) => (
                  <Box key={index} sx={{ position: 'relative', marginRight: 1, marginBottom: 1 }}>
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <IconButton
                      onClick={() => {
                        const updatedPreviews = formData.picturePreviews.filter((_, i) => i !== index);
                        const updatedPictures = formData.pictures.filter((_, i) => i !== index);
                        updatedPreviews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          picturePreviews: updatedPreviews,
                          pictures: updatedPictures
                        }));
                      }}
                      sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                    >
                      &times;
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                onMouseOver={() => setSubmitHover(true)}
                onMouseOut={() => setSubmitHover(false)}
                sx={{
                  mt: 1,
                  backgroundColor: '#630000',
                  width: '11%',
                  height: 40,
                  '&:hover': {
                    backgroundColor: '#630000',
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

export default AddAdvertisements;
