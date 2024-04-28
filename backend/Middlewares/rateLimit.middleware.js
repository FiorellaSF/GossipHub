import rateLimit from 'express-rate-limit';

// Middleware para limitar las solicitudes por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de inicio de sesión, por favor intenta de nuevo más tarde.',
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 2, 
  message: 'Demasiados intentos de inicio de sesión, por favor intenta de nuevo más tarde.',
});

export { limiter, loginLimiter };
