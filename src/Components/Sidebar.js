import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { Collapse, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MdBookmarkAdd, MdExpandLess, MdExpandMore, MdNotificationAdd, MdOutlineNotificationAdd, MdPersonPin, MdPersonPinCircle, MdPool, MdSupervisorAccount } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { IoDocumentsSharp, IoLayers } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BiSolidCalendarEvent, BiSolidMessageAltError } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { FaPersonCircleCheck, FaUserClock, FaUsersGear } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdEventAvailable } from "react-icons/md";
import { GiOpenGate } from "react-icons/gi";
import { IoNotificationsSharp } from "react-icons/io5";
import { GiAutoRepair } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import { GiToolbox } from "react-icons/gi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Header from './Header';
import { IoMdBookmarks } from 'react-icons/io';
import { RiAdvertisementFill } from "react-icons/ri";
import { RiDiscussFill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { SiSmartthings } from "react-icons/si";
import { SiCashapp } from "react-icons/si";

const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    borderColor: "#ede7f6",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#630000',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 0px)`,
    borderColor: "#ede7f6",
    backgroundColor: "#630000",
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 0px)`,
    },
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'none',
    boxShadow: 'none',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        borderColor: '#fff',
        boxShadow: 'none',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar({ children }) {
    const [open, setOpen] = React.useState(false);
    const [subMenuOpen, setSubMenuOpen] = React.useState({});
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleSubMenuToggle = (menu) => {
        setSubMenuOpen((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const SidebarTab = ({ icon, primary, route, subMenuItems }) => {
        const isActive = window.location.pathname === route;
        const isSubMenuOpen = subMenuOpen[primary] && open;
        return (
            <div>
                <ListItem
                    disablePadding
                    sx={{
                        display: "block",
                        backgroundColor: isActive ? "#fff" : "inherit",
                        marginLeft: isActive ? "0px" : "0px",
                        borderRadius: '0',
                    }}
                    onClick={() => {
                        if (subMenuItems) {
                            handleSubMenuToggle(primary);
                            if (!open) {
                                handleDrawerToggle();
                            }
                        } else {
                            navigate(route);
                        }
                    }}
                >
                    <ListItem
                        sx={{
                            minHeight: 50,
                            justifyContent: open ? "initial" : "center",
                            cursor: "pointer",
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                                fontSize: isActive ? "1.5rem" : "1.2rem",
                                color: isActive ? "#630000" : "#fff",
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={primary}
                            sx={{
                                opacity: open ? 1 : 0,
                                fontSize: isActive ? "1.5rem" : "1.2rem",
                                color: isActive ? "#630000" : "#fff",
                                fontWeight: isActive ? "bold" : "none",
                            }}
                        />
                        {subMenuItems && (isSubMenuOpen ? <MdExpandLess color='#fff' /> : <MdExpandMore color='#fff' />)}
                    </ListItem>
                </ListItem>
                {subMenuItems && (
                    <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit style={{ marginLeft: "20px" }}>
                        <List component="div" disablePadding>
                            {subMenuItems.map((item, index) => {
                                const isSubMenuItemActive = window.location.pathname === item.route;
                                return (
                                    <ListItem
                                        button
                                        key={index}
                                        sx={{
                                            paddingLeft: 0,
                                            paddingBottom: "3px",
                                            backgroundColor: isSubMenuItemActive ? "#fff" : "inherit",
                                            '&:hover': {
                                                backgroundColor: isSubMenuItemActive ? "#fff" : "rgba(255, 255, 255, 0.1)",
                                            },
                                            fontSize: isSubMenuItemActive ? '1.2rem' : "1.0rem",
                                        }}
                                        onClick={() => navigate(item.route)}
                                    >
                                        <ListItemIcon style={{ marginLeft: "10px", marginRight: "-30px", color: isSubMenuItemActive ? "#630000" : "#fff", }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.primary}
                                            sx={{
                                                color: isSubMenuItemActive ? "#630000" : "#fff",
                                                fontSize: "0.8rem",
                                                fontWeight: isSubMenuItemActive ? "bold" : "normal",
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box>
            </Box>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <Typography variant='body1' sx={{
                            fontFamily: "Red Hat Display, sans-serif",
                            fontStyle: "italic",
                            fontSize: "27px",
                            fontWeight: "700",
                            color: '#fff'
                        }}>
                            LivInSync
                        </Typography>
                    )}
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={handleDrawerToggle}
                    >
                        {open ? <RiArrowLeftSLine style={{ color: "#fff" }} /> : <RiArrowRightSLine style={{ color: "#fff" }} />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <SidebarTab
                        icon={<RiDashboardFill />}
                        primary="Dashboard"
                        route="/"
                    />
                    <SidebarTab
                        icon={<RiAdvertisementFill />}
                        primary="Advertisements"
                        route="/addsList"
                    />
                    <SidebarTab
                        icon={<IoLayers />}
                        primary="Residential Unit"
                        route="/residents"
                    />
                    <SidebarTab
                        icon={<FaUsers />}
                        primary="User Management"
                        subMenuItems={[
                            { icon: <MdSupervisorAccount />, primary: "Members", route: "/userManagement" },
                            { icon: <HiMiniUserGroup />, primary: "Staff Members", route: "/staffMember" },
                            { icon: <GiOpenGate />, primary: "Security", route: "/gatekeeper/list" },
                            { icon: <FaUsersGear />, primary: "Committee Members", route: "/userManagement/committee" },
                        ]}
                    />
                    <SidebarTab
                        icon={<HiClipboardDocumentList />}
                        primary="Documents"
                        route="/documents"
                    />
                    <SidebarTab
                        icon={<RiDiscussFill />}
                        primary="Discussions"
                        route="/discussions"
                    />
                    <SidebarTab
                        icon={<BiSolidMessageAltError />}
                        primary="Complaints"
                        route="/complaints"
                    />
                    <SidebarTab
                        icon={<FaPersonCircleCheck />}
                        primary="PassageWay Record"
                        subMenuItems={[
                            { icon: <MdPersonPin />, primary: "Visitor Record", route: "/visitorRecord" },
                            { icon: <MdPersonPinCircle />, primary: "Staff Record", route: "/staffRecord" },
                        ]}
                    />
                    <SidebarTab
                        icon={<IoNotificationsSharp />}
                        primary="Notices"
                        subMenuItems={[
                            { icon: <MdNotificationAdd />, primary: "Notice Board", route: "/notice" },
                            { icon: <BiSolidCalendarEvent />, primary: "Events", route: "/event" },
                            // { icon: <FaUserClock />, primary: "Staff Check In", route: "/staffCheckIn" },
                        ]}
                    />
                    <SidebarTab
                        icon={<MdBookmarkAdd />}
                        primary="Amenities & Booking"
                        subMenuItems={[
                            { icon: <MdPool />, primary: "Amenities", route: "/amenities" },
                            { icon: <IoMdBookmarks />, primary: "Booking Hall", route: "/bookings" },
                        ]}
                    />
                    <SidebarTab
                        icon={<GiToolbox />}
                        primary="Assets & Inventory"
                        subMenuItems={[
                            { icon: <SiSmartthings />, primary: "Assets", route: "/assets" },
                            { icon: <MdInventory />, primary: "Inventory", route: "/inventory" },
                        ]}
                    />
                    <SidebarTab
                        icon={<MdPayments />}
                        primary="Accounts"
                        subMenuItems={[
                            { icon: <IoDocumentsSharp />, primary: "Society Bills", route: "/societyBills" },
                            { icon: <SiCashapp />, primary: "Maintenance", route: "/maintainance" },
                        ]}
                    />
                    
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    borderRadius: '3px 0 0 0 ',
                    filter: 'brightness(1.0)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Header />
                {children}
            </Box>
        </Box>
    );
}