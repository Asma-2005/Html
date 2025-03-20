const { request } = require('express');
const User=require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Function to create JWT
const createToken = (id) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging
    console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN); // Debugging
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};





//handling errors func
const handling=(err)=>{
    console.log(err.message,err.code);
    let error={username:'',role:'',password:''};

    //dublicate usernames
    if(err.code===11000){
        error.username='This username is already exist';
        return error;
    }

    if(err.message.includes("Users validation failed")){
       Object.values(err.errors).forEach(({properties})=>{
        //as the path represents the key(username,role,password,donations,requests)
     error[properties.path]=properties.message;
    });
   
    }
    return error;
};

let signup=async(req,res)=>{
    const{username,role,password,donations,requests}=req.body;
    console.log(username,role,password,donations,requests);
    try{
     const user= await  User.create({username,role,password,donations,requests});
     res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        const errors=handling(err);
        res.status(400).json({errors});
    }

};

let signin=async(req,res)=>{

    const { username, password } = req.body;

    try {
        //Checking if the user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid username or password" });

        //Comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid username or password" });

        //Generating JWT Token
        const token = createToken(user._id);

        //Sending response with token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
   
    
};

let signout=(req,res)=>{
    res.cookie("jwt", "", { maxAge: 1 }); // Expire the JWT cookie immediately
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports={signin,signup,signout};