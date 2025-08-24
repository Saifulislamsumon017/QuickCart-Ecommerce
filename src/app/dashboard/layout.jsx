'use client';
import Footer from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import SideBar from '@/components/dashboard/SideBar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <SideBar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
