import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const EmployeeEducation = sequelize.define("EmployeeEducation", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "EmployeeProfiles",
      key: "id",
    },
  },
  educationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  highestEducation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  schoolMedium: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instituteName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isHighestQualification: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default EmployeeEducation;
