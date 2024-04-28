import rateLimit from 'express-rate-limit';
import redis from 'redis';
import redisStore from 'rate-limit-redis';

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

const limiter = rateLimit({
  store: new redisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 2, // Límite de 2 peticiones por ventana
  message: 'Too many requests from this IP, please try again later',
});

export default limiter;
