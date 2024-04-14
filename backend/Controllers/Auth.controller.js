import bcrypt from "bcryptjs";
import User from "../Models/auth.model.js";
import Jwt from "jsonwebtoken";

// REGISTERS USER
export const register = async (req, res) => {
  const { uname, email, password } = req.body;

  try {
    if (!uname || !email || !password) {
      return res.status(400).json({ message: "Campo obligatorio" });
    }

    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUname = await User.findOne({ uname });

    if (existingUserByEmail || existingUserByUname) {
      return res.status(400).json({ message: "Cuenta ya existente" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      uname,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: "Te has registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// LOGINS USER
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const isEmail = typeof identifier === 'string' && identifier.includes('@');

    const user = isEmail
      ? await User.findOne({ email: identifier })
      : await User.findOne({ uname: identifier });

    if (!user) {
      return res.status(400).json({ message: 'Email o username incorrecto' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña no válida' });
    }

    const token = Jwt.sign(
      {
        _id: user._id,
        username: user.uname,
        email: user.email,
      },
      process.env.TOKEN_SECRET
    );

    res.header('auth-token', token).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
