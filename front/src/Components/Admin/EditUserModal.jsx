import React, { useState } from 'react';
import axios from 'axios';

function EditUserModal({ user, onClose }) {
  const [editedData, setEditedData] = useState({
    uname: user.uname,
    email: user.email,
    name: user.name,
    lastName: user.lastName
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/user/users/${user._id}`, editedData);
      onClose(); // Cerrar el modal después de guardar cambios
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/users/${user._id}`);
      onClose(); // Cerrar el modal después de eliminar el usuario
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit User</h2>
        <input placeholder="Username" type="text" name="uname" value={editedData.uname} onChange={handleChange} />
        <input placeholder="Email" type="email" name="email" value={editedData.email} onChange={handleChange} />
        <input placeholder="Name" type="text" name="name" value={editedData.name} onChange={handleChange} />
        <input placeholder="LastName" type="text" name="lastName" value={editedData.lastName} onChange={handleChange} />
        <button onClick={handleSaveChanges}>Save</button>
        <i className="fa-solid fa-trash" onClick={handleDeleteUser}></i> {/* Agregar evento onClick para eliminar el usuario */}
      </div>
    </div>
  );
}

export default EditUserModal;
