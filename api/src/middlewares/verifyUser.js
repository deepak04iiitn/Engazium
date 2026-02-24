import { errorHandler } from "./errorHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/user.model.js";

dotenv.config();

export const verifyToken = (req , res , next) => {

    const token = req.cookies.access_token;

    if(!token) {
        return next(errorHandler(401 , 'Please sign in to continue!'));
    }

    jwt.verify(token , process.env.JWT_SECRET , (err , user) => {
        if(err)
        {
            return next(errorHandler(401 , 'Please sign in to continue!'));
        }

        req.user = user;
        next();
    })
}


export const verifyAdmin = async (req, res, next) => {
    try {
        if(!req.user?.id) {
            return next(errorHandler(401, 'Please sign in to continue!'));
        }

        // Read admin status from DB so role changes apply immediately
        // even if the JWT was issued before the promotion.
        const dbUser = await User.findById(req.user.id).select('isUserAdmin');
        if(!dbUser || dbUser.isUserAdmin !== true) {
            return next(errorHandler(403, 'Admins only'));
        }

        req.user.isUserAdmin = true;
        next();
    } catch (error) {
        next(error);
    }
}