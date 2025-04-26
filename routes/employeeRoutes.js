import express from 'express';

import {createProfile,updateProfile,getFullEmployeeProfile} from '../controllers/employeeController.js';


const router = express.Router();

router.post('/employee/:userId/createProfile', createProfile)
router.post('/employee/:userId/updateProfile/:id',updateProfile)
router.get('/employee/profile/full/:id', getFullEmployeeProfile);




export default router;
