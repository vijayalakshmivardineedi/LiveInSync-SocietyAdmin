import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton, createTheme, styled, ThemeProvider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import Dialog from '../../DialogBox/DialogBox';
import { getOne, updatePaymentDetails } from "./SocietyMaintainanceSlice";
const theme = createTheme({
  palette: {
    primary: {
      main: '#630000',
    },
  },
});
const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(to right,#FB0707, #630000)",
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
  const { blockno, flatno, monthAndYear } = useParams();
  const dispatch = useDispatch();
  const maintainance = useSelector((state) => state.maintainance.maintainances);
  const successMessage = useSelector((state) => state.maintainance.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const societyId = "6683b57b073739a31e8350d0";
  const [previewImage, setPreviewImage] = useState('');
  console.log(maintainance);
  const [formState, setFormState] = useState({
    societyId: societyId,
    userId: '',
    name: '',
    blockno: '',
    flatno: '',
    paidAmount: '',
    transactionType: '',
    status: '',
    monthAndYear: '',
    pictures: null,
  });
  useEffect(() => {
    dispatch(getOne({ blockno, flatno, monthAndYear }));
  }, [dispatch, blockno, flatno, monthAndYear]);
  useEffect(() => {
    if (maintainance) {
      setFormState({
        societyId: societyId,
        userId: maintainance.userId || '',
        name: maintainance.name || '',
        blockno: maintainance.blockno || '',
        flatno: maintainance.flatno || '',
        paidAmount: maintainance.paidAmount || '',
        transactionType: "Cash",
        status: 'Confirm',
        monthAndYear: monthAndYear,
        pictures: null,
      });
      setPreviewImage(`http://localhost:2000${maintainance.pictures}`);
    }
  }, [maintainance]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  const validateForm = () => {
    let tempErrors = {};
    tempErrors.userId = formState.userId ? "" : "User Id is required.";
    tempErrors.name = formState.name ? "" : "Name is required.";
    tempErrors.paidAmount = formState.paidAmount ? "" : "Amount is required.";
    tempErrors.monthAndYear = formState.monthAndYear ? "" : "Month and Year are required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { pictures, ...formData } = formState;
      const updateData = new FormData();
      for (const key in formData) {
        updateData.append(key, formData[key]);
      }
      if (pictures) {
        updateData.append('pictures', pictures);
      }
      dispatch(updatePaymentDetails({ formData: updateData })).then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
        dispatch(getOne({ blockno, flatno, monthAndYear }))
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormState((prevData) => ({
      ...prevData,
      pictures: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
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
              Payment Section
            </Typography>
          </Box>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              {previewImage && (
                <Box mt={2} textAlign="center">
                  <img
                    src={previewImage}
                    alt="Image Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }}
                  />
                </Box>
              )}
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="User Id"
                name="userId"
                variant="outlined"
                value={formState.userId}
                onChange={handleInputChange}
                error={!!errors.userId}
                helperText={errors.userId}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formState.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Month And Year'
                name='monthAndYear'
                value={formState.monthAndYear}
                onChange={handleInputChange}
                variant='outlined'
                disabled
                error={!!errors.monthAndYear}
                helperText={errors.monthAndYear}
                type='month'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Block-No"
                name="blockno"
                variant="outlined"
                value={formState.blockno}
                onChange={handleInputChange}
                error={!!errors.blockno}
                helperText={errors.blockno}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Flat-No"
                name="flatno"
                variant="outlined"
                value={formState.flatno}
                onChange={handleInputChange}
                error={!!errors.flatno}
                helperText={errors.flatno}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Paid Amount"
                variant="outlined"
                name="paidAmount"
                value={formState.paidAmount}
                onChange={handleInputChange}
                error={!!errors.paidAmount}
                helperText={errors.paidAmount}
                required
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{
            marginTop: "20px",display:"flex", 
            justifyContent: "center",
          }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                background: '#630000',
                fontFamily: 'Red Hat Display, sans-serif',
                fontSize: 15,
                fontWeight: '600',
                "&:hover": {
                  backgroundColor: '#fff',
                  border: '1px solid #630000',
                  color: '#630000'
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </form>
        {showDialog && <Dialog show={showDialog} message={successMessage || "Maintenance Updated"} />}
      </Box>
    </ThemeProvider>
  );
};
export default Edit;