import { ChatBubble, CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionInstance } from '../../utils/axios'
import { getChannelsThunk } from '../slices/channels'

const CreateChannel = ({open, handleCLose}) => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.allUsers);
    const { user } = useSelector(state=> state.auth);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([])
    useEffect(()=>{
        setTitle('');
        setSelectedUsers([]);
    },[open])

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    const handleSubmit = async () => {
        startLoading();
        const channelUsers = selectedUsers.map(item => item.id);
        channelUsers.push(user.id)
        const response = await actionInstance.post('/channel', {
            title,
            users: channelUsers
        })
        console.log(response);
        handleCLose();
        stopLoading();
        dispatch(getChannelsThunk());
    }
    return (
        <Dialog fullWidth open={open}>
            <DialogTitle>
                Create new Channel
            </DialogTitle>
            <DialogContent>
                    <TextField disabled={loading} label='Title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin='normal' />
                    <Autocomplete
                        disabled={loading}
                        multiple
                        options={users}
                        disableCloseOnSelect
                        onChange={(event, values) => setSelectedUsers(values)}
                        value={selectedUsers}
                        getOptionLabel={(option) => `${option.username} ${option.first_name} ${option.last_name}`}
                        groupBy={(option) => option.first_name[0]}
                        renderOption={(props, option, { selected }) => {
                            return (
                                <ListItem {...props}>
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlank fontSize='small' />}
                                        checkedIcon={<CheckBox fontSize='small' />}
                                        checked={selected}
                                    />
                                    <ListItemText primary={`${option.first_name} ${option.last_name}`} secondary={option.username} />
                                    <ListItemAvatar>
                                        <Avatar>{option.first_name[0].toUpperCase()}</Avatar>
                                    </ListItemAvatar>
                                </ListItem>
                            );
                        }}
                        fullWidth
                        renderInput={(params) => (
                            <TextField {...params} margin='normal' label="Select Users" placeholder='Users' required />
                        )}
                    />
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={handleCLose} color="error" startIcon={<Close />} variant='contained'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={selectedUsers.length < 1 || title.trim().length < 3 || loading} type='submit' startIcon={<ChatBubble />} variant='contained' >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateChannel;

