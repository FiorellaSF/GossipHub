import crypto from 'crypto';

// Genera un token secreto aleatorio
const generateTokenSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Utiliza la función para obtener el token secreto
const TOKEN_SECRET = generateTokenSecret();

// VERIFIES THE TOKEN CAN BE FOUND IN THE HEADER "AUTH-TOKEN"
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = Jwt.verify(token, TOKEN_SECRET);

        req.user = verified;

        next();
        
    } catch(error) {
        res.status(400).json({ message: "Invalid credentials" });
    }
};

export default verifyToken;
