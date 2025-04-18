import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import {User} from '../models/User.js';
import otp from '../utils/sendOtp.js';
import bcrypt from 'bcryptjs';

const generateOtp=()=> Math.floor(1000+ Math.random()*9000).toString();

export const sendOtp=async(req,res)=>{
    const {phone, role}=req.body;
    if(!phone || !role) return res.status(400).json({message:'Phone and role are not found'});

    const otp1=generateOtp();
    const expiresAt = Date.now()+5*60*1000;

    const salt = bcrypt.genSaltSync(10);
    const hashedOtp = bcrypt.hashSync(otp1, salt);

     await Otp.destroy({where:{phone,role}});
     await Otp.create({
        phone,
        role,
        otp: hashedOtp,
        expiresAt
      });
      
    //  await Otp.destroy({where:{phone, role, otp1, expiresAt}});

    await otp(phone,otp1); //use real sms service later

    res.json({message:"otp succesfully sent"})
};

export const verifyOtp = async (req, res) => {
    const { phone, otp, role } = req.body;
    if (!phone || !otp || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const record = await Otp.findOne({ where: { phone, role} });
      console.log("verify",record);
      console.log(`expireat ${(new Date(record?.dataValues.expiresAt).getTime())}  current date ${Date.now()}`);
      
      if (!record?.dataValues || (new Date(record.dataValues.expiresAt).getTime()) < Date.now()) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
      }else{
        const votp = record?.dataValues.otp;
        const isMatch=bcrypt.compareSync(otp,votp);
        if(!isMatch){
          return res.status(400).json({message:"invalid otp.."})
        }
        console.log("otp varified..");
        
      }

  
      let user = await User.findOne({ where: { phone , role } });
      console.log("user",user);
      
      if (!user) {
        user = await User.create({ phone, role });
      }
  
      const token = jwt.sign(
        { userId: user.id, phone, role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      await Otp.destroy({ where: { phone, role } });
  
      return res.json({ message: "Login successful", token, user });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  