import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [uname, setUname] = useState('');  
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                uname,  
                password
            });

            // Guardar token en localStorage o cookies
            localStorage.setItem('token', response.data.token);

            // Decodificar el token para obtener el rol
            const decodedToken = jwtDecode(response.data.token);
            const role = decodedToken.role;

            // Redirigir según el rol
            if (role === 'user') {
                navigate('/profile');
            } else if (role === 'admin') {
                navigate('/admin');
            } else {
                // En caso de que el rol no esté definido, maneja la redirección como desees
                navigate('/'); // Redirige a una página predeterminada en caso de error
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error de conexión');
        }
    };

    return (
        <section className="login-container">
            <img src='/oveja.png' alt="Bienvenido" className="oveja" />
            <h2>Bienvenido de nuevo</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="uname">Nombre de usuario</label> 
                    <input 
                        type="text"  
                        id="uname" 
                        name="uname" 
                        placeholder="Nombre de usuario"  
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <Link to="/register">¿Todavía no tienes cuenta? Únete</Link>
                </div>
                <button type="submit" className="btn-submit">Iniciar Sesión</button>
            </form>
        </section>
    );
}

export default Login;
