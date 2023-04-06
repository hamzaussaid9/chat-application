import React, { useEffect, useState } from 'react'
import { getUsersThunk } from '../components/slices/allUsers.slice';
import { useDispatch } from 'react-redux';
import { getChannelsThunk } from '../components/slices/channels';
import { Container, Grid } from '@mui/material';
import ChannelList from '../components/channels/ChannelList';
import SelectedChannel from '../components/channels/SelectedChannel';
import { getChannelDetailsThunk, reset } from '../components/slices/channelMessages.slice';
import { actionInstance } from '../utils/axios';
const Channels = () => {
  const dispatch = useDispatch();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const handleSelection = (channelId) => {
    if (selectedChannel !== channelId)
      setSelectedChannel(channelId);
  }
  const getUsers = async () => {
    dispatch(getUsersThunk());
  }
  const getChannels = async () => {
    dispatch(getChannelsThunk());
  }
  const getChannelDetails = async () =>{
    dispatch(getChannelDetailsThunk({id: selectedChannel}));
  }
  const deleteChannel = async () =>{
    const response = await actionInstance.delete(`/channel/${selectedChannel}`)
    console.log(response);
    setSelectedChannel(null);
    getChannels();
    dispatch(reset());
}
  useEffect(() => {
    setSelectedChannel(null);
    dispatch(reset());
    getUsers();
    getChannels();
  }, [])
  useEffect(() => {
    if(selectedChannel){
      getChannelDetails(); 
    }
  }, [selectedChannel])
  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={3}>
        <Grid item xs={12} sm={5} md={4} lg={4}>
          <ChannelList selectedChannel={selectedChannel} handleSelection={handleSelection} />
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={8}>
          <SelectedChannel deleteChannel={deleteChannel} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Channels