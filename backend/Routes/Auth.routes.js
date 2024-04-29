import express from "express";
import { login, register } from "../Controllers/Auth.controller.js";
import { loginLimiter } from "../Middlewares/rateLimit.middleware.js";
const router = express.Router();


router.use(loginLimiter);

router.post('/register', register);
router.post('/login', login);

export default router;
