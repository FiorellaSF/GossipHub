import express from 'express';
// import { authMiddelware } from '../middelware/authMiddelware.js';
import { showAllUsers, getOneUser, updateUser, deleteUser } from '../Controllers/User.controller.js';

const userRoute = express.Router();

userRoute.get('/users', showAllUsers);
userRoute.get('/users/:id', getOneUser);
userRoute.put('/users/:id', updateUser);
userRoute.delete('/users/:id', deleteUser);

export default userRoute;