require('dotenv').config();
const express=require('express');
const cors=require('cors')
const app=express();
const db = require('./models/index');
const imageRoutes=require('./routes/imageRoutes')
const authRoutes=require('./routes/authRoutes')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/api',imageRoutes)
app.use('/auth',authRoutes)
app.get('/',(req,res)=>{
    res.send('Backend initialised');
})

db.sequelize.sync()
.then(()=>{
    console.log('Database Connection succeful');

    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening to port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err);
})