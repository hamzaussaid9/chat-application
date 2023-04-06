import { CancelOutlined, Delete, Favorite, FavoriteBorder, KeyboardArrowDown, KeyboardArrowRight, Reply, Send } from '@mui/icons-material';
import { Avatar, Button, Collapse, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { memo, useState } from 'react'
import { actionInstance } from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetailsThunk } from '../slices/channelMessages.slice';

const Message = memo(({ message }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);
    const [reply, setReply] = useState('');
    const [replying, setReplying] = useState(false);

    const handleCollapse = () => setOpen(open => !open);
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const response = await actionInstance.post(`/channel/${message.channelId}`, {
            message: reply,
            parentId: message.id
        });
        console.log(response);
        setReply('');
        setReplying(false);
        dispatch(getChannelDetailsThunk({ id: message.channelId }));
    }
    const handleLikeUnlike = async () =>{
        const response = await actionInstance.post('/message/like-unlike', {
            messageId: message.id
        })
        console.log(response);
        dispatch(getChannelDetailsThunk({ id: message.channelId }));
    }
    const handleDelete = async () =>{
        const response = await actionInstance.post(`/message/${message.id}`);
        console.log(response);
        dispatch(getChannelDetailsThunk({ id: message.channelId }));
    }
    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Tooltip placement='top-start' title={`username: ${message.user.username}`}>
                        <Avatar>{message.user.first_name[0].toUpperCase()}</Avatar>
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={`${message.user.first_name} ${message.user.last_name}`}
                    secondary={message.message}
                />
                <ListItemSecondaryAction>
                    {
                        message.children && <IconButton onClick={() => setReplying(replying => !replying)} size="small" color='primary'>
                            {
                                replying ? <CancelOutlined color='error' fontSize='8px' /> : <Reply fontSize='8px' />
                            }
                        </IconButton>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            {
                replying &&
                (
                    <form onSubmit={handleReplySubmit}>
                        <TextField
                            sx={{ paddingLeft: '15px' }}
                            size='small'
                            placeholder='reply'
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton type="submit" disabled={reply.trim().length === 0} size='small' color="primary">
                                        <Send />
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                    </form>
                )
            }
            <Stack paddingLeft="15px" direction='row'>
                {
                    message.children && <Button onClick={handleCollapse} endIcon={open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}>
                        {message.children.length}
                    </Button>
                }
                <Button onClick={handleLikeUnlike} color='error' endIcon={ message.likes.some(msg => msg.userId === user.id) ? <Favorite />: <FavoriteBorder />}>
                    {message.likes.length}
                </Button>
                {
                    (message.userId === user.id || user.role === 'ADMIN') && 
                    (
                        <IconButton size="small" onClick={handleDelete} color='error'>
                            <Delete />
                        </IconButton>
                    )
                }
            </Stack>
            <Collapse in={open}>
                {
                    message.children && message.children.length > 0 ?
                        (
                            <Grid container>
                                <Grid item sx={1} sm={1} md={1}>
                                    <Divider orientation='vertical' margin="5px" />
                                </Grid>
                                <Grid item sx={11} sm={11} md={11}>
                                    {
                                        message.children.filter(reply => reply.ParentId !== message.id).map(reply => <Message message={reply} />)
                                    }
                                </Grid>
                            </Grid>
                        ) : <Typography component="p" variant='caption' paddingLeft="15px">
                            No Replies
                        </Typography>
                }
            </Collapse>
        </List>
    )
})

export default Message