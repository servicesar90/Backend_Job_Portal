import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const EmployeeProfile = sequelize.define("EmployeeProfile", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  wantsJobUpdate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  englishProficiency: {
    type: DataTypes.ENUM("No English", "Basic", "Intermediate", "Advanced"),
    allowNull: false,
  },
  furtherEducation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  months: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  years: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  preferredJobRoles: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  appliedJobs: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  currentLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hometown: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preferredJobCity: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  otherLanguages: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  preferredShifts: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  preferredLocationTypes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  prefferedEmploymentTypes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  resumeURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default EmployeeProfile;
