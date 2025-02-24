import mongoose, {model,Schema}  from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
})

const UserSchema=new Schema({
    name: {type:String,unique:true},
    email:{type:String,unique:true},
    password:String,
    verified:Boolean,
})

export const userModel=model("User",UserSchema);

const UserOTPVerification=new Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date,
});

export const OTPModel=model("OTP",UserOTPVerification);
