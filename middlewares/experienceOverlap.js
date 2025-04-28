import EmployeeExperience from "../models/EmployeeModels/EmployeeExperience.js";
import {Op} from 'sequelize';

export const checkExperienceOverlap=async(req, res,next)=>{
    try{
        const {startDate,endDate}=req.body;
        const {id}=req.params;

        if(!startDate || !endDate){
            return res.status(400).json({message:'satrt date and end date are required'});

        };

        const overlapExperience= await EmployeeExperience.findOne({
            where:{
                id,
                startDate:{[Op.lte]:endDate},
                endDate:{[Op.gte]:startDate},
            },
        });

        if(overlapExperience){
            return res.status(400).json({
                error:'Experience for the given time period alrteady exists, please check dates'
            });
        }
        next();

    }
    catch(error){
        console.log("error checking education overlap:", error);

    }
}