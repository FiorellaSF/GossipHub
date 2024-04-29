import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import ReCAPTCHA from "react-google-recaptcha";   
   {/* -_- ---------- ReCAPTCHA ----------- -_- */}

const Register = () => {
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEntered(true); // Marcar como verdadero cuando se ingrese algo en la contraseña
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validación de los campos del formulario
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;

    if (!emailRegex.test(email) || email.length > 100) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!nameRegex.test(uname) || uname.length > 80) {
      setError('El nombre de usuario sólo debe contener letras.');
      return;
    }

    // Verificar si el campo de confirmar contraseña ha sido completado
    if (passwordEntered && confirmPassword === '') {
      setError('Por favor, confirma tu contraseña.');
      return;
    }

    try {
      const response = await axios.post('https://gossiphub-1.onrender.com/auth/register', {
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

   // -- ------------- Función para manejar el reCAPTCHA ------------- --
   const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
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
                onChange={handlePasswordChange} // Utiliza el nuevo manejador de cambio de contraseña
                required
              />
            </div>
            {passwordEntered && ( // Renderiza el campo de confirmar contraseña solo si algo se ha ingresado en el campo de contraseña
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
            )}
                 <ReCAPTCHA
            sitekey="6Le2UMkpAAAAABAFLn4FwYWOZHi3nlR7BSxepYDz"
            onChange={handleCaptchaChange}
          />
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
