import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createEvent } from './EventSlice';
import AddIcon from '@mui/icons-material/Add';
import { AiTwotoneDelete } from 'react-icons/ai';
import { IoArrowBackSharp } from 'react-icons/io5';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      main: '#630000',
    },
  },
});

const AddEvent = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [activities, setActivities] = useState([
    { type: '', startDate: '', endDate: '' }
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.events.successMessage);
console.log(successMessage)

  const handleSubmit = e => {
    e.preventDefault();
    const newEvent = new FormData();
    newEvent.append('societyId', '6683b57b073739a31e8350d0');
    newEvent.append('name', name);
    newEvent.append('startDate', startDateTime);
    newEvent.append('endDate', endDateTime);

    pictures.forEach(picture => {
      newEvent.append('pictures', picture);
    });

    newEvent.append('activities', JSON.stringify(activities));
    dispatch(createEvent(newEvent)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/event");
        }, 2000);
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleActivityChange = (index, field, value) => {
    const newActivities = [...activities];
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    if (activities.some(activity => !activity.type || !activity.startDate || !activity.endDate)) {
      alert('Please fill in all fields before adding a new activity.');
      return;
    }
    setActivities([
      ...activities,
      { type: '', startDate: '', endDate: '' }
    ]);
  };

  const removeActivity = index => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setPictures(files);
    setImageName(files[0]?.name || '');
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
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
              Add Event
            </Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Title'
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Start Date and Time'
            type='datetime-local'
            value={startDateTime}
            onChange={e => setStartDateTime(e.target.value)}
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='End Date and Time'
            type='datetime-local'
            value={endDateTime}
            onChange={e => setEndDateTime(e.target.value)}
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
          /> 
          <Grid item xs={6} style={{ position: 'relative' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
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
                  marginBottom:1,
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
          {imagePreviews.length > 0 && (
            <Box mt={2} display='flex' flexWrap='wrap'>
              {imagePreviews.map((preview, index) => (
                <Box
                  key={index}
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                >
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
          
          {activities.map((activity, index) => (
            <Box
              key={index}
              display='flex'
              flexDirection='row'
              alignItems='center'
              mt={2}
              sx={{ position: 'relative' }}
            >
              <Box flex={1}>
                <TextField
                  label='Activity Type'
                  value={activity.type}
                  onChange={e =>
                    handleActivityChange(index, 'type', e.target.value)
                  }
                  fullWidth
                  margin='normal'
                />
                <TextField
                  label='Activity Start Date and Time'
                  type='datetime-local'
                  value={activity.startDate}
                  onChange={e =>
                    handleActivityChange(index, 'startDate', e.target.value)
                  }
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label='Activity End Date and Time'
                  type='datetime-local'
                  value={activity.endDate}
                  onChange={e =>
                    handleActivityChange(index, 'endDate', e.target.value)
                  }
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <IconButton
                onClick={() => removeActivity(index)}
                sx={{
                  marginLeft: 1
                }}
              >
                <AiTwotoneDelete />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={addActivity}
            variant='outlined'
            startIcon={<AddIcon />}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              '&:hover': {
                backgroundColor: '#630000',
                color: '#fff',
              },
            }}
          >
            Add Activity
          </Button>
          <Box>
            <Button
            type='submit'
            variant='contained'
            sx={{
              backgroundColor: '#630000',
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#630000',
                color: '#fff',
              }
            }}
          >
            Add Event
          </Button>
          </Box>
        </form>
        <Dialog
        message={successMessage}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
      </Box>
    </ThemeProvider>
  );
};

export default AddEvent;