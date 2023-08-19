import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ error: "Name is required" });
        }
        if (!email) {
            return res.send({ error: "Email is required" });
        }
        if (!password) {
            return res.send({ error: "Password is required" });
        }
        if (!phone) {
            return res.send({ error: "Phone no is required" });
        }
        if (!address) {
            return res.send({ error: "Address is required" });
        }
        //check user
        const existingUser = await userModel.findOne({ email: email });
        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success: true,
            message: "User registered successfully!",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};
export const userLogin = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid Email or Password.'
            });
        }
        
        //check email register or nor
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'You are not registered.'
            });
        }
        const matchPassword = await comparePassword(password,user.password);
        if(!matchPassword){
            return res.status(200).send({
                success: false,
                message: 'Your password not match our record'
            });
        }
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        return res.status(200).send({
            success:true,
            message: "Login successfully!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};


export const test = async (req, res) => {
    try {
       return res.send("Protected route");
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in test",
            error,
        });
    }
}