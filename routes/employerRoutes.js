import express from 'express';

import {getEmployerJobs,createJob,getJobById,updateJob
} from '../controllers/employerController.js'


const router = express.Router();
router.get('/employer/:userId/jobs', getEmployerJobs);
router.post('/employer/:userId/createjob',createJob);
router.get('/employer/:userId/getjob/:id',getJobById);
router.put('/employer/:userId/updatejob/:id',updateJob)



export default router;