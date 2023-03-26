import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Chat, Logout } from '@mui/icons-material';

const isLoggedIn = true;

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <AppBar sx={{marginBottom: '15px'}} position='relative' elevation={6}>
        <Toolbar>
            <Box component='div' sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography onClick={()=>navigate('/')} sx={{
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
                                    <Avatar sx={{ width: 32, height: 32}}>H</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Chat fontSize="small" />
                                </ListItemIcon>
                                Channels
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Log out
                            </MenuItem>
                        </Menu>
                        <Button startIcon={<Chat />}  sx={{color: 'white'}}>
                            Channels
                        </Button>
                        </React.Fragment> : 
                        <Button onClick={()=>navigate('/auth')} sx={{color: 'white'}}>
                            LogIn / Sign Up
                        </Button>
                    }
                </Stack>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header