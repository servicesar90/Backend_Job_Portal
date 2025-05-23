import express from "express";
import bodyParser from 'body-parser';
import {sequelize} from './config/db.js';
import authRoutes from './routes/auth.js';
import employerRoutes from './routes/employerRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import dotenv from 'dotenv';
import './models/associations.js';

dotenv.config();
const app= express();


app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.use('/api/v1',employerRoutes);
app.use('/api/v1',employeeRoutes)



app.get('/',(req,res)=>{
    res.send('this app is working');

})

sequelize.sync().then(() => {
    console.log('✅ MySQL Synced');
    app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
  }).catch(err => console.error('❌ DB Error:', err));

