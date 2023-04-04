import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';

const Layout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  console.log('layout');
  useEffect(()=>{
    if(isLoading){
      setLoading(false);
    }
    if(!isLoggedIn && !loading){
      navigate('/')
    }
  },[isLoading])
  return (
    <React.Fragment>
        <Header />
        <Outlet />
    </React.Fragment>
  )
}

export default Layout