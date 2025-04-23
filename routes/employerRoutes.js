import express from 'express';

import {getEmployerJobs} from '../controllers/employerController.js'

const router = express.Router();
router.get('/employer/:userId/jobs', getEmployerJobs);

export default router;