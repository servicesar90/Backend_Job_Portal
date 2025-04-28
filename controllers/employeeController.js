// import User from "../models/EmployeeModels/Employee.js";
import Employee from "../models/EmployeeModels/Employee.js";
import EmployeeExperience from "../models/EmployeeModels/EmployeeExperience.js";
import EmployeeEducation from "../models/EmployeeModels/EmployeeEduaction.js";

export const createProfile = async (req, res) => {
  // console.log(...req.body);
  const { userId } = req.params;
  try {
    const employee = await Employee.create({
      ...req.body,
      employeeId: userId,
    });
    res
      .status(201)
      .json({ message: "Employee Profile Created Succesfully", employee });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const user = await Employee.findOne({
      where: {
        userid: 1,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user not found or unauthorized" });
    }
    await Employee.update(req.body, {
      where: {
        userid: 1,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFullEmployeeProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const profile = await Employee.findOne({
      where: { userId },
      include: [
        {
          model: EmployeeEducation,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: EmployeeExperience,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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

///add experience
export const addExperience = async (req, res) => {
  const userId = req.params.id;

  try {
    const experience = await EmployeeExperience.create({
      ...req.body,
      employeeId: userId,
    });
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await EmployeeExperience.findByPk(id);
    if (!experience) {
      res
        .status(400)
        .json({ message: "Experience not found" });
    }

    await experience.update(req.body);
    res.send(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete experience
export const deleteExperience= async(req,res)=>{
  

  try{
    const {id}=req.params;
    const experience=await EmployeeExperience.findByPk(id);

    if(!experience){
      return res.status(404).json({message:'experience not found'});

    }
    await experience.destroy();
    res.json({sucess:true, message:'experience deleted'})

  }catch(error){
    res.status(500).json({error:error.message})

  }
};


///add education
export const addEducation = async (req, res) => {
  const userId = req.params.id;

  try {
    const education = await EmployeeEducation.create({
      ...req.body,
      employeeId: userId,
    });
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update education
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await EmployeeEducation.findByPk(id);
    if (!education) {
      res
        .status(400)
        .json({ message: "Education not found" });
    }

    await education.update(req.body);
    res.send(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete education
export const deleteEducation= async(req,res)=>{
  

  try{
    const {id}=req.params;
    const education=await EmployeeEducation.findByPk(id);

    if(!education){
      return res.status(404).json({message:'education not found'});

    }
    await education.destroy();
    res.json({sucess:true, message:'education deleted'})

  }catch(error){
    res.status(500).json({error:error.message})

  }
}