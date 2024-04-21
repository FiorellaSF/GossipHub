import React from "react";
import './login.css';

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Conectar back
    };

    return (
        <main className="login-container">
            <img src='/oveja.png' alt="Bienvenido" className="oveja" />
            <h2>Bienvenido de nuevo</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Correo Electrónico" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Contraseña" required />
                </div>
                <button type="submit" className="btn-submit">Iniciar Sesión</button>
            </form>
        </main>
    );
}

export default Login;
