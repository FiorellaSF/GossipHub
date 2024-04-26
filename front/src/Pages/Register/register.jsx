import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        uname,
        email,
        password,
      });

      // Guardar token en localStorage o cookies
      localStorage.setItem('token', response.data.token);

      // Redirigir al usuario a /profile
      navigate('/profile');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error de conexión');
    }
  };

  return (
    <main className="container">
      <section className="form-container">
        <img src="/spring.png" alt="Logo" className="form-image" />
        <div className="form-content">
          <h2>La primera vez?</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre de usuario:</label>
              <input
                type="text"
                name="uname"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirmar Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Únete!
            </button>
          </form>
          <div>
            <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
