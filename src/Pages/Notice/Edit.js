import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editNotice, getNoticeById } from "./NoticeSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
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

const Edit = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const notice = useSelector((state) => state.notice.notice);
  const successMessage = useSelector((state) => state.notice.successMessage);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const [formState, setFormState] = useState({
    sender: '',
    subject: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (_id) {
      dispatch(getNoticeById(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (notice) {
      setFormState({
        sender: notice.sender || '',
        subject: notice.subject || '',
        description: notice.description || '',
        date: notice.date || '',
      });
    }
  }, [notice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.sender = formState.sender ? "" : "Sender is required.";
    tempErrors.subject = formState.subject ? "" : "Subject is required.";
    tempErrors.description = formState.description ? "" : "Description is required.";
    tempErrors.date = formState.date ? "" : "Date is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { ...formData } = formState;
      dispatch(editNotice({ _id, formData })).then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/notice");
        }, 2000);
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
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
              Edit Notice
            </Typography>
          </Box>
        </Box>
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sender*"
                name="sender"
                variant="outlined"
                value={formState.sender}
                onChange={handleInputChange}
                error={!!errors.sender}
                helperText={errors.sender}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Subject*"
                variant="outlined"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                error={!!errors.subject}
                helperText={errors.subject}
              />
            </Grid>
            <Grid item xs={6}>
              {editDate ? (
                <TextField
                  fullWidth
                  label="Date and Time*"
                  variant="outlined"
                  name="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                />
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Date and Time*"
                    variant="outlined"
                    name="date"
                    value={new Date(formState.date).toLocaleString()}
                    onChange={handleInputChange}
                    error={!!errors.date}
                    helperText={errors.date}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Button sx={{
                    border: '1px solid #630000',
                    marginTop: "10px",
                    backgroundColor: "#ffff",
                    color: "#630000",
                    '&:hover': {
                      backgroundColor: "#630000",
                      color: "#fff",
                    },
                  }} onClick={() => setEditDate(true)}>Change Time</Button>
                </>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Description*"
                variant="outlined"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: 'Red Hat Display, sans-serif',
                  backgroundColor: "#630000",
                  width: "11%",
                  '&:hover': {
                    backgroundColor: "#630000",
                  },
                }}
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
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

export default Edit;
