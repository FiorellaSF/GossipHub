import React from 'react';
import { useNavigate } from 'react-router-dom';
import'./adminPanel.css'
import PostPanel from '../../Components/Admin/PostPanel.jsx';
import UserPanel from '../../Components/Admin/UserPanel.jsx';


const AdminPanel = () => {
  const navigate = useNavigate();

  // Verifica si el usuario es administrador
//   const isUserAdmin = isAdmin();

  // Si el usuario no es administrador, navega a la página de error de acceso
//   if (!isUserAdmin) {
//     navigate('/access-denied');
//     return null;
//   }

  // Si el usuario es administrador, muestra el panel de administrador
  return (
    <div>
      <h1>Panel de Administrador</h1>
      <PostPanel />
      <UserPanel />

    </div>
  );
};

export default AdminPanel;
