import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate(); // Obtener la función de navegación

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <nav className='navbar'>
      <div className='nav-logo'>
        <img src='./logo-GH.png' alt='' />
      </div>

      <div className='icons'>
      
        <i className="fa-solid fa-magnifying-glass" onClick={toggleInput}></i>
        {showInput && <input type="text" placeholder="Buscar..." />}
        <Link to="/register"> <i className="fa-solid fa-user-large"></i></Link> {/* Usar Link para la navegación */}
      </div>
    </nav>
  );
}

export default Navbar;
