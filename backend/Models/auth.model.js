import mongoose from 'mongoose';
import userSchema from '../Schemas/User.schema.js';

const User = mongoose.model('User', userSchema);

export default User;
