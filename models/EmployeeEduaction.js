import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const EmployeeEducation=sequelize.define('EmployeeEducation',{
    employeeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'EmployeeProfiles',
            key:'id'
        }
    },
    educationType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    passingYear:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    degree:{
        type:DataTypes.STRING,
        allowNull:true
    },
    specialization:{
        types:DataTypes.STRING,
        allowNull:true
    },
    instituteName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isHighestQualification:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
    
});