import jwt from 'jsonwebtoken'

const generateUserToken = (userId,email) => {
    return jwt.sign(
        {id:userId,email},
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
}

export default generateUserToken;