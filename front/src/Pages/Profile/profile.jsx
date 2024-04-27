import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css';
import UserInfo from '../../Components/Profile/UserInfo.jsx';
import UserPosts from '../../Components/Profile/UserPosts';

const Profile = () => {

  return (
    <main>
     <UserInfo />
      <UserPosts />
      
    </main>
  );
};

export default Profile;
