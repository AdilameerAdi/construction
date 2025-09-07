const express = require('express');
const port = 8000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db');
require('dotenv').config();



// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
const activityRoutes = require("./Routes/ActivityRoutes");
app.use("/api/activities", activityRoutes);

//Test Api
app.get('/test',(req,res)=>{
    res.status(200);
    res.json({
        message : "Api is Working!"
    });
})

app.listen(port,()=>{
    console.log(`This App is running on folling ${port} Port.`);
})