import { Avatar, Box, Chip, Divider, IconButton, Menu, MenuItem, Tooltip, Typography, styled } from "@mui/material";
import React, { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdMailOpen } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const GradientText = styled("span")({
    background: "linear-gradient(to right ,#ff2727,#ae0606,#630000)",
    WebkitBackgroundClip: "text",
    fontSize: "32px",
    WebkitTextFillColor: "transparent",
    fontWeight: "700",
    fontFamily: "Red Hat Display, sans-serif",

});
function getAvatarInitials(name) {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
}

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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);
    const [anchorEl1, setAnchorEl1] = useState(null);

    const navigate = useNavigate();

    const handleNotificationMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl1(null);
    }; 

    const handleClick2 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setIsVisible1(false);
    };
    const handleClose2 = () => {
        setIsVisible2(false);
    };
    const handleClose3 = () => {
        setIsVisible3(false);
    };
    const handleClose4 = () => {
        setAnchorEl1(null);
    };
    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };
    
    const handleSettings = () => {
        handleProfileMenuClose();
        navigate("/settings")
    }

    const handleProfile = () => {
        handleProfileMenuClose();
        navigate("/profile");
    };
    const greenDotCount = [isVisible1, isVisible2, isVisible3].filter(Boolean).length;

    return (
        <Box sx={{
            backgroundColor: "#fff0f0",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
        }}>
            <Box sx={{ display: "flex" }}>
                <GradientText>
                    Welcome to Our Community
                </GradientText>
            </Box>

            <Box>
                <GradientIconButton onClick={handleNotificationMenu}>
                    <IoNotificationsSharp />
                </GradientIconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            width: '400px',
                            padding: 1, borderRadius: 3, marginTop: 2
                        }
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                            <Typography variant="h6" sx={{ fontFamily: "Red Hat Display, sans-serif" }}>
                                Notifications
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {!isOpen && greenDotCount > 0 && (
                                    <Chip
                                        label={`${greenDotCount} New`}
                                        sx={{
                                            backgroundColor: '#dbeafe',
                                            color: '#3b82f6',
                                            marginRight: 2,
                                            fontWeight: "600",
                                            '& .MuiChip-label': {
                                                color: '#3b82f6',
                                            },
                                        }}
                                    />
                                )}
                                {isOpen ? (
                                    <Tooltip title="Make all as unread" arrow>
                                        <IconButton onClick={handleIconClick}>
                                            <MdMailOutline style={{ fontSize: 25, marginRight: 1 }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Make all as read" arrow>
                                        <IconButton onClick={handleIconClick}>
                                            <IoMdMailOpen style={{ fontSize: 25, marginRight: 1 }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        </Box>
                        <Divider sx={{ marginBottom: 1 }} />
                        <Box sx={{
                            maxHeight: 400, overflowY: 'auto', borderRadius: '4px',
                            '&::-webkit-scrollbar': {
                                width: '0px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                outline: 'none',
                            },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}>
                            {isVisible1 && (
                                <>
                                    <Box
                                        sx={{
                                            padding: 1.5,
                                            position: "relative",
                                            display: "flex",
                                            '&:hover': {
                                                backgroundColor: '#f6f6f6',
                                                '& .close-icon': {
                                                    display: 'block'
                                                },
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Avatar alt="Remy Sharp" src="/path/to/student.jpg" sx={{ height: 50, width: 50, margin: 0.5 }} />
                                            <Typography variant="body1">1h ago</Typography>
                                        </Box>
                                        <Box sx={{ marginLeft: 2 }}>
                                            <Typography variant="h6">Jhansi</Typography>
                                            <Typography variant="body1">Won the monthly bestseller gold badge</Typography>
                                        </Box>
                                        <IconButton
                                            className="close-icon"
                                            onClick={handleClose1}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 5,
                                                display: 'none',
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        {!isOpen && (
                                            <GoDotFill style={{
                                                color: "#16a34a",
                                                position: 'absolute',
                                                bottom: 10,
                                                right: 10,
                                            }} />
                                        )}
                                    </Box>
                                    <Divider />
                                </>
                            )}
                            {isVisible2 && (
                                <>
                                    <Box
                                        sx={{
                                            padding: 1.5,
                                            position: "relative",
                                            display: "flex",
                                            '&:hover': {
                                                backgroundColor: '#f6f6f6',
                                                '& .close-icon': {
                                                    display: 'block'
                                                },
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Avatar alt="Remy Sharp" src="/path/to/student.jpg" sx={{ height: 50, width: 50, margin: 0.5 }} />
                                            <Typography variant="body1">1h ago</Typography>
                                        </Box>
                                        <Box sx={{ marginLeft: 2 }}>
                                            <Typography variant="h6">Jhansi</Typography>
                                            <Typography variant="body1">Won the monthly bestseller gold badge</Typography>
                                        </Box>
                                        <IconButton
                                            className="close-icon"
                                            onClick={handleClose2}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 5,
                                                display: 'none',
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        {!isOpen && (
                                            <GoDotFill style={{
                                                color: "#16a34a",
                                                position: 'absolute',
                                                bottom: 10,
                                                right: 10,
                                            }} />
                                        )}
                                    </Box>
                                    <Divider />
                                </>
                            )}
                            {isVisible3 && (
                                <>
                                    <Box
                                        sx={{
                                            padding: 1.5,
                                            position: "relative",
                                            display: "flex",
                                            '&:hover': {
                                                backgroundColor: '#f6f6f6',
                                                '& .close-icon': {
                                                    display: 'block'
                                                },
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Avatar alt="Remy Sharp" src="/path/to/student.jpg" sx={{ height: 50, width: 50, margin: 0.5 }} />
                                            <Typography variant="body1">1h ago</Typography>
                                        </Box>
                                        <Box sx={{ marginLeft: 2 }}>
                                            <Typography variant="h6">Jhansi</Typography>
                                            <Typography variant="body1">Won the monthly bestseller gold badge</Typography>
                                        </Box>
                                        <IconButton
                                            className="close-icon"
                                            onClick={handleClose3}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 5,
                                                display: 'none',
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        {!isOpen && (
                                            <GoDotFill style={{
                                                color: "#16a34a",
                                                position: 'absolute',
                                                bottom: 10,
                                                right: 10,
                                            }} />
                                        )}
                                    </Box>
                                    <Divider />
                                </>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>View More</Typography>
                    </Box>
                </Menu>
                <GradientIconButton onClick={handleClick2}>
                    <FaUserCircle />
                </GradientIconButton>
                <Menu
                    anchorEl={anchorEl1}
                    open={Boolean(anchorEl1)}
                    onClose={handleProfileMenuClose}
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleSettings} sx={{ borderBottom: "1px solid #ccc" }}>Settings</MenuItem>
                    <MenuItem onClick={handleClose4} >Logout</MenuItem>
                </Menu>
            </Box>
        </Box >
    )
}
export default Header;