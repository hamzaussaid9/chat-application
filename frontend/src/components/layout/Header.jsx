import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
  return (
    <AppBar sx={{marginBottom: '15px'}} position='relative' elevation={6}>
        <Toolbar>
            <Box component='div' sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <Typography onClick={()=>navigate('/')} sx={{
                    cursor: 'pointer',
                    textShadow: ''
                }} component='h3' variant='h4' color='white'>
                    Chat Application
                </Typography>
                <Stack direction='row-reverse' alignItems={'center'}>
                    <Button onClick={()=>navigate('/auth')} sx={{color: 'white'}}>
                        LogIn / Sign Up
                    </Button>
                </Stack>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header