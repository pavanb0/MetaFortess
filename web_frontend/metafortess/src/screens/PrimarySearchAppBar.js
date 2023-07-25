import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import axios from 'axios';
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FolderIcon from '@mui/icons-material/Folder';
import CollectionsIcon from '@mui/icons-material/Collections';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Typography } from '@mui/material';





// import CircularProgress from '@mui/material/CircularProgress';
const sessions = require('./sessions');
const localip = require('../localip');

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(
  {
    setImage,setVideo,setFile
  }
) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [uploadmodal, setuploadmodal] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [upload, setpload] = React.useState(false);
  const [uploadprogress, setuploadprogress] = React.useState(0);
  const [loadingdata,setloadingdata] = React.useState('');
  const [drawer, setDrawer] = React.useState(false);
  

  
  
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setModal(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  const handleToggleDrawer = () => {
    setDrawer(!drawer);

  
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Images', 'Videos', 'Files'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
            onClick={
              () => {
                if (index === 0) {
                  setImage(true);
                  setVideo(false);
                  setFile(false);
                }
                if (index === 1) {
                  setImage(false);
                  setVideo(true);
                  setFile(false);
                }
                if (index === 2) {
                  setImage(false);
                  setVideo(false);
                  setFile(true);
                }
              }
            }
            >
              <ListItemIcon>
                {index === 0 ? <CollectionsIcon /> : index === 1 ? <OndemandVideoIcon /> : <FolderIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h8" component="div" sx={{ p: 2 }}>
        Pepole's
      </Typography>
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
 
  };
  const styl = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const menuId = 'primary-search-account-menu';


  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const uploadmodal = (

  // )

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton
          size="large"
          onClick={() => {
            setuploadmodal(true);
          }}

          color="inherit"
        >
          <Badge >
            <BackupIcon />
          </Badge>
        </IconButton>


        <p>Upload</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [selectedFile, setSelectedFile] = React.useState([]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedFilesArray = Array.from(files);
      setSelectedFile(selectedFilesArray);
      // You can now perform any further actions with the selected files, such as uploading them to the backend.
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();

  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const selectedFilesArray = Array.from(files);
      setSelectedFile(selectedFilesArray);
      // You can now perform any further actions with the dropped files, such as uploading them to the backend.
    }
  };

  const handleupload = () => {
    const ip = localip.sysip;
    const formData = new FormData();
    selectedFile.forEach((file) => {
      formData.append('file', file);
    });
    const headers = {
      'email': sessions.email,
      'password': sessions.password,
    }
    setpload(true);
    axios.post(`http://${ip}:3030/upload`, formData, { headers: headers 
      , 
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total)
          const loadedmb = Math.floor(loaded/2048);
          const totalmb = Math.floor(total/2048);
          setloadingdata(`${loadedmb}mb of ${totalmb}mb | ${percent}%`);
          setuploadprogress(percent);
         
        }
      }


    )
      .then((response) => {
        console.log(response);
        setuploadmodal(false);
        setpload(false);
      }).catch((error) => {
        // console.log(error);
      });

    // fetch(`http://${ip}:3030/upload`, {
    //   method: 'POST',
    //   headers: headers,
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log('Success:', result);
    //     setuploadmodal(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };




  return (
    <Box sx={{ flexGrow: 1,position:'sticky',top:0,zIndex:1000,height:'50px' }}
    
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Metafortess
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              onClick={() => {
                setuploadmodal(true);

              }}
              color="inherit"
            >
              <Badge >
                <BackupIcon />
              </Badge>
            </IconButton>


            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      {modal && ( // Conditionally render the modal
        <Modal open={modal} onClose={() => setModal(false)}>
          <Box sx={styl}>
            <Typography variant="h6" component="h2">
              Hello {sessions.user} ! 👋
            </Typography>
            <Typography sx={{ mt: 2 }}>

              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ ml: 2 }}
                style={{ alignItems: 'center' }}

                onClick={() => {
                  sessions.email = '';
                  sessions.password = '';
                  window.location.href = '/login';
                }}>logout</Button>

            </Typography>
          </Box>
        </Modal>
      )}
      {uploadmodal && ( // Conditionally render the modal
        <Modal open={uploadmodal} onClose={() => setuploadmodal(false)}>
          <Box sx={styl}>
            <Typography variant="h6" component="h2"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Button
                variant='outlined'
                color='inherit'
                size='medium'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',

                }}
                onClick={handleupload}
              >

                Upload your files to Metafortess
              </Button>

            </Typography>
            <label htmlFor='fileInput' >
              <Button
                style={
                  {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    width: '100%',
                    height: '100px',
                  }
                }
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                variant='outlined' color='inherit' size='medium' component="label">
                Choose your files
                <input
                  type="file"
                  name="files"
                  id="file"
                  onChange={handleFileInputChange}
                  className="inputfile"
                  multiple
                  style={{
                    display: 'none',
                  }}
                />
              </Button>
              {
                upload && (
                  <div >
                    <LinearProgressWithLabel value={uploadprogress} />
                      <Typography variant="h6" component="h2">
                     uploading {loadingdata} 
                      </Typography>
                    </div>
               

                )
              }
            </label>
            {
              <div
                style={
                  {
                    overflow: 'scroll',
                    height: '200px',
                    overflowX: 'hidden',
                  }
                }
              >
                {
                  selectedFile.map((file) => (
                    <div key={file.name}>
                      <p>{file.name}</p>
                    </div>

                  ))
                }
              </div>

            }
          </Box>
        </Modal>
      )}
     
     <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
      {list('left')}
    </Drawer>
    </Box>
    

  );
}
