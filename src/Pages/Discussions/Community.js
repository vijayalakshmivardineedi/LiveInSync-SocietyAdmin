import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Toolbar,
  Avatar,
  TextField,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Menu,
  Checkbox,
  FormControlLabel,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

function Community() {
  const [selectedGroup, setSelectedGroup] = useState("general");
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [emojiMenuAnchorEl, setEmojiMenuAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [messages, setMessages] = useState({
    general: [],
    jacksonHeights: [],
    elite99: [],
  });
  const [jacksonHeightsMembers, setJacksonHeightsMembers] = useState([
    {
      name: "Preeti",
      image:
        "https://www.imagella.com/cdn/shop/products/3f65e111ddb5f7771c328423cd160b83.jpg?v=1707664853&width=300",
      typing: false,
      lastSeen: "Last seen at 11:30",
    },
    {
      name: "Pinder whatzap",
      image:
        "https://photosly.net/wp-content/uploads/2023/12/sad-girl-dp49.jpg",
      typing: false,
      lastSeen: "Last seen at 10:00",
    },
    {
      name: "Priyanshu pune",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMA4hF-5eDpdU6i4AF15xzA9cRZi7zal34bA&s",
      typing: false,
      lastSeen: "Last seen at 09:00",
    },
    {
      name: "Harash-mumbai",
      image:
        "https://www.imagella.com/cdn/shop/products/d88c9f2ecee2a248b8f8c06502cd7246.jpg?v=1707663984&width=300",
      typing: false,
      lastSeen: "Last seen at 08:00",
    },
  ]);

  const handleOpenEmojiMenu = (event) => {
    setEmojiMenuAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiMenu = () => {
    setEmojiMenuAnchorEl(null);
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji);
    setEmojiMenuAnchorEl(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleActionClick = (event) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogOpen1 = () => {
    setDialogOpen1(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogClose1 = () => {
    setDialogOpen1(false);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && selectedGroup) {
      const newMessage = {
        text: inputValue,
        sender: "self",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedGroup]: [...prevMessages[selectedGroup], newMessage],
      }));
      setInputValue("");
      setTimeout(() => {
        const replyMessage = {
          text: "SMA gives a reply.",
          sender: "other",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedGroup]: [...prevMessages[selectedGroup], replyMessage],
        }));
      }, 1000);
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...jacksonHeightsMembers];
    updatedMembers.splice(index, 1);
    setJacksonHeightsMembers(updatedMembers);
  };

  const handleHeaderClick = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleSave = () => {

    handleDialogClose1();
  };
 
  
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={3} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
          <Paper elevation={0} sx={{ bgcolor: "#F5F5F5", p: 2 }}>
            <List>
              <ListItem>
                <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 17 }}>Groups</Typography>
              </ListItem>
              {["general", "jacksonHeights", "elite99"].map((group) => (
                <React.Fragment key={group}>
                  <ListItem
                    button
                    selected={selectedGroup === group}
                    onClick={() => handleGroupSelect(group)}
                    sx={{
                      fontFamily: "Red Hat Display, sans-serif",
                      fontWeight: 600,
                      fontSize: 17,
                    }}
                  >
                    <ListItemText
                      primary={group === "jacksonHeights" ? "Jackson Heights" : (group === "elite99" ? "Elite 99" : "General")}
                      secondary={group === "jacksonHeights" ? "22+ Members" : (group === "elite99" ? "36+ Members" : "")}
                      sx={{
                        fontFamily: "Red Hat Display, sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#EFEAE2",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                bgcolor: "#FFFFFF",
                zIndex: 1,
              }}
              onClick={handleHeaderClick}
              style={{ cursor: "pointer" }}
            >
              <Toolbar>
                <Avatar onClick={handleHeaderClick}>
                  {selectedGroup ? selectedGroup[0].toUpperCase() : "G"}
                </Avatar>
                <Box ml={2} flexGrow={1}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Red Hat Display, sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    {selectedGroup === "general" ? "General" : (selectedGroup === "jacksonHeights" ? "Jackson Heights" : "Elite 99")}
                  </Typography>
                  {selectedGroup !== "general" && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontFamily: "Red Hat Display, sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      {selectedGroup === "jacksonHeights" ? "22+ Members" : "36+ Members"}
                    </Typography>
                  )}
                </Box>
              </Toolbar>
            </Box>

            {dialogOpen ? (
              <Box p={2}>
                <Grid
                  item
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Red Hat display, sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Group Info
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleDialogOpen1}
                    sx={{
                      fontFamily: "Red Hat Display, sans-serif",
                      fontWeight: 600,
                      color: "#192c4c",
                      border: "1px solid #192c4c",
                      fontSize: 15,
                      marginRight: 2,
                      "&:hover": { border: "1px solid #192c4c" },
                    }}
                  >
                    Add
                  </Button>
                </Grid>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <List
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                  >
                    {jacksonHeightsMembers.map((member, index) => (
                      <ListItem key={index} sx={{ width: "100%" }}>
                        <Avatar src={member.image} />
                        <ListItemText
                          sx={{ marginLeft: 2, fontFamily: "Red Hat display, sans-serif", fontWeight: 300, fontSize: 16 }}
                          primary={member.name}
                          secondary={member.typing ? "Typing..." : member.lastSeen}
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleRemoveMember(index)}
                          sx={{
                            ml: 2,
                          }}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Box>
            ) : (
              <>
                <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body2"
                    sx={{ my: "auto" }}
                  >
                    {new Date().toLocaleDateString()}
                  </Typography>

                  <List>
                    {messages[selectedGroup].map((msg, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          justifyContent: msg.sender === 'self' ? 'flex-end' : 'flex-start',
                          display: 'flex',
                        }}
                      >
                        <Paper
                          sx={{
                            backgroundColor: msg.sender === 'self' ? '#dcf8c6' : '#ffffff',
                            borderRadius: 2,
                            p: 1,
                            maxWidth: '60%',
                            wordWrap: 'break-word',
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                          <Typography variant="body2" align="right" color="textSecondary">
                            {msg.timestamp}
                          </Typography>
                        </Paper>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    position: "sticky",
                    bottom: 0,
                    bgcolor: "#FFFFFF",
                    zIndex: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Type a message"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    sx={{ mr: 1 }}
                    InputProps={{
                      endAdornment: (
                        <React.Fragment>
                          <IconButton onClick={handleOpenEmojiMenu}>
                            <InsertEmoticonIcon />
                          </IconButton>
                          <IconButton>
                            <MicIcon />
                          </IconButton>
                          <IconButton>
                            <InsertDriveFileIcon />
                          </IconButton>
                        </React.Fragment>
                      ),
                    }}
                  />


                  <Menu
                    anchorEl={emojiMenuAnchorEl}
                    open={Boolean(emojiMenuAnchorEl)}
                    onClose={handleCloseEmojiMenu}
                  >
                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                      <MenuItem key={`row-${rowIndex}`}>
                        {[
                          "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
                          "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
                          "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓",
                          "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️",
                          "😣", "😖", "😫", "😩", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳",
                        ].slice(rowIndex * 10, (rowIndex + 1) * 10).map((emoji, index) => (
                          <IconButton
                            key={`emoji-${rowIndex}-${index}`}
                            onClick={() => handleEmojiSelect(emoji)}
                          >
                            {emoji}
                          </IconButton>
                        ))}
                      </MenuItem>
                    ))}
                  </Menu>

                  <IconButton
                    color="primary"
                    aria-label="send"
                    onClick={handleSendMessage}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Paper>


          <Dialog open={dialogOpen1} onClose={handleDialogClose1}>
            <DialogTitle
              sx={{
                fontFamily: "Red Hat Display, sans-serif",
                fontWeight: 600,
                fontSize: 19,
              }}
            >
              Number
            </DialogTitle>
            <DialogContent>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                  marginBottom: "10px",
                  fontFamily: "Red Hat Display, sans-serif",
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <div>
                        <span
                          style={{
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          Alice
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          91+ 9823634054
                        </span>
                      </div>
                    }
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          Bob
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          91+ 8886665560
                        </span>
                      </div>
                    }
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          Charlie
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "Red Hat Display, sans-serif",
                            fontWeight: 400,
                            fontSize: 17,
                          }}
                        >
                          91+ 6300458821
                        </span>
                      </div>
                    }
                    sx={{ mb: 1 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  fontFamily: "Red Hat Display, sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: "#800336",
                  "&:hover": { backgroundColor: "#800336" },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Community;