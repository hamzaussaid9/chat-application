import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, TextField } from '@mui/material'
import React, { memo, useRef, useState } from 'react'
import useGetDimensions from '../hooks/useGetDimensions'
import { useDispatch, useSelector } from 'react-redux';
import { Cancel, Delete, MoreVert, Notes, Send } from '@mui/icons-material';
import { actionInstance } from '../../utils/axios';
import { getChannelDetailsThunk } from '../slices/channelMessages.slice';
import Message from '../message/Message';

const SelectedChannel = memo(({deleteChannel}) => {
    const channelRef = useRef(null);
    const { height } = useGetDimensions();
    const dispatch = useDispatch();
    const { channel, isLoading } = useSelector(state => state.channel);
    const [open, setOepn] = useState(false);
    const { user } = useSelector(state => state.auth);
    const [message, setMessage] = useState('');
    const scrollToButtom = () => {
        channelRef.current.scrollTop = channelRef.current.scrollHeight;
    }
    const sendMessage = async (e) => {
        e.preventDefault();
        const response = await actionInstance.post(`/channel/${channel.id}`, {
            message,
            parentId: null
        })
        if (response.data.success) {
            setMessage('');
        }
        dispatch(getChannelDetailsThunk({ id: channel.id }));
        setTimeout(() => {
            scrollToButtom();
        }, 500)
    }
    const handleDelete = async () =>{
        await deleteChannel();
        setOepn(false);
    }
    const getMembers = () => {
        if (!channel)
            return "";
        return `${channel.users.filter(member => member.id !== user.id).map(member => member.first_name).join(', ')} and You`;
    }
    return (
        <Box height={height - 100} borderRight={'1px solid lightgrey'} borderBottom={'1px solid lightgrey'} borderTop={'1px solid lightgrey'}>
            {
                channel && (
                    <List sx={{ paddingTop: '0px' }}>
                        <ListItem selected sx={{ borderBottom: '1px solid lightgrey' }}>
                            <ListItemAvatar>
                                <Avatar>
                                    {channel && channel.title[0].toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={channel && channel.title} secondary={`members: ${getMembers()}`} />
                            <ListItemSecondaryAction>
                                {
                                    user.role === "ADMIN" && <Button color="error" startIcon={<Delete />} onClick={() => setOepn(true)}>Delete</Button>
                                }
                                <Dialog fullWidth open={open} onClose={() => setOepn(false)}>
                                    <DialogTitle>
                                        Confirmation
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Are you sure you want to delete ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="primary" variant='outlined' startIcon={<Cancel />} onClick={() => setOepn(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleDelete} color="error" variant='outlined' startIcon={<Delete />}>
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Stack ref={channelRef} sx={{ height: height - 250, overflowY: 'scroll' }}>
                            {
                                channel.messages.filter(message => message.parentId === null).map(message => <Message message={message} key={message.id} />)
                            }
                        </Stack>
                        <ListItem>
                            <form style={{ width: '100%' }} onSubmit={sendMessage}>
                                <TextField
                                    placeholder='Write here'
                                    fullWidth
                                    maxRows={1}
                                    color='primary'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'><Notes sx={{ paddingRight: '5px' }} /></InputAdornment>,
                                        endAdornment: <InputAdornment position='end'><IconButton type='submit' disabled={message.trim().length === 0} color='primary'><Send /></IconButton></InputAdornment>
                                    }}
                                />
                            </form>
                        </ListItem>
                    </List>
                )
            }
        </Box>
    )
})

export default SelectedChannel