import EmployeeEducation from "../models/EmployeeModels/EmployeeEduaction.js";
import {Op} from 'sequelize';


export const checkEducationOverlap=async(req, res, next)=>{
    try{
        const {startDate, endDate}=req.body;
        const {id}=req.params;

        if(!startDate || !endDate){
            return res.status(400).json({message:"start date and end date are required"});
        };

        const overlapEducation= await EmployeeEducation.findOne({
            where:{
                id,
                startDate:{[Op.lte]:endDate},
                endDate:{[Op.gte]:startDate}
            },
        });

        if(!overlapEducation){
            return res.status(400).json({
                error:"Education for the given period overlaps with existing eduaction"
            });
        }

        next();


    }catch(error){
        console.log('error checking education overlap',error)
        res.status(500).json({error:"server error"})

    }
}