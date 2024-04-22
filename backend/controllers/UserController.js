import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";



// login user 
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        // checking if user exists
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User does not exist"});
        }
        // checking if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Incorrect password"});
        }
        // generating token
        const token = createToken(user._id);
        res.json({success: true, message: "Login successful", token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong"});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req,res) => {
    const { name, email, password } = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success: false, message: "User already exists"});
        }
        // validating email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email"});
        }
        if(password.length < 8) {
            return res.json({success: false, message: "Please enter strong password"});
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const user = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });
        const newUser = await user.save();

        // generating token
        const token = createToken(newUser._id);
        res.json({success: true, message: "User created successfully", token});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to register user"});
    }

}

export { loginUser, registerUser }