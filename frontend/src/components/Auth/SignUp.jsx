import { HowToReg } from '@mui/icons-material'
import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import authUtils from '../../utils/auth.utils'
import useHandleFormik from '../hooks/useHandleFormik'

const SignUp = () => {
    const {signUpInitialValue, signUpSchema} = authUtils;
    const handleFormSubmit = async () => {

    }
    const {getFieldProps, touched, errors, handleSubmit} = useHandleFormik(signUpInitialValue,signUpSchema, handleFormSubmit);
  return (
    <form onSubmit={handleSubmit} style={{
        padding: '15px'
    }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField {...getFieldProps('firstname')} error={Boolean(touched.firstname && errors.firstname)} size='small' label={`First Name ${touched.firstname && errors.firstname ? `(${errors.firstname})` : '' }`} color='primary' placeholder='First Name' margin='normal' type='text' fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField {...getFieldProps('lastname')} error={Boolean(touched.lastname && errors.lastname)} size='small' label={`Last Name ${touched.lastname && errors.lastname ? `(${errors.lastname})` : '' }`} color='primary' placeholder='Last Name' margin='normal' type='text' fullWidth />
            </Grid>
        </Grid>
        <TextField {...getFieldProps('username')} error={Boolean(touched.username && errors.username)} size='small' label={`Username ${touched.username && errors.username ? `(${errors.username})` : '' }`} color='primary' placeholder='username' margin='normal' type='text' fullWidth />
        <TextField {...getFieldProps('password')} error={Boolean(touched.password && errors.password)} size='small' label={`password ${touched.password && errors.password ? `(${errors.password})` : '' }`} color='primary' placeholder='password' margin='normal' type='password' fullWidth />
        <TextField {...getFieldProps('confirmpassword')} error={Boolean(touched.confirmpassword && errors.confirmpassword)} size='small' label={`confirm password ${touched.confirmpassword && errors.confirmpassword ? `(${errors.confirmpassword})` : '' }`} color='primary' placeholder='confirm password' margin='normal' type='password' fullWidth />
        <Button type='submit' startIcon={<HowToReg />} variant='contained' color='primary'> Sign Up</Button>
    </form>
  )
}

export default SignUp