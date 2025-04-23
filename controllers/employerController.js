import Job from '../models/Job.js';
import  {User } from '../models/User.js'

export const getEmployerJobs = async (req, res)=>{
    const {userId}=req.params;

    try{
        const employer = await User.findOne({where:{id:userId, role: 'employer'}});


        if(!employer){
            return res.status(404).json({message:"Employer not found or invalid role"});
        }

        const jobs= await Job.findAll({
            where:{employerId:userId},
            order:[['createdAt','DESC']]
        });
        res.status(200).json({totalJobs:jobs.length, jobs});
    }catch(error){
        console.error('error fetching employerjobs:', error);
        res.status(500).json(({message:'Server error while fetching jobs'}))

    }
};