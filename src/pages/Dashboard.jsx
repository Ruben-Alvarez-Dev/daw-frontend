import React from 'react';
import { useAuth } from '../context/AuthContext';

// Datos de ejemplo - En un caso real vendrían de una API
const mockStats = {
  admin: {
    users: 125,
    restaurants: 48,
    tables: 384,
    reservations: 1250,
    activeReservations: 89
  },
  supervisor: {
    users: 15,
    tables: 32,
    reservations: 150,
    activeReservations: 12
  },
  user: {
    totalReservations: 8,
    activeReservations: 1,
    upcomingReservations: 2,
    pastReservations: 5
  }
};

const StatCard = ({ title, value, color = 'blue' }) => (
  <div className={`stat-card stat-card-${color}`}>
    <h3>{title}</h3>
    <div className="stat-value">{value}</div>
  </div>
);

const Dashboard = () => {
  const { auth } = useAuth();
  const stats = mockStats[auth.role];

  const renderAdminStats = () => (
    <div className="stats-grid">
      <StatCard title="Total Users" value={stats.users} color="blue" />
      <StatCard title="Restaurants" value={stats.restaurants} color="green" />
      <StatCard title="Total Tables" value={stats.tables} color="purple" />
      <StatCard title="Total Reservations" value={stats.reservations} color="orange" />
      <StatCard title="Active Reservations" value={stats.activeReservations} color="red" />
    </div>
  );

  const renderSupervisorStats = () => (
    <div className="stats-grid">
      <StatCard title="Restaurant Staff" value={stats.users} color="blue" />
      <StatCard title="Restaurant Tables" value={stats.tables} color="purple" />
      <StatCard title="Total Reservations" value={stats.reservations} color="orange" />
      <StatCard title="Active Reservations" value={stats.activeReservations} color="red" />
    </div>
  );

  const renderUserStats = () => (
    <div className="stats-grid">
      <StatCard title="Total Reservations" value={stats.totalReservations} color="blue" />
      <StatCard title="Active Reservations" value={stats.activeReservations} color="green" />
      <StatCard title="Upcoming Reservations" value={stats.upcomingReservations} color="purple" />
      <StatCard title="Past Reservations" value={stats.pastReservations} color="gray" />
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {auth.user?.name}!</p>
      </div>

      {auth.role === 'admin' && renderAdminStats()}
      {auth.role === 'supervisor' && renderSupervisorStats()}
      {auth.role === 'user' && renderUserStats()}
    </div>
  );
};

export default Dashboard;
