import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión, como limpiar el token de autenticación, etc.
    // Por ahora, simplemente cambiamos el estado para indicar que el usuario ha cerrado sesión.
    setLoggedIn(false);
  };

  return (
    <nav className='navbar'>
      <div className='nav-logo'>
        <img src='./logo-GH.png' alt='' />
      </div>

      <div className='icons'>
        <i className="fa-solid fa-magnifying-glass" onClick={toggleInput}></i>
        {showInput && <input type="text" placeholder="Buscar..." />}
        
        {/* Mostrar el icono de cierre de sesión solo cuando el usuario esté logueado */}
        {loggedIn && (
          <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>
        )}
        
        {/* Mostrar el icono de usuario solo cuando el usuario no esté logueado */}
        {!loggedIn && (
          <Link to="/login"> <i className="fa-solid fa-user-large"></i></Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
