import axios from 'axios'
import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import AddPost from './AddPost';

const Posts = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = () => {
    setShowAddPost(true);
  };

  const handleCloseAddPost = () => {
    setShowAddPost(false);
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleAddPost}>+</button>
      <PostList />
      {showAddPost && <AddPost onUpdate={fetchPosts} onClose={handleCloseAddPost} />}
    </div>
  );
};

export default Posts;
