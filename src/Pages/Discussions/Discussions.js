import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from '@mui/icons-material/Mic';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const contacts = [
  {
    name: "Swati - THN",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/946/819/small_2x/adorable-baby-with-vibrant-clothing-in-a-playful-pose-ai-generative-photo.jpg",
    online: true,
    typing: true,
    lastSeen: "Last seen at 12:45",
    messages: [
      {
        text: "Hey! Have you seen WhatsApp Web feature?",
        timestamp: "02:00",
        align: "left",
      },
      {
        text: "Yeah...Awsummmmmmm 😁😁😁😁",
        timestamp: "02:01",
        align: "right",
      },
    ],
  },
  {
    name: "Chintu Voda",
    image: "https://ashisheditz.com/wp-content/uploads/2024/02/nice-attractive-whatsapp-dp-hd.jpg",
    typing: false,
    lastSeen: "Last seen at 11:30",
    messages: [],
  },
  {
    name: "Pinder whatzap",
    image:
      "https://cdn4.sharechat.com/compressed_gm_40_img_47114_a0a7ce5_1694520044647_sc.jpg?tenant=sc&referrer=pwa-sharechat-service&f=647_sc.jpg",
    online: true,
    typing: false,
    lastSeen: "Last seen at 10:00",
    messages: [],
  },
  {
    name: "Priyanshu pune",
    image:
      "https://getimagehub.com/wp-content/uploads/2023/12/Girls-Whatsapp-Dp-with-Phone.webp",
    online: true,
    typing: false,
    lastSeen: "Last seen at 09:00",
    messages: [],
  },
  {
    name: "Harash-mumbai",
    image:
      "https://www.parents.com/thmb/GExGCp2zHxDIKxnCtx4QykPFqAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1407570793-5f7481ec66794bdb8f67f27f1a9cf6d2.jpg",
    online: true,
    typing: false,
    lastSeen: "Last seen at 08:00",
    messages: [],
  },
  {
    name: "Jiten",
    image:
      "https://oshiprint.in/image/cache/catalog/poster/new/mqp588-320x320h.jpeg.webp",
    online: true,
    typing: false,
    lastSeen: "Last seen at 07:00",
    messages: [],
  },
  {
    name: "Akki",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20230611/pngtree-two-cute-egg-cupids-sitting-in-sunlight-next-to-each-other-image_2914931.jpg",
    online: true,
    typing: false,
    lastSeen: "Last seen at 06:00",
    messages: [],
  },
];

const Discussions = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [inputValue, setInputValue] = useState("");
  const [messageState, setMessageState] = useState({});

  useState(() => {
    const initialMessageState = {};
    contacts.forEach(contact => {
      initialMessageState[contact.name] = contact.messages || [];
    });
    setMessageState(initialMessageState);
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [emojiMenuAnchorEl, setEmojiMenuAnchorEl] = useState(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        align: "right",
      };

      const updatedMessages = [...messageState[activeContact.name], newMessage];
      const updatedMessageState = {
        ...messageState,
        [activeContact.name]: updatedMessages,
      };
      setMessageState(updatedMessageState);

      setInputValue("");

      setTimeout(() => {
        const autoReply = {
          text: "Hii lucky",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          align: "left",
        };

        const updatedAutoReplyMessages = [...updatedMessages, autoReply];
        const updatedAutoReplyState = {
          ...updatedMessageState,
          [activeContact.name]: updatedAutoReplyMessages,
        };
        setMessageState(updatedAutoReplyState);
      }, 1000);
    }
  };

  const handleActionClick = (event) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  const handleCallClick = () => {
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <CssBaseline />
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={3} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
            <Paper sx={{ height: "100%", overflow: "auto", padding: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search or start new chat"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{ fontFamily: "Red Hat Display, sans-sarif", fontWeight: 600, fontSize: 10 }}
                />
              </Box>
              <Divider />
              <List sx={{ fontFamily: 'Red Hat Display, sans-serif', fontWeight: 700, fontSize: 20 }}>
                {filteredContacts.map((contact, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleContactClick(contact)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Avatar src={contact.image} sx={{ marginRight: 2 }} />
                    <ListItemText
                      primary={contact.name}
                      secondary="Last message preview"
                    />
                  </ListItem> 
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#EFEAE2",
            }}>
              <Box sx={{
                padding: 2,
                borderBottom: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                backgroundColor: "#FFFFFF",
                zIndex: 1,
              }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={activeContact.image} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{activeContact.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {activeContact.typing
                        ? "Typing..."
                        : activeContact.online
                          ? "Online"
                          : activeContact.lastSeen}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handleCallClick} color="primary">
                    <CallIcon />
                  </IconButton>
                  <IconButton id="more-vert-icon" onClick={handleActionClick} color="primary">
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={actionMenuAnchorEl}
                    open={Boolean(actionMenuAnchorEl)}
                    onClose={handleCloseActionMenu}
                  >
                    <MenuItem onClick={handleCloseActionMenu}>Group info</MenuItem>
                    <MenuItem onClick={handleCloseActionMenu}>Group Media</MenuItem>
                    <MenuItem onClick={handleCloseActionMenu}>Wallpaper</MenuItem>
                    <MenuItem onClick={handleCloseActionMenu}>Settings</MenuItem>
                    <MenuItem onClick={handleCloseActionMenu}>More</MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>
                <Typography align="center" color="textSecondary" variant="body2" sx={{ marginTop: "auto", marginBottom: "auto" }}>
                  {new Date().toLocaleDateString()}
                </Typography>
                <List>
                  {messageState[activeContact.name]?.map((msg, index) => (
                    <ListItem key={index} sx={{ justifyContent: msg.align === 'right' ? 'flex-end' : 'flex-start', display: 'flex' }}>
                      <Box sx={{
                        backgroundColor: msg.align === 'right' ? '#dcf8c6' : '#ffffff',
                        borderRadius: 2,
                        padding: 1,
                        maxWidth: '60%',
                        wordWrap: 'break-word',
                      }}>
                        <Typography variant="body1">{msg.text}</Typography>
                        <Typography variant="body2" align="right" color="textSecondary">
                          {msg.timestamp}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider />
              <Box sx={{
                display: "flex",
                padding: 1,
                position: "sticky",
                bottom: 0,
                backgroundColor: "#FFFFFF",
                zIndex: 1,
              }}>
                <TextField
                  fullWidth
                  placeholder="Type a message"
                  variant="outlined"
                  size="small"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  sx={{ marginRight: 1 }}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        <IconButton onClick={handleOpenEmojiMenu}>
                          <InsertEmoticonIcon />
                        </IconButton>
                        <Menu
                          anchorEl={emojiMenuAnchorEl}
                          open={Boolean(emojiMenuAnchorEl)}
                          onClose={handleCloseEmojiMenu}
                        >
                          {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <MenuItem key={`row-${rowIndex}`} >
                              {[
                                '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
                                '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
                                '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓',
                                '😎', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️',
                                '😣', '😖', '😫', '😩', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳'
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
                <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Discussions;