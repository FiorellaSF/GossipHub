import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './profile.css';
import UserInfo from '../../Components/Profile/UserInfo.jsx';
import UserPosts from '../../Components/Profile/UserPosts';
import Navbar from '../../Components/NavBar/NavBar.jsx';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.role !== 'user') {
        navigate('/AccessDenied');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <main>
      <Navbar/>
      <UserInfo />
      <UserPosts />
    </main>
  );
};

export default Profile;
