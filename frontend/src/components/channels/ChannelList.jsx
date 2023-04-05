import { CancelOutlined, MoreVert, Search } from '@mui/icons-material';
import { Avatar, Box, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, MenuList, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGetDimensions from '../hooks/useGetDimensions';

const ChannelList = ({selectedChannel,handleSelection}) => {
    const { height } = useGetDimensions();
    const { isLoading, channels } = useSelector(state => state.channels);
    const { user } = useSelector(state => state.auth);
    const [searchString, setSearchString] = useState('');
    const createdBY = (channel) => {
        if (channel.created_by.id === user?.id)
            return "created by: You";
        return `created by: ${channel.created_by.first_name}`;
    }
    return (
        <Box height={height - 100} border="1px solid lightgrey">
            <Typography paddingTop={'4px'} variant='h6' component={'h6'} color={'#006699'} textAlign={'center'}>
                Channels
            </Typography>
            <TextField
                type="text"
                variant='standard'
                placeholder='Search Channel'
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                size='small'
                margin='dense'
                fullWidth
                InputProps={{
                    startAdornment: <InputAdornment position='start'><Search sx={{ paddingLeft: '10px' }} /></InputAdornment>,
                    endAdornment: searchString && <InputAdornment position='end'><IconButton onClick={() => setSearchString("")} size='small'><CancelOutlined /></IconButton></InputAdornment>
                }}
            />
            {
                channels && channels.length > 0 ? (
                    <List sx={{ overflowY: 'scroll', height:height - 250}}>
                        {
                            channels.map(channel => (
                                <ListItem key={channel.id}>
                                    <ListItemButton selected={selectedChannel === channel.id} onClick={()=>handleSelection(channel.id)}>
                                        <ListItemAvatar>
                                            <Avatar>{channel.title[0].toUpperCase()}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={channel.title} secondary={createdBY(channel)} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                ) : (
                    <Typography>
                        No Channels found
                    </Typography>
                )
            }
        </Box>
    )
}

export default ChannelList