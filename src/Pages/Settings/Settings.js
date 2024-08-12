import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Switch,
  Button,
  InputAdornment,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IoMdArrowBack } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { IoNotificationsSharp } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

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

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#6333BB",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#6333BB",
    border: "1px solid #6333BB",
  },
}));

function Settings() {
  const [expanded, setExpanded] = useState(0);
  const [notificationSettings, setNotificationSettings] = useState({
    rental: true,
    residential: true,
    transaction: true,
    houseHolder: true,
    announcement: true,
    visitor: true,
    amenity: true,
  });
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleNotification = (type) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };

  const handleNotificationToggle = () => {
    const newNotificationEnabled = !notificationEnabled;
    setNotificationEnabled(newNotificationEnabled);
    setNotificationSettings({
      rental: newNotificationEnabled,
      residential: newNotificationEnabled,
      transaction: newNotificationEnabled,
      houseHolder: newNotificationEnabled,
      announcement: newNotificationEnabled,
      visitor: newNotificationEnabled,
      amenity: newNotificationEnabled,
    });
  };

  const handleSaveChanges = () => {
    setExpanded(false);
  };

  const switchStyles = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#048c36",
      "&:hover": {
        backgroundColor: "rgba(0, 128, 0, 0.08)",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#048c36",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#f51505",
    },
  };

  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const errors = {
      currentPassword: formValues.currentPassword === "",
      newPassword: formValues.newPassword === "",
      confirmPassword: formValues.confirmPassword === "",
      passwordMismatch: formValues.newPassword !== formValues.confirmPassword,
    };
    setFormErrors(errors);
    const isValid = !Object.values(errors).some((error) => error);
    if (isValid) {
      setExpanded(false);
    }
  };

  const handleSubmit1 = () => {
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    setStartDate(formatDate(today));
    setExpireDate(formatDate(nextYear));
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundColor: "#F6F6F6",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Red Hat Display,sans-serif",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                fontFamily: "Red Hat Display,sans-serif",
              }}
            >
              <GradientIconButton>
                <IoMdArrowBack />
              </GradientIconButton>
            </Link>
            <Typography variant='body1' sx={{
            fontFamily: "Red Hat Display, sans-serif", 
            fontSize:"21px",
            color: '#630000'
          }}>
              Others
            </Typography>
          </Box>
          <Box>
            <GradientIconButton>
              <IoNotificationsSharp />
            </GradientIconButton>
            <GradientIconButton>
              <PiSignOutBold />
            </GradientIconButton>
          </Box>
        </Box>
      </Grid>
      <Grid container spacing={2} sx={{ p: 6 }}>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 1}
            onChange={handleChange(1)}
            sx={{ mb: 2, fontFamily: "Red Hat Display,sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Notification Settings
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ fontFamily: "Red Hat Display, sans-serif" }}>
                <ListItem onClick={handleNotificationToggle}>
                  <ListItemText primary="Enable/Disable All Notifications" />
                  <Switch checked={notificationEnabled} sx={switchStyles} />
                </ListItem>
                {Object.keys(notificationSettings).map((key, index) => (
                  <ListItem key={key} onClick={() => toggleNotification(key)}>
                    <ListItemText
                      primary={`${index + 1}) ${key} Notification`}
                    />
                    <Switch
                      checked={notificationSettings[key]}
                      sx={{
                        ...switchStyles,
                        "& .MuiSwitch-track": {
                          backgroundColor: notificationSettings[key]
                            ? "green"
                            : "red",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  fontFamily: "Red Hat Display, sans-serif",
                }}
              >
                <SubmitButton onClick={handleSaveChanges}>
                  Save Changes
                </SubmitButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 2}
            onChange={handleChange(2)}
            sx={{ mb: 2, fontFamily: "Red Hat Display, sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ fontFamily: "Red Hat Display, sans-serif" }}
            >
              Reset Password
            </AccordionSummary>
            <AccordionDetails
              sx={{ fontFamily: "Red Hat Display, sans-serif" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.currentPassword ? "text" : "password"}
                    label="Current Password"
                    name="currentPassword"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                    error={formErrors.currentPassword}
                    helperText={
                      formErrors.currentPassword
                        ? "Current password is required"
                        : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("currentPassword")
                            }
                          >
                            {showPassword.currentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.newPassword ? "text" : "password"}
                    label="New Password"
                    name="newPassword"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                    error={formErrors.newPassword}
                    helperText={
                      formErrors.newPassword ? "New password is required" : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("newPassword")
                            }
                          >
                            {showPassword.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.confirmPassword ? "text" : "password"}
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                    error={
                      formErrors.confirmPassword || formErrors.passwordMismatch
                    }
                    helperText={
                      formErrors.confirmPassword
                        ? "Confirming your new password is required"
                        : formErrors.passwordMismatch
                        ? "Passwords do not match"
                        : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          >
                            {showPassword.confirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <SubmitButton onClick={handleSubmit}>
                      Save Changes
                    </SubmitButton>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 3}
            onChange={handleChange(3)}
            sx={{ mb: 2, fontFamily: "Red Hat Display, sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Renew License
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Current License Id"
                    value="E2C6B2E19E4A777"
                    variant="outlined"
                    inputProps={{ maxLength: 15 }}
                    sx={{ fontFamily: "Red Hat Display, sans-serif" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Plan Type"
                    value="Standard"
                    variant="outlined"
                    sx={{
                      fontFamily: "Red Hat Display, sans-serif",
                      color: "black",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date"
                    value={startDate}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date"
                    value={expireDate}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} fullWidth>
                  <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit1}
                    style=
                    {{ fontFamily: "Red Hat Display,sans-serif", fontSize: 15 }}
                  >
                    RENEWAL
                  </SubmitButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Settings;