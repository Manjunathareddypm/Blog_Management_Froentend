import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import '../Drawer/drawer.css'
import { ListItemIcon } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useNavigate } from 'react-router-dom';
import likeImage from '../assest/heart.png'
import dashboardImage from '../assest/dashboard.png'
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/Slice/Authentications';
import { addTokenToSystem } from '../redux/Slice/Authentications';
const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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

function MiniDrawer(props) {
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { open } = props
 
  const clickedOnMyPost = () => {
    navigate('/myPosts')
  }

  const clickedOnMyLikedPost = () => {
    navigate("/likedPost")
  }

  const clickedOnLogout = () => {
    //localStorage.removeItem('token')
    localStorage.clear()
    dispatch(setAuthenticated(false))
    dispatch(addTokenToSystem(null))
  }

  const clickOnDashBoard = () => {
    navigate("/dashboard")
  }



  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start', // add this line to align items to the top
    }}>
      <Drawer variant="permanent" open={open}>
        <List>
          <ListItem onClick={clickedOnMyPost} style={{ cursor: 'pointer' }} >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                alignItems:'center',
                marginTop: 3,
                color: 'black'
              }}

            >
              <PersonPinIcon sx={{ marginRight: '10px', color: 'blue', fontSize: '35px' }} />My Posts
            </ListItemIcon>
          </ListItem>

          <ListItem onClick={clickedOnMyLikedPost} style={{ marginLeft: 0, cursor: 'pointer' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                alignItems:'center',
                marginTop: 3,
                color: 'black'
              }}
            >
              <img src={likeImage} height={'36px'} width={'35px'} style={{ marginRight: '10px' }} />

              Liked Posts

            </ListItemIcon>
          </ListItem>

          <ListItem onClick={clickOnDashBoard} style={{ cursor: 'pointer' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                marginTop: 3,
                color: 'black'
              }}
            >
              <img src={dashboardImage} height={'25px'} width={'30px'} style={{ marginRight: '13px', marginBottom: '0px' }} />Dashboard
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default MiniDrawer;