import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SunnyIcon from '@mui/icons-material/Sunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useSelector, useDispatch } from 'react-redux';
import { enableLightMode, disableLightMode } from '../../Slice/DarkLightSlice';
import { userLogout } from '../../Slice/UserLoginSlice';
import Boy from '../../assets/boyWithoutBG.png';
import logo from '../../assets/logo.PNG';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from '../../assets/logo.png';
const pages = ['Home', 'Service', 'About us', 'Contact us'];
const settings = ['Profile', 'Dashboard', 'Logout'];

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isImageFailed, setIsImageFailed] = useState(false);
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode);
  const { users, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const theme = useTheme();
  const location = useLocation();

  const ChangeMode = () => {
    if (theme.palette.mode === 'light') {
      dispatch(disableLightMode());
    } else {
      dispatch(enableLightMode());
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <AppBar
      position="fixed"
      color="transparent"
      enableColorOnDark
      sx={{
        backgroundColor: isLightMode ? 'inherit' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Pradetra logo"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 40, height: 40 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pradetra
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
              {pages.map((page) => {
                const pageKey = page.split(' ')[0].toLowerCase();
                const isActive = page === 'Contact us'
                  ? false
                  : pageKey === 'home'
                    ? location.pathname === '/' || location.pathname === '/home'
                    : location.pathname === '/' + pageKey;
                return (
                  <MenuItem
                    component={Link}
                    to={page === 'Contact us' ? '/#contact' : '/' + pageKey}
                    key={page}
                    onClick={handleCloseNavMenu}
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      fontWeight: isActive ? 700 : 'inherit',
                      bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(14,91,110,0.12)') : 'transparent',
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                );
              })}
              <MenuItem>
                {!isLoggedIn ? (
                  <IconButton
                    component={Link}
                    to="/login"
                    sx={{
                      fontSize: '1.0rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      color: 'inherit',
                    }}
                  >
                    <AccountCircleIcon /> LOGIN
                  </IconButton>
                ) : (
                  <Box>
                    <Tooltip title={(users.name|| users.user.name) || 'Profile'}>
                      <IconButton onClick={handleOpenUserMenu}>
                        <Avatar
                          alt={(users.name|| users.user.name)  || 'User'}
                          src={
                            isImageFailed ||
                            users.picture == '' ||
                            users.picture == null
                              ? Boy
                              : users.picture
                          }
                          onError={() => setIsImageFailed(true)}
                        />
                      </IconButton>
                    </Tooltip>
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
                        <MenuItem
                          component="a"
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();
                            if (setting === 'Logout') {
                              dispatch(userLogout());
                            } else {
                              navigate('/' + setting.toLowerCase());
                            }
                          }}
                        >
                          <Typography>{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                )}
              </MenuItem>
            </Menu>
          </Box>
           
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Pradetra logo"
              sx={{ mr: 1, width: 32, height: 32 }}
            />
            Pradetra
          </Typography>
          <IconButton
            onClick={ChangeMode}
            sx={{
              fontSize: '0.9rem',
              color: 'inherit',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            {isLightMode ? (
              <>
                <Tooltip title="Dark Mode">
                  <ModeNightIcon />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Light Mode">
                  <SunnyIcon />
                </Tooltip>
              </>
            )}
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', justifyContent: 'end' },
            }}
          >
            <IconButton
              onClick={ChangeMode}
              sx={{
                fontSize: '0.9rem',
                color: 'inherit',
                display: { md: 'flex', xs: 'none' },
              }}
            >
              {isLightMode ? 
                  <Tooltip title="Dark Mode">
                    <ModeNightIcon />
                  </Tooltip>
                 : 
                  <Tooltip title="Light Mode">
                    <SunnyIcon />
                  </Tooltip>
               }
            </IconButton>
            {pages.map((page) => {
              const pageKey = page.split(' ')[0].toLowerCase();
              const isActive = page === 'Contact us'
                ? false
                : pageKey === 'home'
                  ? location.pathname === '/' || location.pathname === '/home'
                  : location.pathname === '/' + pageKey;
              return (
                <Button
                  key={page}
                  component={Link}
                  to={page === 'Contact us' ? '/#contact' : '/' + pageKey}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'inherit',
                    display: 'block',
                    borderRadius: 2,
                    px: 1.5,
                    position: 'relative',
                    fontWeight: isActive ? 800 : 500,
                    bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(14,91,110,0.10)') : 'transparent',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: theme.palette.mode == 'dark'? 'white': 'black',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'left',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  {page}
                </Button>
              );
            })}
            {!isLoggedIn ? (
              <IconButton
                href="/login"
                sx={{
                  fontSize: '1.0rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  color: 'inherit',
                }}
              >
                <AccountCircleIcon /> LOGIN
              </IconButton>
            ) : (
              <Box>
                <Tooltip title={(users.name|| users.user.name) || 'Profile'}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt={(users.name|| users.user.name) || 'User'}
                      src={
                        isImageFailed ||
                        users.picture == '' ||
                        users.picture == null
                          ? Boy
                          : users.picture
                      }
                      onError={() => setIsImageFailed(true)}
                      sx={{
                        border: '2px solid white',
                        backgroundColor: 'white',
                      }}
                    />
                  </IconButton>
                </Tooltip>
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
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === 'Logout') {
                          dispatch(userLogout());
                        } else {
                          navigate('/' + setting.toLowerCase());
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
