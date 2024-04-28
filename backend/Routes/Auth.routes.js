import express from "express";
import { login, register } from "../Controllers/Auth.controller.js";
// import limiter from "../Middlewares/rateLimit.middleware.js"
const router = express.Router();


// router.use(limiter);

router.post('/register', register);
router.post('/login', login);

export default router;
