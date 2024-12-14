import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const ProtectedLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
