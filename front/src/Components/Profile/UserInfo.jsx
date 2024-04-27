import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Ajusta la ruta según tu backend
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const { profileImage, uname } = userData;

  return (
    <div className="user-profile-navbar">
      <div className="profile-image-container">
        <img
          src={profileImage || process.env.PUBLIC_URL + '/userDefault.jpg'}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="username">
        <h2>{uname}</h2>
      </div>
    </div>
  );
};

export default UserInfo;
