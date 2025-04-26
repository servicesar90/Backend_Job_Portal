// import User from "../models/EmployeeModels/Employee.js";
import Employee from '../models/EmployeeModels/Employee.js';
import EmployeeExperience from '../models/EmployeeModels/EmployeeExperience.js';
import EmployeeEducation from '../models/EmployeeModels/EmployeeEduaction.js';


export const createProfile =async(req,res)=>{
    // console.log(...req.body);
    const {userId}=req.params;
    try{
        const employee= await Employee.create({
            ...req.body,
            employeeId:userId
        })
        res.status(201).json({message:'Employee Profile Created Succesfully',employee})
    }catch(error){
        res.status(500).json({error:error});

    }
};


export const updateProfile=async(req,res)=>{
    const {userId}=req.params;
    console.log(userId);
    
    try{
        const user = await Employee.findOne({
            where:{
            userid:1
        }});
        if(!user){
            res.status(404).json({message:"user not found or unauthorized"})
        }
        await Employee.update(req.body,{
            where:{
                userid:1
            }
        });
        res.json(user);



    }catch(error){
        res.status(500).json({error:error.message})

    }
};

export const getFullEmployeeProfile = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const profile = await Employee.findOne({
        where: { userId },
        include: [
          { model: EmployeeEducation, attributes: { exclude: ['createdAt', 'updatedAt'] }, },
          { model: EmployeeExperience ,attributes: { exclude: ['createdAt', 'updatedAt'] }, },
        ]
      });
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  