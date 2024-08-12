import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, IconButton, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';
import { createAmenity } from './AmenitiesSlice';

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

const AddAmenity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    societyId: '6683b57b073739a31e8350d0',
    amenityName: "",
    capacity: "",
    timings: "",
    location: "",
    cost: "",
    status: "",
    image: null,
    picturePreview: null,
  });

  const [errors, setErrors] = useState({});
  const [submitHover, setSubmitHover] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.amenities.successMessage || state.amenities.error);

  const statusOptions = ['Available', 'Booked'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prevFormData => ({
        ...prevFormData,
        image: file,
        picturePreview: preview
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'image' && key !== 'picturePreview' && key !== 'cost' && key !== 'capacity') {
        newErrors[key] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append('societyId', formData.societyId);
    submissionData.append('amenityName', formData.amenityName);
    submissionData.append('timings', formData.timings);
    submissionData.append('location', formData.location);
    submissionData.append('status', formData.status);

    if (formData.cost) {
      submissionData.append('cost', formData.cost);
    }

    if (formData.image) {
      submissionData.append('image', formData.image);
    }

    dispatch(createAmenity(submissionData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setFormData({
          societyId: '6683b57b073739a31e8350d0',
          amenityName: "",
          capacity: "",
          timings: "",
          location: "",
          cost: "",
          status: "",
          image: null,
          picturePreview: null,
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/amenities");
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
      if (formData.picturePreview) {
        URL.revokeObjectURL(formData.picturePreview);
      }
    };
  }, [formData.picturePreview]);

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
              Add Amenity
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 3, borderRadius: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Amenity Name'
                name='amenityName'
                value={formData.amenityName}
                onChange={handleChange}
                variant='outlined'
                required
                error={!!errors.amenityName}
                helperText={errors.amenityName}
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
                error={!!errors.capacity}
                helperText={errors.capacity}
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
                error={!!errors.timings}
                helperText={errors.timings}
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
                error={!!errors.location}
                helperText={errors.location}
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
                error={!!errors.cost}
                helperText={errors.cost}
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
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
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
                  Upload Image
                </Button>
              </label>

            </Grid>
            {formData.picturePreview && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mt: 2 }}>
                  <img
                    src={formData.picturePreview}
                    alt="Preview"
                    style={{ width: '250px', height: '200px', objectFit: 'cover', marginRight: '10px' }}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12} sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: submitHover ? "#630000" : "#fff",
                  backgroundColor: submitHover ? "#fff" : "#630000",
                  border: "1px solid #630000",
                  fontWeight: "600",
                  fontSize: 15,
                  fontFamily: "Red Hat Display, sans-serif",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#630000",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog showDialog={showDialog} message={successMessage} />
    </ThemeProvider>
  );
};

export default AddAmenity;