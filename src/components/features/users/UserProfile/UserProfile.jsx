import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    role: '',
    preferences: {}
  });

  useEffect(() => {
    // TODO: Cargar datos del perfil
    const fetchProfile = async () => {
      try {
        // const response = await fetch(`/api/users/${userId}`);
        // const data = await response.json();
        // setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Perfil de Usuario</h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>Información Personal</h3>
          <div className="profile-info">
            <p><strong>Usuario:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Rol:</strong> {profile.role}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Preferencias</h3>
          <div className="profile-preferences">
            {/* TODO: Implementar preferencias del usuario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
