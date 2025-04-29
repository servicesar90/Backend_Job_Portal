import Job from '../models/Job.js';
import  {User } from '../models/User.js'


//get all jobs posted by employer
export const getEmployerJobs = async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: "Invalid employer ID" });
  }

  try {
    const employer = await User.findOne({ where: { id: userId, role: 'employer' } });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found or unauthorized" });
    }

    const jobs = await Job.findAll({
      where: { employerId: userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ totalJobs: jobs.length, jobs });
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
};




// to post job
export const createJob = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid employer ID" });
    }
  
    try {
      const employer = await User.findOne({ where: { id: userId, role: 'employer' } });
  
      if (!employer) {
        return res.status(403).json({ message: "Unauthorized: Not an employer" });
      }
  
      // TODO: Add validation for required fields here (e.g., title, type, location)
      const job = await Job.create({
        ...req.body,
        employerId: userId,
      });
  
      res.status(201).json({
        message: "Job created successfully",
        job,
      });
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



//get details of single job by its id
export const getJobById = async (req, res) => {
    const { userId, id } = req.params;
  
    if (!userId || !id || isNaN(userId) || isNaN(id)) {
      return res.status(400).json({ message: "Invalid user or job ID" });
    }
  
    try {
      const job = await Job.findOne({
        where: {
          id,
          employerId: userId,
        },
      });
  
      if (!job) {
        return res.status(404).json({ message: "Job not found or unauthorized" });
      }
  
      res.status(200).json(job);
    } catch (error) {
      console.error("Error fetching job by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  


//update the single job

export const updateJob = async (req, res) => {
    const { userId, id } = req.params;
  
    if (!userId || !id || isNaN(userId) || isNaN(id)) {
      return res.status(400).json({ message: "Invalid user or job ID" });
    }
  
    try {
      const job = await Job.findOne({
        where: {
          id,
          employerId: userId,
        },
      });
  
      if (!job) {
        return res.status(404).json({ message: "Job not found or unauthorized" });
      }
  
      await job.update(req.body);
  
      res.status(200).json({
        message: "Job updated successfully",
        job,
      });
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  