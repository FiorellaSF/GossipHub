import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPanel.css';
import EditUserModal from './EditUserModal'; // Importa el componente del modal

function UserPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/user/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <h1>User Panel</h1>
      <div>
        <ul className='user-list'>
          {users.map(user => (
            <li key={user._id}>
              {user.uname} - {user.email} 
              <i class="fa-regular fa-pen-to-square" onClick={() => openModal(user)}></i>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && <EditUserModal user={selectedUser} onClose={closeModal} />} {/* Renderiza el modal si está abierto */}
    </section>
  );
}

export default UserPanel;
