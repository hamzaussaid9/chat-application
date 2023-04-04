import { ChatBubble, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { Autocomplete, Avatar, Button, Checkbox, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateChannel = () => {
    const { users } = useSelector(state=> state.allUsers)
    const [title, setTitle] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])
  return (
    <form>
        <TextField label='Title' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth margin='normal'/>
        <Autocomplete
            multiple
            options={users}
            disableCloseOnSelect
            onChange={(event,values)=>setSelectedUsers(values.map(item => item.id))}
            getOptionLabel={(option)=> `${option.username} ${option.first_name} ${option.last_name}`}
            groupBy={(option)=> option.first_name[0]}
            renderOption={(props, option, {selected})=>{
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
            renderInput={(params)=>(
                <TextField {...params} margin='normal' label="Select Users" placeholder='Users' required/>
            )}
        />
        <Button disabled={selectedUsers.length < 1 || title.trim().length < 3} type='submit' startIcon={<ChatBubble />} variant='contained' >
            Create
        </Button>
    </form>
  )
}

export default CreateChannel