import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../config/db.js";


const Job= sequelize.define('Job',{
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
        type:DataTypes.ENUM('Fixed-only','Fixed+Incentive', 'incentive');
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
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
    },
    joiningFee:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    joiningFeeReason:{
        type:DataTypes.ENUM('inventory-charge', 'security-deposit', 'registration-fee', 'commission', 'IRDA-exam', 'other-reason'),
        allowNull:true
    },
    joiningFeeReasonDetail:{
        type:DataTypes.STRING,
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
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
    },
    distance:{
        type:DataTypes.ENUM('<10KM','10-20KM','>20KM'),
        allowNull:false
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
    },
    jobDescription:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    walkin:{
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
    walkinInstruction:{
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