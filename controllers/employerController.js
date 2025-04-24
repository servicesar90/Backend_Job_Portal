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
            where:{employerIduserId},
            order:[['createdAt','DESC']]
        });
        res.status(200).json({totalJobs:jobs.length, jobs});
    }catch(error){
        console.error('error fetching employerjobs:', error);
        res.status(500).json(({message:'Server error while fetching jobs'}))

    }
};

export const createJob= async (req, res)=>{
    const {userId}=req.params;

    try{
        console.log({...req.body});
        
        const job= await Job.create({
            ...req.body,
            employerId:userId
        });
        res.status(201).json({message:"jobs created succesfully"},job)
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

export const getJobById= async(req,res)=>{
    const {userId,id}=req.params;

    try{
        const job=await Job.findOne({
            where:{
                id:id,
                employerId:userId
            }
        });
        if(!job){
            return res.status(404).json({error:'Job Not Found'})
        }
        res.json(job);
    }catch(error){
        res.status(500).json({error:error.message})
    }
};

export const updateJob= async(req,res)=>{
    const {userId,id}=req.params;

    try{
        const job=await Job.findOne({
            where:{
                id:id,
                employerId:userId
            }
        });
        if(!job){
            return res.status(404).json({error:'job not found or unauthorized'});
        } 
        await job.update(req.body);
        res.json(job);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};