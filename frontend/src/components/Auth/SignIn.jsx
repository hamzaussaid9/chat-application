import { Button, TextField } from '@mui/material'
import {Login} from '@mui/icons-material';
import React from 'react';
import { useNavigate} from 'react-router-dom';
import auth from '../../utils/auth.utils';
import useHandleFormik from '../hooks/useHandleFormik';
import {authInstance} from '../../utils/axios';
const SignIn = () => {
    const navigate = useNavigate(); 
    const { signInInitialValue, signInSchema} = auth;
    const handleFormSubmit = async () => {
      const response = await authInstance.post('/auth/login',{...values});
      console.log(response);
      if(response.data.success){
        localStorage.setItem('token', response.data.token);
        navigate('/')
      }
    }
    const { values, getFieldProps, errors, touched, handleSubmit } = useHandleFormik(signInInitialValue,signInSchema, handleFormSubmit);
  return (
    <form onSubmit={handleSubmit} style={{
        padding: '15px'
    }}>
        <TextField {...getFieldProps('username')} error={Boolean(touched.username && errors.username)} label={`Username ${touched.username && errors.username ? `(${errors.username})` : '' }`} color='primary' placeholder='username' margin='normal' type='text' fullWidth />
        <TextField {...getFieldProps('password')} error={Boolean( touched.password && errors.password)} label={`Password ${touched.password && errors.password ? `(${errors.password})` : ''}`} color='primary' placeholder='password' margin='normal' type='password' fullWidth />
        <Button type='submit' startIcon={<Login />} variant='contained' color='primary'> Log In</Button>
    </form>
  )
}

export default SignIn