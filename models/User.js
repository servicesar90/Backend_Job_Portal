import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';


export const User =sequelize.define('User',{
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('employee','employer'),
        allowNull:false
    },

},{
    timeStamps:true
}
);

