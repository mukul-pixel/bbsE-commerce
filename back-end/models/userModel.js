// const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//now creating a new schema for the users who registers on the website

const userSchema =new mongoose.Schema({
    name:String,
    mail:String,
    location:String,
    contact:Number,
    password:String,
    imageSrc:String,
    role: {
        type: String,
        enum: ['user', 'admin'], // Specify the possible values for the role
        default: 'user' // Set a default value for the role
    },
})

//json web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
               userId : this._id.toString(),
               email:this.mail, 
            },
            "jwt-secret-key",
            {
                expiresIn:'120'
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const collection = mongoose.model("collection",userSchema);

module.exports = collection;