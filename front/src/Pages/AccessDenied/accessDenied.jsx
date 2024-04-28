import React from 'react';
import { Link } from 'react-router-dom';
import'./accessDenied.css'

const AccessDenied = () => {

  return (
    <main>
    <h1>Acceso denegado</h1>
    <Link to="/">Volver a la página principal,</Link>
  </main>
  );
};

export default AccessDenied;
