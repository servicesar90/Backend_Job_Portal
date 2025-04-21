import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EmployeeEXPERIENCE = sequelize.define("EmployeeExperience", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employee",
      key: "id",
    },
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobRole: {
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
  isCurrent: {
    type: DataTypes.BOOLEAN,
    defultValue: false,
  },
  currentSalary: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  skillsUsed: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
