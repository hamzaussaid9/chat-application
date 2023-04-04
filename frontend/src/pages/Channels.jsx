import React, { useEffect } from 'react'
import { getUsersThunk } from '../components/slices/allUsers.slice';
import { useDispatch } from 'react-redux';
import { getChannelsThunk } from '../components/slices/channels';
import { Container, Grid } from '@mui/material';
import ChannelList from '../components/channels/ChannelList';
import CreateChannel from '../components/channels/CreateChannel';
const Channels = () => {
  const dispatch = useDispatch();
  const getUsers = async () =>{
    dispatch(getUsersThunk());
  }
  const getChannels = async () =>{
    dispatch(getChannelsThunk());
  }
  useEffect(()=>{
    getUsers();
    getChannels();
  },[])
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ChannelList />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <CreateChannel />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Channels