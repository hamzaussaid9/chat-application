import { AppBar, Avatar, Box, Button, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Add, Chat, Logout } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, logout } from '../slices/auth.slice';
import CreateChannel from '../channels/CreateChannel';

const Header = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [creatingChannel, setCreatingChannel] = React.useState(false);
    const closeCreatingChannel = () => setCreatingChannel(false);
    const checkAuth = async () => {
        console.log('header called');
        dispatch(loginAsync());
    }
    useEffect(() => {
        checkAuth();
    }, [])
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        handleClose();
    }
    return (
        <AppBar sx={{ marginBottom: '15px' }} position='relative' elevation={6}>
            <Toolbar>
                <Box component='div' sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography onClick={() => navigate('/')} sx={{
                        cursor: 'pointer',
                        textShadow: ''
                    }} component='h3' variant='h4' color='white'>
                        Chat Application
                    </Typography>
                    <Stack direction='row-reverse' alignItems={'center'}>
                        {
                            isLoggedIn ? <React.Fragment>
                                <Tooltip title="Action Options">
                                    <IconButton onClick={handleClick}>
                                        <Avatar sx={{ width: 32, height: 32 }}>{user && user.first_name[0].toUpperCase()}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <ListItem>
                                        <ListItemText primary={`Hi! ${user.first_name} ${user.last_name}`} secondary={user.username} />
                                    </ListItem>
                                    <Divider />
                                    {/* <MenuItem onClick={()=>{
                                    navigate('/channels');
                                    handleClose();
                                }}>
                                <ListItemIcon>
                                    <Chat fontSize="small" />
                                </ListItemIcon>
                                Channels
                            </MenuItem> */}
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Log out
                                    </MenuItem>
                                </Menu>
                                {
                                    location.pathname === '/channels' ? (
                                        <Button onClick={()=> setCreatingChannel(true)} startIcon={<Add />} sx={{ color: 'white' }}>
                                            Create new Channel
                                        </Button>
                                    ) : (
                                        <Button onClick={() => navigate('/channels')} startIcon={<Chat />} sx={{ color: 'white' }}>
                                            Channels
                                        </Button>
                                    )
                                }
                            </React.Fragment> :
                                <Button onClick={() => navigate('/auth')} sx={{ color: 'white' }}>
                                    LogIn / Sign Up
                                </Button>
                        }
                    </Stack>
                    <CreateChannel open={creatingChannel} handleCLose={closeCreatingChannel} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header