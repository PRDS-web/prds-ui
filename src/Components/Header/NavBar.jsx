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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import SunnyIcon from '@mui/icons-material/Sunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useSelector, useDispatch } from 'react-redux';
import { enableLightMode, disableLightMode } from '../../Slice/DarkLightSlice';
import {logout} from '../../Slice/UserLoginSlice';
import Boy from '../../assets/boyWithoutBG.png';
const pages = ['Home', 'Service', 'About us', 'Contact us'];
const settings = ['Profile', 'Dashboard', 'Logout'];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isImageFailed, setIsImageFailed] = useState(false);
  const isLightMode = useSelector((state) => state.DarkLightMode.isLightMode);
  const { users, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const ChangeMode = () => {
    if (isLightMode) {
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
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
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
                <MenuItem
                  href={'/' + page}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
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
                    <Tooltip title={users.name || 'Profile'}>
                      <IconButton onClick={handleOpenUserMenu}>
                        <Avatar
                          alt={users.name || 'User'}
                          src={(isImageFailed || users.picture=='' || users.picture ==null) ? Boy : users.picture}
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
                          href={'/' + setting.toLowerCase()}
                          component="a"
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();
                            if (setting === 'Logout') {
                              dispatch(logout());
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            PRDS UI
          </Typography>
          <IconButton
            onClick={ChangeMode}
            sx={{
              fontSize: '0.9rem',
              color: 'inherit',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            {localStorage.getItem('themeMode') === 'light' ? (
              <>
                <Tooltip title="Dark Mode">
                  <ModeNightIcon />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Light Mode">
                  <SunnyIcon />{' '}
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
              {localStorage.getItem('themeMode') === 'light' ? (
                <>
                  <Tooltip title="Dark Mode">
                    <ModeNightIcon />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Light Mode">
                    <SunnyIcon />{' '}
                  </Tooltip>
                </>
              )}
            </IconButton>
            {pages.map((page) => (
              <Button
                key={page}
                href={'/' + page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {page}
              </Button>
            ))}
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
                <Tooltip title={users.name || 'Profile'}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt={users.name || 'User'}
                     src={(isImageFailed || users.picture=='' || users.picture ==null) ? Boy : users.picture}
                      onError={() => setIsImageFailed(true)}
                      sx={{border: '2px solid white', backgroundColor: 'white'}}
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
                    <MenuItem key={setting} onClick={() => {
                            handleCloseUserMenu();
                            if (setting === 'Logout') {
                              const persistedState = JSON.parse(
                                localStorage.getItem('persist:root')
                              );
                              delete persistedState.user;
                              localStorage.setItem(
                                'persist:root',
                                JSON.stringify(persistedState)
                              );
                              dispatch(logout());
                            }}}>
                      <Typography
                        href={'/' + setting.toLowerCase()}
                        sx={{ textAlign: 'center' }}
                      >
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
