import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';

const Authlayout = () => {
  return (
    <React.Fragment>
        <Header />
        <Outlet />
    </React.Fragment>
  );
}

export default Authlayout