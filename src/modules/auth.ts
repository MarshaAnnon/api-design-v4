import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

export const createJWT = (user) => {
  const token = jwt.sign(
    {
        id: user.id,
        username: user.name,
    },
    process.env.JWT_SECRET,
  );
  return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401).json({message: "You need to login"})
        return 
    }

    const [, token] = bearer.split(" ");

    if(!token){
        res.status(401).json({message: "Not authorized"})
        return 
    }

    try { 
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log("User --->>>",user);
        next();
        return;
    } catch(e) {
        console.error(e);
        res.status(401).json({message: "Not authorized"})
        return
    }
}