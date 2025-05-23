import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../config/db.js";


const Job= sequelize.define('Job',{
    employerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        reference:{
            model:'User',
            key:'id'
        },
        unique:false
    },
    jobTitle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobType:{
        type:DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract','Internship'),
        allowNull:false
    },
    nightShift:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    workLocationType:{
        type:DataTypes.ENUM('work-from-office', 'work-from-home', 'field-work'),
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:true
    },
    payType:{
        type:DataTypes.ENUM('Fixed-only','Fixed+Incentive', 'incentive'),
        allowNull:false
    },
    minimumSalary:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    maximumSalary:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    incentive:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    perks:{
        type:DataTypes.JSON,
        allowNull:true
    },
    joiningFee:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    joiningFeeAmount:{
        type:DataTypes.FLOAT,
        allowNull:true,
    },
    joiningFeeReason:{
        type:DataTypes.ENUM('inventory-charge', 'security-deposit', 'registration-fee', 'commission', 'IRDA-exam', 'other-reason'),
        allowNull:true
    },
    joiningFeeReasonDetail:{
        type:DataTypes.STRING,
        allowNull:true
    },
    
    joiningFeeAmountTime:{
        type:DataTypes.ENUM('before-interview','after-interview','deducted-from-salary'),
        allowNull:true
    },
    education:{
        type:DataTypes.STRING,
        allowNull:true
    },
    english:{
        type:DataTypes.ENUM('NO English','Basic English','Good English'),
        allowNull:true
    },
    experience:{
        type:DataTypes.ENUM('Any','Experienced only','Fresher Only'),
        allowNull:true
    },
    experienceLevel:{
        type:DataTypes.STRING,
        allowNull:true
    },
    educationSpecialization:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    languages:{
        type:DataTypes.JSON,
        allowNull:true
    },
    distance:{
        type:DataTypes.ENUM('<10KM','10-20KM','>20KM'),
        allowNull:false
    },
    skills:{
        type:DataTypes.JSON,
        allowNull:false
    },
    jobDescription:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    walkIn:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    walkInAddress:{
        type:DataTypes.STRING,
        allowNull:true
    },
    walkInStartDate:{
        type:DataTypes.DATEONLY,
        allowNull:true
    },
    WalkInEndDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    walkInStartTime:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    walkInInstruction:{
        type:DataTypes.STRING,
        allowNull:true
    },
    contactPrefernece:{
        type:DataTypes.STRING,
        allowNull:true
    },
    otherRecruiterName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    otherRecruiterNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    otherRecruiterEmail:{
        type:DataTypes.STRING,
        allowNull:true
    },
    candidateType:{
        type:DataTypes.STRING,
        allowNull:true
    }
});



export default Job;