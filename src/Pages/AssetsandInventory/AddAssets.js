import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  createTheme,
  ThemeProvider,
  IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchaddAssets } from "../AssetsandInventory/AssetsListSlice";
import Dialog from '../../DialogBox/DialogBox';

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000"
    }
  }
});

const AddAssets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const addAssetsStatus = useSelector(state => state.addAssets);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const successMessage = useSelector((state) => state.Assetlist.successMessage);
  const [showDialog, setShowDialog] = useState(false);

  const [assetData, setAssetData] = useState({
    facilityName: "",
    purchaseDate: "",
    assetCost: "",
    image: null
  });

  const handleInputChange = e => {
    setAssetData({ ...assetData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("facilityName", assetData.facilityName);
    formData.append("assetCost", assetData.assetCost);
    formData.append("societyId", "6683b57b073739a31e8350d0");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    dispatch(fetchaddAssets(formData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/assets");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)} >
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Add Asset
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {/* {addAssetsStatus === "succeeded" &&
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="success">
                Asset added successfully!
              </Typography>
            </Grid>} */}
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              variant="outlined"
              label="Facility Name"
              name="facilityName"
              value={assetData.facilityName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Cost"
              name="assetCost"
              value={assetData.assetCost}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} style={{ position: 'relative' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
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

          <Grid item xs={12}>
            {imagePreview && (
              <Box mt={2} textAlign="center">
                <img src={imagePreview} alt="Preview" style={{ marginRight: "40%", maxWidth: '100%', borderRadius: '8px', maxHeight: '200px' }} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
            <Button
              type="Add"
              variant="contained"
              onClick={handleSave}
              sx={{
                mt: 2,
                backgroundColor: '#630000',
                width: '11%',
                
                '&:hover': {
                  backgroundColor: '#630000',
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Dialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Box>

    </ThemeProvider>
  );
};

export default AddAssets;