import { Avatar, Box, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'

const ChannelList = () => {
    const { isLoading, channels } = useSelector(state=> state.channels);
  return (
    <Box>
        {
            channels && channels.length > 0 ? (
                <List>
                    {
                        channels.map(channel =>{
                            <ListItem>
                                
                            </ListItem>
                        })
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