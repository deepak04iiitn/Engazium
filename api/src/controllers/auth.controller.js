import { errorHandler } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

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
    
    const { email , password } = req.body;

    if(!email || !password) {
        return next(errorHandler(400 , 'All fields are required!'));
    }

    try {
        const validUser = await User.findOne({ email });

        if(!validUser) {
            return next(errorHandler(404 , 'Invalid credentials'));
        }

        const validPassword = bcryptjs.compareSync(password , validUser.password);

        if(!validPassword) {
            return next(errorHandler(400 , 'Invalid credentials'));
        }

        const token = jwt.sign(
            {
                id: validUser._id,
                isUserAdmin: validUser.isUserAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { password: pass , ...rest } = validUser._doc;

        res.status(200)
            .cookie('access_token' , token , {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json(rest);
  
    } catch (error) {
        next(error);
    }
}


export const google = async(req , res , next) => {
    
    const { name, email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(user) {
            const token = jwt.sign(
                {
                    id: user._id,
                    isUserAdmin: user.isUserAdmin  
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            const { password, ...rest } = user._doc;

            res.status(200)
               .cookie('access_token', token, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, 
                    sameSite: 'strict',
               })
               .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                isUserAdmin: false  
            });

            await newUser.save();

            const token = jwt.sign(
                {
                    id: newUser._id,
                    isUserAdmin: newUser.isUserAdmin  
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            const { password, ...rest } = newUser._doc;

            res.status(200)
               .cookie('access_token', token, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, 
                    sameSite: 'strict',
               })
               .json(rest);
        }
    } catch (error) {
        next(error);
    }

}


export const logout = async(req , res , next) => {

    try {
        res.clearCookie('access_token')
            .status(200)
            .json('User has been logged out successfully!');
    } catch (error) {
        next(error);
    }

}