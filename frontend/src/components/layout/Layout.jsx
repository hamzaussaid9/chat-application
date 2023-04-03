import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';

const Layout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/')
    }
  },[])
  return (
    <React.Fragment>
        <Header />
        <Outlet />
    </React.Fragment>
  )
}

export default Layout