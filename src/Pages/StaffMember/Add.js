import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Grid, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { HiPlus } from "react-icons/hi";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { createService } from './StaffSlice';
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const serviceTypes = [
    { label: "PestClean", value: "pestClean" },
    { label: "Appliance", value: "appliance" },
    { label: "Mechanic", value: "mechanic" },
    { label: "Moving", value: "moving" },
    { label: "Painter", value: "painter" },
    { label: "Electrician", value: "electrician" },
    { label: "Carpenter", value: "carpenter" },
    { label: "Water", value: "water" },
    { label: "Driver", value: "driver" },
    { label: "Paperboy", value: "paperBoy" },
    { label: "Cook", value: "cook" },
    { label: "Maid", value: "maid" },
    { label: "Plumber", value: "plumber" },
    { label: "Milkman", value: "milkMan" }
];

const societyId = "6683b57b073739a31e8350d0";

const timingOptions = [
    "10:00 to 11:00",
    "11:00 to 12:00",
    "12:00 to 13:00",
    "13:00 to 14:00",
    "14:00 to 15:00",
    "15:00 to 16:00",
    "16:00 to 17:00",
    "17:00 to 18:00",
    "18:00 to 19:00",
    "19:00 to 20:00"
];

function Add() {
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [serviceType, setServiceType] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [timings, setTimings] = useState([]);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const successMessage = useSelector((state) => state.staff.successMessage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageName(file.name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleServiceTypeChange = (event) => {
        setServiceType(event.target.value);
    };

    const handleTimingsChange = (index, value) => {
        const newTimings = [...timings];
        newTimings[index] = value;
        setTimings(newTimings);
    };

    const addTimingField = () => {
        setTimings([...timings, ""]);
    };

    const removeTimingField = (index) => {
        const newTimings = timings.filter((_, i) => i !== index);
        setTimings(newTimings);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('societyId', societyId);
        formData.set('serviceType', serviceType);
        formData.set('name', name);
        formData.set('phoneNumber', mobileNumber);
        formData.set('address', address);
        
        timings.forEach((timing) => {
            formData.append('timings', timing);
        });
        
        formData.set('pictures', imageFile);
        
        dispatch(createService(formData)).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                setShowDialog(true);
                setTimeout(() => {
                    setShowDialog(false);
                    navigate("/staffMember");
                }, 2000);
            }
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
                        <GradientIconButton onClick={() => navigate(-1)} >
                            <IoArrowBackSharp />
                        </GradientIconButton>
                        <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
                            Add Staff Member
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Service Type</InputLabel>
                                <Select
                                    value={serviceType}
                                    onChange={handleServiceTypeChange}
                                    label="Service Type"
                                >
                                    {serviceTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        {timings.map((timing, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControl fullWidth margin="normal" required>
                                    <InputLabel>Timings</InputLabel>
                                    <Select
                                        value={timing}
                                        onChange={(e) => handleTimingsChange(index, e.target.value)}
                                        label="Timings"
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => removeTimingField(index)}>
                                                    <AiTwotoneDelete />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    >
                                        {timingOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                        <Grid item xs={2}>
                            <Button onClick={addTimingField} variant="outlined" fullWidth sx={{ mt: 2 }} style={{ borderColor: "#630000", color: "#630000", height: 53 }}>
                                Add Timing
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ position: 'relative' }}>
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
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#630000',
                                    width: '13%',
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
                </form>
                <Dialog
                    message={successMessage}
                    showDialog={showDialog}
                    onClose={() => setShowDialog(false)}
                />
            </Box>
        </ThemeProvider>
    );
}

export default Add;

// import React, { useState } from 'react';
// import { Typography, TextField, Button, Box, Grid, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { HiPlus } from "react-icons/hi";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { useDispatch, useSelector } from 'react-redux';
// import { createService } from './StaffSlice';
// import { useNavigate } from "react-router-dom";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { styled } from "@mui/material/styles";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Dialog from '../../DialogBox/DialogBox';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#630000',
//         },
//     },
// });

// const GradientIconButton = styled(IconButton)(({ theme }) => ({
//     background: "linear-gradient(to right,#fb0707, #630000)",
//     color: "#fff",
//     border: "1px solid #fff",
//     marginLeft: "10px",
//     marginRight: "10px",
//     "&:hover": {
//         background: "#FFF",
//         border: "1px solid #630000",
//         "& svg": {
//             color: "#630000",
//         },
//     },
//     "& svg": {
//         fontSize: "20px",
//     },
// }));

// const serviceTypes = [
//     { label: "PestClean", value: "pestClean" },
//     { label: "Appliance", value: "appliance" },
//     { label: "Mechanic", value: "mechanic" },
//     { label: "Moving", value: "moving" },
//     { label: "Painter", value: "painter" },
//     { label: "Electrician", value: "electrician" },
//     { label: "Carpenter", value: "carpenter" },
//     { label: "Water", value: "water" },
//     { label: "Driver", value: "driver" },
//     { label: "Paperboy", value: "paperBoy" },
//     { label: "Cook", value: "cook" },
//     { label: "Maid", value: "maid" },
//     { label: "Plumber", value: "plumber" },
//     { label: "Milkman", value: "milkMan" }
// ];

// const societyId = "6683b57b073739a31e8350d0";

// const timingOptions = [
//     "10:00 to 11:00",
//     "11:00 to 12:00",
//     "12:00 to 13:00",
//     "13:00 to 14:00",
//     "14:00 to 15:00",
//     "15:00 to 16:00",
//     "16:00 to 17:00",
//     "17:00 to 18:00",
//     "18:00 to 19:00",
//     "19:00 to 20:00"
// ];

// function Add() {
//     const dispatch = useDispatch();
//     const [imageFile, setImageFile] = useState(null);
//     const [imageName, setImageName] = useState("");
//     const [imagePreview, setImagePreview] = useState(null);
//     const [serviceType, setServiceType] = useState("");
//     const [name, setName] = useState("");
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [address, setAddress] = useState("");
//     const [timings, setTimings] = useState([]);
//     const navigate = useNavigate();
//     const [showDialog, setShowDialog] = useState(false);
//     const successMessage = useSelector((state) => state.staff.successMessage);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file);
//             setImageName(file.name);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const handleServiceTypeChange = (event) => {
//         setServiceType(event.target.value);
//     };

//     const handleTimingsChange = (index, value) => {
//         const newTimings = [...timings];
//         newTimings[index] = value;
//         setTimings(newTimings);
//     };

//     const addTimingField = () => {
//         setTimings([...timings, ""]);
//     };

//     const removeTimingField = (index) => {
//         const newTimings = timings.filter((_, i) => i !== index);
//         setTimings(newTimings);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.set('societyId', societyId);
//         formData.set('serviceType', serviceType);
//         formData.set('name', name);
//         formData.set('phoneNumber', mobileNumber);
//         formData.set('address', address);
//         formData.set('timings', JSON.stringify(timings));
//         formData.set('pictures', imageFile);
//         dispatch(createService(formData)).then((response) => {
//             if (response.meta.requestStatus === 'fulfilled') {
//                 setShowDialog(true);
//                 setTimeout(() => {
//                     setShowDialog(false);
//                     navigate("/staffMember");
//                 }, 2000);
//             }
//         }).catch((error) => {
//             console.error("Error:", error);
//         });
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box>
//                 <Box sx={{
//                     width: "100%", padding: "10px", borderRadius: "8px", display: "flex",
//                     justifyContent: "space-between", alignItems: "center", position: 'relative'
//                 }}>
//                     <Box sx={{ display: "flex", position: 'relative', alignItems: 'center' }}>
//                         <GradientIconButton onClick={() => navigate(-1)} >
//                             <IoArrowBackSharp />
//                         </GradientIconButton>
//                         <Typography variant="body1" sx={{ fontFamily: 'Red Hat Display, sans-serif', fontSize: "23px", fontWeight: '700', color: '#630000' }}>
//                             Add Staff Member
//                         </Typography>
//                     </Box>
//                 </Box>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal" required>
//                                 <InputLabel>Service Type</InputLabel>
//                                 <Select
//                                     value={serviceType}
//                                     onChange={handleServiceTypeChange}
//                                     label="Service Type"
//                                 >
//                                     {serviceTypes.map((type) => (
//                                         <MenuItem key={type.value} value={type.value}>
//                                             {type.label}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Mobile Number"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                                 value={mobileNumber}
//                                 onChange={(e) => setMobileNumber(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Address"
//                                 variant="outlined"
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                             />
//                         </Grid>
//                         {timings.map((timing, index) => (
//                             <Grid item xs={6} key={index}>
//                                 <FormControl fullWidth margin="normal" required>
//                                     <InputLabel>Timings</InputLabel>
//                                     <Select
//                                         value={timing}
//                                         onChange={(e) => handleTimingsChange(index, e.target.value)}
//                                         label="Timings"
//                                         endAdornment={
//                                             <InputAdornment position='end'>
//                                                 <IconButton onClick={() => removeTimingField(index)}>
//                                                     <AiTwotoneDelete />
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         }
//                                     >
//                                         {timingOptions.map((option) => (
//                                             <MenuItem key={option} value={option}>
//                                                 {option}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                         ))}
//                         <Grid item xs={2}>
//                             <Button onClick={addTimingField} variant="outlined" fullWidth sx={{ mt: 2 }} style={{ borderColor: "#630000", color: "#630000", height: 53 }}>
//                                 Add Timing
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} style={{ position: 'relative' }}>
//                             <input
//                                 accept="image/*"
//                                 style={{ display: 'none' }}
//                                 id="upload-button"
//                                 type="file"
//                                 onChange={handleImageChange}
//                             />
//                             <label htmlFor="upload-button">
//                                 <GradientIconButton component="span">
//                                     <HiPlus />
//                                 </GradientIconButton>
//                             </label>
//                             {imagePreview && (
//                                 <Box mt={2}>
//                                     <img
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
//                                     />
//                                 </Box>
//                             )}
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12} sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
//                         <Button
//                             type="Add"
//                             variant="contained"
//                             sx={{
//                                 mt: 2,
//                                 backgroundColor: '#630000',
//                                 width: '13%',
//                                 height: 40,
//                                 '&:hover': {
//                                     backgroundColor: '#630000',
//                                 },
//                             }}
//                         >
//                             Add
//                         </Button>
//                     </Grid>
//                 </form>
//                 <Dialog open={showDialog} message={successMessage} />
//             </Box>
//         </ThemeProvider>
//     );
// }

// export default Add;
