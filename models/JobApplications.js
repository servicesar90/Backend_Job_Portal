import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import { defaultValueSchemable } from "sequelize/lib/utils";

const JobApplication= sequelize.define('JobApplication',{
    jobId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Job',
            key:'id'
        }
    },
    employeeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Employee',
            key:'id'
        }
    },
    resumeUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM('Applied','Shortlist','Rejected'),
        defaultValue:'Applied'
    },
    appliedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },

})

export default JobApplication;