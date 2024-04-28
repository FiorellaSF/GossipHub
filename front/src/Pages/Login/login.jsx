import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { jwtDecode } from "jwt-decode";
import { sanitize } from 'dompurify'; // Importa la biblioteca de sanitización

const Login = () => {
    const [uname, setUname] = useState('');  
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitiza los campos de entrada para evitar XSS
        const sanitizedUname = sanitize(uname);
        const sanitizedPassword = sanitize(password);
        const sanitizedName = sanitize(name);
        const sanitizedLastName = sanitize(lastName);
        
        // Verifica si los campos ocultos están completos
        if (sanitizedName.trim() !== '' || sanitizedLastName.trim() !== '') {
            setError('Campos ocultos completados');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                uname: sanitizedUname,  
                password: sanitizedPassword
            });

            // Guardar token en localStorage o cookies
            localStorage.setItem('token', response.data.token);

            // Decodificar el token para obtener el rol
            const decodedToken = jwtDecode(response.data.token);
            const role = decodedToken.role;

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
                <div className="formgroup">
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="lastName">Apellidos</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Apellidos" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
