import React, { useState, useEffect } from 'react';
import './UserInfo.css';

const UserInfo = () => {
  // Estado para almacenar el uname y la profileImage
  const [uname, setUname] = useState('');
  const [profileImage, setProfileImage] = useState('');

  // Función para obtener los datos del usuario desde la API al cargar el componente
  useEffect(() => {
    // Llamada a la función para obtener los datos del usuario
    getUserInfo()
      .then(data => {
        // Actualizar el estado con los datos del usuario
        setUname(data.uname);
        setProfileImage(data.profileImage);
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al cargar el componente

  const getUserInfo = async () => {
    try {
      const response = await fetch(`/user/:uname${encodeURIComponent(uname)}`); 
      // Utilizamos encodeURIComponent para asegurarnos de que el nombre de usuario esté correctamente codificado en la URL
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al obtener los datos del usuario');
    }
  };

  return (
    <div className="user-profile-navbar">
      {/* Mostrar el uname y la profileImage */}
      <p>Nombre de usuario: {uname}</p>
      <img src={profileImage} alt="Imagen de perfil" />
    </div>
  );
};

export default UserInfo;
