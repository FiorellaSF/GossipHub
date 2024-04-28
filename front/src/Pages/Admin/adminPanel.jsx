import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './adminPanel.css';
import PostPanel from '../../Components/Admin/PostPanel.jsx';
import UserPanel from '../../Components/Admin/UserPanel.jsx';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.role !== 'admin') {
        navigate('/AccessDenied');
      }
    } else {
      // Si no hay token, redirigir al usuario al inicio de sesión
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <UserPanel />
      <PostPanel />
    </div>
  );
};

export default AdminPanel;
