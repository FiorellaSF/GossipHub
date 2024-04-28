import rateLimit from 'express-rate-limit';

// Middleware para limitar las solicitudes por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos de inicio de sesión permitidos por IP
  message: 'Demasiados intentos de inicio de sesión, por favor intenta de nuevo más tarde.',
});

export default limiter;
