import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Dialog from "../../DialogBox/DialogBox";
import { fetchEventById, updateEvent } from "./EventSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
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

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 150,
  height: 150,
  overflow: "hidden",
  marginBottom: "20px",
  marginRight: "10px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 5,
  right: 5,
}));

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
  const successMessage = useSelector((state) => state.events.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const registrations = event && event.registrations ? event.registrations : [];
  console.log(registrations)
  const [formState, setFormState] = useState({
    name: "",
    startDate: "",
    endDate: "",
    activities: [],
  });

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setFormState({
        name: event.name || "",
        startDate: event.startDate || "",
        endDate: event.endDate || "",
        activities: event.activities || [],
      });
      setPictures(event.pictures || []);
      const imagePreviews =
        event.pictures?.map((pic) => `http://localhost:2000${pic.img}`) || [];
      setPreviewImages(imagePreviews);
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleActivityChange = (index, field, value) => {
    setFormState((prevFormState) => {
      const updatedActivities = [...prevFormState.activities];
      updatedActivities[index] = { ...updatedActivities[index], [field]: value };
      return { ...prevFormState, activities: updatedActivities };
    });
  };


  const handleAddActivity = () => {
    setFormState({
      ...formState,
      activities: [
        ...formState.activities,
        { type: "", startDate: "", endDate: "" },
      ],
    });
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = formState.activities.filter(
      (activity, i) => i !== index
    );
    setFormState({ ...formState, activities: updatedActivities });
  };

  const handlePictureChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if selected files exceed the limit when combined with already uploaded files
    if (files.length + uploadedImages.length > 5) {
      alert("You can only upload up to 5 images.");
      e.target.value = ""; // Clear the input
      return;
    }

    // Create new picture objects
    const newPictures = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Update state with new images
    const updatedUploadedImages = [...uploadedImages, ...newPictures];
    setUploadedImages(updatedUploadedImages);
    setPreviewImages(updatedUploadedImages.map((picture) => picture.preview));

    // Clear the input value to allow re-selection of the same file
    e.target.value = "";
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    setPreviewImages(updatedImages.map((picture) => picture.preview));
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formState.name ? "" : "Name is required.";
    tempErrors.startDate = formState.startDate ? "" : "Start date is required.";
    tempErrors.endDate = formState.endDate ? "" : "End date is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("startDate", formState.startDate);
      formData.append("endDate", formState.endDate);
      formData.append("activities", JSON.stringify(formState.activities));

      uploadedImages.forEach((picture) => {
        formData.append("pictures", picture.file);
      });

      dispatch(updateEvent({ id, formData }))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 2000);
            dispatch(fetchEventById(id));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ padding: "20px" }}>
        <Box sx={{
          width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
          justifyContent: "space-between", alignItems: "center", position: 'relative'
        }}>
          <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
            <GradientIconButton onClick={() => navigate(-1)}>
              <IoArrowBackSharp />
            </GradientIconButton>
            <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
              Edit Event
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, overflowX: 'auto', padding: '10px 0' }}>
            {previewImages.map((image, index) => (
              <ImageContainer key={index}>
                <img src={image} alt={`Event ${index}`} />
                <DeleteButton onClick={() => handleDeleteImage(index)}>
                  <Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>x</Typography>
                </DeleteButton>
              </ImageContainer>
            ))}
          </Box>
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
              Upload Image
            </Button>
            <Input
              accept="image/*"
              id="upload-pictures"
              type="file"
              multiple
              onChange={handlePictureChange}
              sx={{ display: 'none' }}
            />
          </label>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Event Name*"
                name="name"
                variant="outlined"
                value={formState.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date & Time*"
                name="startDate"
                type="datetime-local"
                value={formState.startDate.substring(0, 16)}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date & Time*"
                name="endDate"
                type="datetime-local"
                value={formState.endDate.substring(0, 16)}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Red Hat Display, sans-serif",
                    fontWeight: "700",
                    fontSize: 25,
                    color: "#630000"
                  }}
                >
                  Activities
                </Typography>
              </Box>
              {formState.activities.map((activity, index) => (
                <Box key={index} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                  <Typography variant="subtitle1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: 18, fontWeight: 600, }}>Activity {index + 1}</Typography>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Type"
                        value={activity.type}
                        onChange={(e) => handleActivityChange(index, 'type', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Start Date & Time"
                        type="datetime-local"
                        value={activity.startDate ? activity.startDate.substring(0, 16) : ''}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleActivityChange(index, 'startDate', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="End Date & Time"
                        type="datetime-local"
                        value={activity.endDate ? activity.endDate.substring(0, 16) : ''}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleActivityChange(index, 'endDate', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveActivity(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                </Box>
              ))}
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
                onClick={handleAddActivity}
              >
                Add Activity
              </Button>
            </Grid>

          </Grid>
          <Box sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
        {registrations.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{
              fontFamily: "Red Hat Display, sans-serif",
              fontWeight: "700",
              fontSize: 25,
              color: "#630000"
            }}>
              Registrations
            </Typography>
            {registrations.map((registration) => (
              <Box
                key={registration._id}
                sx={{
                  marginBottom: 2,
                  border: "1px solid lightgrey",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="body1"><strong>Registration ID:</strong> </Typography>
                    <Typography variant="body1"><strong>Participant Name:</strong></Typography>
                    <Typography variant="body1"><strong>Activities:</strong> </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1"> {registration._id}</Typography>
                    <Typography variant="body1"> {registration.participantName}</Typography>
                    <Typography variant="body1"> {registration.activity.join(', ')}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
        )}
        <Dialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default EditEvent;