import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderProfileImage = (user) => {
    return (
      <img 
        src={user.profileImage || 'default-image-url.jpg'} 
        alt={user.uname}
        style={{ borderRadius: '50%', width: '50px', height: '50px' }}
      />
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {posts.length === 0 ? (
        <p>Aún no hay publicaciones</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-container">
            <div className="user-info">
              {post.postedBy && renderProfileImage(post.postedBy)}
              <span>{post.postedBy && post.postedBy.uname}</span>
            </div>
            <div className="post-content">
              {post.image && <img src={post.image} alt="Post" />}
              <p>{post.description}</p>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default PostList;
