import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header';
import { useSelector } from 'react-redux';

const Authlayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(isLoading){
      setLoading(false);
    }
    if(isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn, isLoading])
  return (
    <React.Fragment>
        <Header />
        {
          (!isLoading && !loading) && <Outlet />
        }
    </React.Fragment>
  );
}

export default Authlayout