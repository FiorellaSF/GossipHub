import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostPanel.css';
import EditPostModal from './EditPostModal';

const PostPanel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('text');
  const [optionsVisible, setOptionsVisible] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  const textPosts = posts.filter(post => !post.image);
  const picPosts = posts.filter(post => post.image);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleOptions = (postId) => {
    setOptionsVisible(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/post/delete/${postId}`);
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = (post) => {
    setEditedPost(post);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveChanges = async (postId, newDescription, newImage) => {
    try {
      if (newImage) {
        // Update both image and description
        await axios.put(`http://localhost:5000/post/image/update/${postId}`, { description: newDescription, image: newImage });
      } else {
        // Update only description
        await axios.put(`http://localhost:5000/post/update/${postId}`, { description: newDescription });
      }
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return { ...post, description: newDescription, image: newImage };
        }
        return post;
      });
      setPosts(updatedPosts);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <section>
         <h1>Post Panel</h1>
      <nav>
        <button
          onClick={() => handleTabChange('text')}
          className={selectedTab === 'text' ? 'active' : ''}
        >
          Text
        </button>
        <button
          onClick={() => handleTabChange('pics')}
          className={selectedTab === 'pics' ? 'active' : ''}
        >
          Pics
        </button>
      </nav>
      <div className="posts-container">
        {selectedTab === 'text' ? (
          <div className="text-posts">
            {textPosts.length === 0 ? (
              <p>No hay publicaciones de texto</p>
            ) : (
              textPosts.map(post => (
                <div key={post._id} className="text-post">
                  <p className="description">{post.description}</p>
                  <i className="fa-solid fa-ellipsis" onClick={() => toggleOptions(post._id)}></i>
                  {optionsVisible[post._id] && (
                    <div className="options">
                      <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                      <button onClick={() => handleUpdatePost(post)}>Update</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="pic-posts">
            {picPosts.length === 0 ? (
              <p>No hay publicaciones de imágenes</p>
            ) : (
              <div className="pic-grid">
                {picPosts.map(post => (
                  <div key={post._id} className="pic-post">
                    <p>{post.description}</p>
                    <img src={post.image} alt="Post" />
                    <i className="fa-solid fa-ellipsis" onClick={() => toggleOptions(post._id)}></i>
                    {optionsVisible[post._id] && (
                      <div className="options">
                        <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                        <button onClick={() => handleUpdatePost(post)}>Update</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {editModalOpen && (
        <EditPostModal post={editedPost} onSave={handleSaveChanges} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default PostPanel;
