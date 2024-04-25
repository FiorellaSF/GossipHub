import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch all posts
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', file);

    try {
      await axios.post('/api/posts/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Refresh posts
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      setCaption('');
      setFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/delete/${id}`);
      // Refresh posts
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caption:</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p>{post.caption}</p>
            <img src={post.image} alt={post.caption} />
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostForm;
