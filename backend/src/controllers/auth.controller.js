import { errorHandler } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";

export const signup = async(req , res , next) => {

    const { username , email , password } = req.body;

    if(!username || !email || !password) {
        return next(errorHandler(400 ,'All fields are required!'));
    }

    const hashedPassword = bcryptjs.hashSync(password , 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.json('Signup successfull!');
    } catch (error) {
        next(error);
    }

}

export const signin = async(req , res , next) => {
    
}

export const google = async(req , res , next) => {
    
}

export const logout = async(req , res , next) => {
    
}