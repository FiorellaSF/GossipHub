import React, { useState } from 'react';
import './EditPostModal.css'

const EditPostModal = ({ post, onSave, onClose }) => {
  const [description, setDescription] = useState(post.description);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(post._id, description);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Post</h2>
        <textarea value={description} onChange={handleChange}></textarea>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditPostModal;
