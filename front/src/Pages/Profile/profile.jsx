import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css';
import AddPost from '../../Components/Posts/AddPost';
import UserProfile from '../../Components/Profile/UserProfile';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/posts/user', {
        headers: {
          'auth-token': token,
        },
      });
      setPosts(response.data.Posts);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error de conexión');
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/userinfo', {
        headers: {
          'auth-token': token,
        },
      });
      setUsername(response.data.username);
      setProfileImage(response.data.profileImage);
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserInfo();
  }, []);

  const handlePostCreation = () => {
    fetchUserPosts();
  };

  return (
    <main>
      <UserProfile profileImage={profileImage} username={username} />
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {posts.length === 0 ? (
            <div>
              <p>No has creado ningún post aún.</p>
              <Link to="/create-post" className="btn-create-post">+</Link>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post._id} className="post-item">
                  <p>{post.description}</p>
                  <img src={post.image} alt="Post" />
                </div>
              ))}
              <AddPost onSuccess={handlePostCreation} />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Profile;
