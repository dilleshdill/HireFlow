import jwt from 'jsonwebtoken'

export const protectUser = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({message:"not authenticated"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message:"Invalid token"})
    }
};