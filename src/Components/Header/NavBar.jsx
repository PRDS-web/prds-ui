import {useState} from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography,Menu, Container,Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import SunnyIcon from '@mui/icons-material/Sunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useSelector, useDispatch } from 'react-redux';
import { enableLightMode, disableLightMode } from '../../Slice/DarkLightSlice';

const pages = ['Home', 'Service', 'About us', 'Contact us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [isLightMode, setIsLightMode] = useState(true);
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode)
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
  const ChangeMode = () =>{
    
    if(isLightMode){
      dispatch(disableLightMode());
    }else{
      dispatch(enableLightMode());
    }
   
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PRDS UI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center'}}>{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <IconButton  sx={{ fontSize: '1.0rem', display: 'flex', alignItems: 'start', justifyContent: 'center', gap: '5px'}}>
                    <AccountCircleIcon/>  Login 
                 </IconButton>
             </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PRDS UI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , justifyContent: 'end'} }}>
             <MenuItem>
              <IconButton onClick={ChangeMode} sx={{ fontSize: '0.9rem', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px'}}>
               { isLightMode ? <><ModeNightIcon/> Dark Mode</> : <><SunnyIcon/> Light Mode </>}
              </IconButton>
              </MenuItem>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,color: 'inherit', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <Tooltip title="Login">
              <IconButton href='/login' sx={{ fontSize: '0.9rem', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px'}}>
                <AccountCircleIcon/>  Login 
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button sx={{backgroundColor: 'yellow' , borderRadius: '10px', borderStyle: 'solid',borderWidth: '1px', borderColor: 'black', fontWeight: 'bold', color: 'black'}}>Get Started</Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
