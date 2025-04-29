// import User from "../models/EmployeeModels/Employee.js";
import EmployeeProfile from "../models/EmployeeModels/Employee.js";
import EmployeeExperience from "../models/EmployeeModels/EmployeeExperience.js";
import EmployeeEducation from "../models/EmployeeModels/EmployeeEduaction.js";

//employee profile creation
export const createProfile = async (req, res) => {
  const errors = (req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // console.log(...req.body);
  const { userId } = req.params;
  // console.log(userId);
  try {
    const existingProfile = await EmployeeProfile.findOne({
      where: { userId },
    });
    if (existingProfile) {
      return res
        .status(409)
        .json({ message: "Profile already exists for this user" });
    }

    const employee = await EmployeeProfile.create({
      ...req.body,
      userId: userId,
    });

    res
      .status(201)
      .json({ message: "Employee Profile Created Successfully", employee });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//employee profile update

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await EmployeeProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await profile.update(req.body);

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get employee profile full

export const getFullEmployeeProfile = async (req, res) => {
  const { id: userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: "Invalid or missing user ID" });
  }

  try {
    const profile = await EmployeeProfile.findOne({
      where: { userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
      return res.status(404).json({ message: "Employee profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

///add experience
export const addExperience = async (req, res) => {
  const employeeId = req.params.id;
  const {
    companyName,
    industry,
    employmentType,
    jobTitle,
    jobRole,
    description,
    startDate,
    endDate,
    noticePeriod,
    isCurrent,
    currentSalary,
    skillsUsed,
  } = req.body;

  // Basic input validation
  if (!employeeId || isNaN(employeeId)) {
    return res.status(400).json({ message: "Invalid or missing employee ID" });
  }

  if (!companyName || !jobTitle || !jobRole) {
    return res
      .status(400)
      .json({
        message: "companyName, jobTitle, and jobRole are required fields",
      });
  }

  try {
    const experience = await EmployeeExperience.create({
      employeeId,
      companyName,
      industry,
      employmentType,
      jobTitle,
      jobRole,
      description,
      startDate,
      endDate,
      noticePeriod,
      isCurrent: isCurrent || false,
      currentSalary,
      skillsUsed,
    });

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update experience
export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    industry,
    employmentType,
    jobTitle,
    jobRole,
    description,
    startDate,
    endDate,
    noticePeriod,
    isCurrent,
    currentSalary,
    skillsUsed,
  } = req.body;

  // Input validation
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing experience ID" });
  }

  try {
    const experience = await EmployeeExperience.findByPk(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update only the fields provided in the request
    const updatedExperience = await experience.update({
      companyName,
      industry,
      employmentType,
      jobTitle,
      jobRole,
      description,
      startDate,
      endDate,
      noticePeriod,
      isCurrent,
      currentSalary,
      skillsUsed,
    });

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete experience
export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing experience ID" });
  }

  try {
    const experience = await EmployeeExperience.findByPk(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Proceed with deletion
    await experience.destroy();

    res.status(200).json({
      success: true,
      message: "Experience successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






///add education
export const addEducation = async (req, res) => {
  const { id: userId } = req.params;

  // Basic validation
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  const {
    educationType,
    startDate,
    endDate,
    degree,
    highestEducation,
    schoolMedium,
    specialization,
    instituteName,
    isHighestQualification,
  } = req.body;

  if (!degree || !institution || !startDate) {
    return res.status(400).json({
      message: "Degree, institution, and startDate are required",
    });
  }

  try {
    // Ensure employee exists
    const employee = await EmployeeProfile.findByPk(userId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const education = await EmployeeEducation.create({
      educationType,
      startDate,
      endDate,
      degree,
      highestEducation,
      schoolMedium,
      specialization,
      instituteName,
      isHighestQualification,
      employeeId: userId,
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





//update education
export const updateEducation = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid education ID" });
  }

  try {
    const education = await EmployeeEducation.findByPk(id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await education.update(req.body);

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//delete education
export const deleteEducation = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid education ID" });
  }

  try {
    const education = await EmployeeEducation.findByPk(id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await education.destroy();

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

