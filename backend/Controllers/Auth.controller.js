import bcrypt from "bcryptjs";
import User from "../Models/auth.model.js";
import Jwt  from "jsonwebtoken";

//REGISTER USER
export const register = async (req, res) => {

    const { uname, email, password } = req.body

    try {
      const existingUserByEmail = await User.findOne({ email: email });
      const existingUserByUname = await User.findOne({ uname: uname });
  
      if(existingUserByEmail || existingUserByUname) {
        return res.status(400).json({ message: "The email or username already exists" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = new User({
        uname: uname,
        email: email,
        password: hashedPassword,
      });

      await user.save();

      res.status(200).json({ message: "You've been registered successfully" })

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//LOGIN USER
export const login = async (req, res) => {
  try {
    // LOOKS UP FOR THE DATA THAT'S BEING PUT ON THE INPUTS
    const { uname, password } = req.body;

    const user = await User.findOne({ uname: uname })

    if (!user) {
      return res.status(400).json({ message: 'Incorrect username' });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
    }
    
    const token = Jwt.sign(
      {
        _id: user._id,
        uname: user.uname,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_SECRET
    );
    res.header({
      'auth-token': token,
    });

    res.json({ token });} 
    catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};