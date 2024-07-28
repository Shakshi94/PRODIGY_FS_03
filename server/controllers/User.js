import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createError } from '../error.js';
import Order from '../models/Order.js';
import User from '../models/Users.js';

dotenv.config();

export const userRegister = async (req,res,next) => {
        try{
           const {email,password,name,img} = req.body;
           const existingUser = await User.findOne({ email });
           if(!existingUser){
                return next(createError(409,'Email is already in use'))
           }

           const salt = bcrypt.genSaltSync(10);
           const hashedPassword = bcrypt.hashSync(password,salt);

           const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                img: img,
           });

        const createdUser = user.save();
        const token = jwt.sign({id: createdUser._id},process.env.JWT,{expiresIn:'9999 years'});
         return res.status(200).json({token, user});
        }catch(err){
            return next(err);
        }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return next(createError(404, 'User is not found'));
        }

        const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
        if (!isCorrectPassword) {
            return next(createError(403, 'Incorrect Password'));
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: '9999 years' });
        return res.status(200).json({ token, user: existingUser });
    } catch (err) {
        return next(err);
    }
}

// export const userLogout = async (req,res,next) => {
    
// }