import React, { useState } from 'react'
import { Paper, Tab, Tabs } from '@mui/material';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';

const Auth = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleActiveTabChange = (event, active) => setActiveTab(active);
  return (
    <Paper sx={{maxWidth:'800px', width:'80%', margin: '15px auto'}}>
        <Tabs sx={{borderBottom: '1px solid lightgrey'}} variant='fullWidth' value={activeTab} onChange={handleActiveTabChange}  centered>
            <Tab label="Sign Up" />
            <Tab label="Sign In" />
        </Tabs>
        {activeTab ? <SignIn /> : <SignUp />}
    </Paper>
  )
}

export default Auth