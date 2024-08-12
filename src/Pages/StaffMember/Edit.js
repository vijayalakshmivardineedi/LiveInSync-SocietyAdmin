import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServicePersonById, updateServicePerson, deleteUserService } from './StaffSlice';
import { Box, Button, IconButton, TextField, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userid, serviceType } = useParams();
    const societyId = "6683b57b073739a31e8350d0";
    const [updatedData, setUpdatedData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        timings: [],
        pictures: '',
        qrImages: '',
        list: [],
    });

    const [newPicturesFile, setNewPicturesFile] = useState(null);
    const profile = useSelector((state) => state.staff.data);
    const status = useSelector((state) => state.staff.status);
    const error = useSelector((state) => state.staff.error);
    const successMessage = useSelector((state) => state.staff.successMessage);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (serviceType && userid) {
            dispatch(fetchServicePersonById({ serviceType, userid }));
        }
    }, [dispatch, serviceType, userid]);

    useEffect(() => {
        if (profile) {
            setUpdatedData({
                name: profile.name || '',
                phoneNumber: profile.phoneNumber || '',
                address: profile.address || '',
                timings: profile.timings || [],
                pictures: profile.pictures || '',
                qrImages: profile.qrImages || '',
                list: profile.list || [],
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setNewPicturesFile(e.target.files[0]);
        } else {
            setUpdatedData({
                ...updatedData,
                [name]: value,
            });
        }
    };

    const handleAddTiming = () => {
        setUpdatedData({
            ...updatedData,
            timings: [...updatedData.timings, ''],
        });
    };

    const handleRemoveTiming = (index) => {
        const updatedTimings = [...updatedData.timings];
        updatedTimings.splice(index, 1);
        setUpdatedData({
            ...updatedData,
            timings: updatedTimings,
        });
    };

    const handleUpdate = () => {
        if (serviceType && userid) {
            const { name, phoneNumber, address, timings } = updatedData;
            const formData = new FormData();
            formData.append('societyId', societyId);
            formData.append('serviceType', serviceType);
            formData.append('userid', userid);
            formData.append('name', name);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);

            timings.forEach((timing) => {
                formData.append('timings', timing);
            });

            if (newPicturesFile) {
                formData.append('pictures', newPicturesFile);
            }
            dispatch(updateServicePerson(formData)).then(() => {
                setShowDialog(true);
                setTimeout(() => {
                    setShowDialog(false);
                }, 2000);
                dispatch(fetchServicePersonById({ serviceType, userid }));
            }).catch((error) => {
                console.error("Error:", error);
            });
        }
    };

    const handleDeleteListItem = (itemIndex) => {
        if (serviceType && userid) {
            const userIdToDelete = updatedData.list[itemIndex].userId;
            dispatch(deleteUserService({ societyId, userid, userIdToDelete, serviceType }))
                .then(() => {
                    setShowDialog(true);
                    setTimeout(() => {
                        setShowDialog(false);
                    }, 2000);
                    dispatch(fetchServicePersonById({ serviceType, userid }));
                })
                .catch((error) => {
                    console.error('Deletion failed:', error);
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
                        <GradientIconButton onClick={() => navigate(-1)} >
                            <IoArrowBackSharp />
                        </GradientIconButton>
                        <Typography variant='h5' sx={{
                            fontFamily: "Red Hat Display, sans-serif",
                            color: '#630000',
                            fontWeight: 700,
                        }}>
                            Edit Staff Member
                        </Typography>
                    </Box>
                </Box>
                {profile && (
                    <Box key={profile._id} sx={{ marginBottom: '20px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                marginTop: 2,
                            }}
                        >
                            <Box
                                component="img"
                                src={newPicturesFile ? URL.createObjectURL(newPicturesFile) : `http://localhost:2000${updatedData.pictures}`}
                                alt={updatedData.name}
                                sx={{ width: '250px', height: '250px', borderRadius: '10%', marginBottom: '20px', marginLeft: '10%' }}
                            />

                            <Grid >
                                <Typography variant="h6" sx={{ fontFamily: "Red Hat Display, sans-serif", fontSize: 18, fontWeight: 700, marginLeft: 5 }}>QR scan:</Typography>

                                <Box

                                    component="img"
                                    src={`http://localhost:2000${updatedData.qrImages}`}
                                    alt="QR Code"
                                    sx={{ width: '250px', height: '250px', marginBottom: '20px', marginRight: '90px', }}

                                />
                            </Grid>
                        </Box>
                        <Box sx={{ marginBottom: '20px', marginLeft: '8%' }}>
                            <strong>
                                New Pictures:
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="pictures"
                                    onChange={handleInputChange}
                                />
                            </strong>
                        </Box>

                        <Grid container spacing={2} sx={{ marginTop: 5 }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={updatedData.name}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                name="phoneNumber"
                                value={updatedData.phoneNumber}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                name="address"
                                value={updatedData.address}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                        </Grid>

                        <Typography variant="h6" sx={{ marginTop: '18px', marginBottom: '20px', fontFamily: "Red Hat Display, sans-serif", fontSize: 23, fontWeight: 700 }}>Timings:</Typography>
                        <Box sx={{ marginBottom: '20px' }}>
                            {updatedData.timings.map((time, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <TextField
                                        variant="outlined"
                                        name={`timings-${index}`}
                                        value={time}
                                        onChange={(e) => {
                                            const updatedTimings = [...updatedData.timings];
                                            updatedTimings[index] = e.target.value;
                                            setUpdatedData({
                                                ...updatedData,
                                                timings: updatedTimings,
                                            });
                                        }}
                                        sx={{ marginRight: '10px', flex: 1 }}
                                    />
                                    <IconButton onClick={() => handleRemoveTiming(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                marginTop: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddTiming}
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

                                Add Timing
                            </Button>

                        </Box>
                        <Grid sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
                            <Button
                                variant="contained"
                                onClick={handleUpdate}
                                sx={{
                                    backgroundColor: "#630000",
                                    marginRight: 6,
                                    '&:hover': {
                                        backgroundColor: '#630000',
                                    }
                                }}
                            >
                                Update
                            </Button>
                        </Grid>
                        {updatedData.list && updatedData.list.length > 0 && (
                            <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '20px', fontFamily: "Red Hat Display, sans-serif", fontSize: 23, fontWeight: 700 }}>Additional Items:</Typography>
                                {updatedData.list.map((item, index) => (
                                    <Box key={index} sx={{ marginBottom: '20px' }}>
                                        {Object.keys(item).map((key) => (
                                            <TextField
                                                key={key}
                                                label={key}
                                                variant="outlined"
                                                name={`list-${index}-${key}`}
                                                value={item[key]}
                                                onChange={(e) => {
                                                    const updatedList = [...updatedData.list];
                                                    updatedList[index][key] = e.target.value;
                                                    setUpdatedData({
                                                        ...updatedData,
                                                        list: updatedList,
                                                    });
                                                }}
                                                fullWidth
                                                sx={{ marginBottom: '10px' }}
                                            />
                                        ))}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: "space-between",
                                                marginTop: 2,
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteListItem(index)}
                                                sx={{ marginLeft: "90%" }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>

                                ))}
                            </Box>
                        )}
                        <Dialog
                            message={successMessage}
                            showDialog={showDialog}
                            onClose={() => setShowDialog(false)}
                        />

                    </Box>
                )
                }
            </Box >
        </ThemeProvider>
    );
};

export default Edit;