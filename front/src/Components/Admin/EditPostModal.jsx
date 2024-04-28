import React, { useState } from 'react';
import './EditPostModal.css'

const EditPostModal = ({ post, onSave, onClose }) => {
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image || '');
  const [newImage, setNewImage] = useState('');

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    onSave(post._id, description, newImage);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Post</h2>
        <textarea value={description} onChange={handleChange}></textarea>
        {post.image && (
          <div>
            <img src={image} alt="Post" />
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditPostModal;
