import express from "express";

import {
  createProfile,
  updateProfile,
  getFullEmployeeProfile,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation
} from "../controllers/employeeController.js";
import {checkEducationOverlap} from '../middlewares/educationOverlap.js';
import { checkExperienceOverlap } from "../middlewares/experienceOverlap.js";

const router = express.Router();

router.post("/employee/:userId/createProfile", createProfile);
router.patch("/employee/:userId/updateProfile/:id", updateProfile);  
router.get("/employee/profile/full/:id", getFullEmployeeProfile);
router.post("/employee/:id/addExperience",checkExperienceOverlap, addExperience);
router.patch("/employee/updateExperience/:id",checkExperienceOverlap, updateExperience);
router.delete("/employee/deleteExperience/:id", deleteExperience);
router.post("/employee/:id/addEducation",checkEducationOverlap, addEducation);
router.patch("/employee/updateEducation/:id",checkEducationOverlap, updateEducation);
router.delete("/employee/deleteEducation/:id", deleteEducation);


export default router;
