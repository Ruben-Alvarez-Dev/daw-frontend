import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './Main.css';

// Features - Users
import UserProfile from '../../features/users/profile/UserProfile';
import UserList from '../../features/users/list/UserList';
import UserForm from '../../features/users/form/UserForm';

// Features - Tables
import TableList from '../../features/tables/list/TableList';
import TableForm from '../../features/tables/form/TableForm';

// Features - Reservations
import ReservationList from '../../features/reservations/list/ReservationList';
import ReservationForm from '../../features/reservations/form/ReservationForm';

// Features - Restaurants
import RestaurantList from '../../features/restaurants/list/RestaurantList';
import RestaurantForm from '../../features/restaurants/form/RestaurantForm';

// Dashboard
import Dashboard from '../../dashboard/Dashboard/Dashboard';

// Auth
import Login from '../../auth/Login/Login';

// Home
import Home from '../../Home/Home';

const Main = () => {
  return (
    <main className="main-content">
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Users */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/users/:id/edit" element={<UserForm />} />
        
        {/* Tables */}
        <Route path="/tables" element={<TableList />} />
        <Route path="/tables/new" element={<TableForm />} />
        <Route path="/tables/:id/edit" element={<TableForm />} />
        
        {/* Reservations */}
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/reservations/:id/edit" element={<ReservationForm />} />
        
        {/* Restaurants */}
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/new" element={<RestaurantForm />} />
        <Route path="/restaurants/:id/edit" element={<RestaurantForm />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default Main;
