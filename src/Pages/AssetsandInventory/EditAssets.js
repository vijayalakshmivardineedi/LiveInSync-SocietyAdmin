import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid, IconButton } from '@mui/material';
import { IoArrowBackSharp } from 'react-icons/io5';
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../../DialogBox/DialogBox';
import { fetchEditAssetsAsync, getAssetByIdAndSocietyId } from './AssetsListSlice';

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

  const asset = useSelector(state => state.Assetlist.Assets);
  const status = useSelector((state) => state.Assetlist.status);
  const error = useSelector((state) => state.Assetlist.error);
  const successMessage = useSelector((state) => state.Assetlist.successMessage);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    assetId: '',
    image: '',
    facilityName: '',
    assetCost: '',
  });

  console.log(asset)

  const [previewImages, setPreviewImages] = useState([]);
  const [newFilesSelected, setNewFilesSelected] = useState(false);

  useEffect(() => {
    dispatch(getAssetByIdAndSocietyId(id));
  }, [dispatch, id]);

  

  useEffect(() => {
    if (asset) {
      setFormData({
        assetId: asset.assetId || '',
        image: asset.image || '',
        facilityName: asset.facilityName || '',
        assetCost: asset.assetCost || '',
      });

      // Update preview images
      const imagePreviews = asset.image ? [`http://localhost:2000${asset.image}`] : [];
      setPreviewImages(imagePreviews);
    }
  }, [asset]);

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
      setPreviewImages([filePreview]);
      setNewFilesSelected(true);
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

    dispatch(fetchEditAssetsAsync({ id, formData: data })).then(() => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
      dispatch(getAssetByIdAndSocietyId(id));
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
              Edit Asset
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
                  label='Asset ID'
                  name='assetId'
                  value={formData.assetId}
                  variant='outlined'
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Facility Name'
                  name='facilityName'
                  value={formData.facilityName}
                  onChange={handleChange}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Cost'
                  name='assetCost'
                  value={formData.assetCost}
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
