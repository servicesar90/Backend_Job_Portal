import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";


const Company=sequelize.define('company',{
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    industry:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    about:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    website:{
        type:DataTypes.STRING,
        allowNull:true
    },
    logoUrl:{
        type:DataTypes.STRING,
        allowNull:true
  
    }
});

export default Company;