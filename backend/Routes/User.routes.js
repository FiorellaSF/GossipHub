import express from 'express';
// import { getOneUser, showAllUsers, updateUser ,deleteUser} from '../controllers/userController.js';
// import { authMiddelware } from '../middelware/authMiddelware.js';
import { showAllUsers } from '../Controllers/User.controller.js';

const userRoute = express.Router();

userRoute.get('/users', showAllUsers);
// userRoute.get('/users/:id', getOneUser);
// userRoute.put('/users/:id', updateUser);
// userRoute.delete('/users/:id',deleteUser);

export default userRoute;