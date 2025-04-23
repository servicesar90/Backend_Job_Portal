import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";



export const Employer= sequelize.define('Employer',{
    emp_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isEmail:true
        }
    },
    profile:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:"profile image URL"
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'User',
            key:'id'
        },
        allowNull:false,
        unique:true
    }
},{
    timeStamps:true,
    createdAt: 'created_at',
    updatedAt:'updated_at'
});
