const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require('cors');
require('dotenv').config({ path: '/Users/nigeldias27/ReactProjects/test_api/pass.env' });
const app = express();

app.use(express.json());
app.use(cors());
app.listen(4000, () => {
    console.log(`Server Started at ${4000}`);
    
})
app.use('/api', routes)

const user = process.env.DATABASE_URL;
mongoose.connect(user)
const database = mongoose.connection;
database.once('connected',()=>{console.log("Database connected successfully!")});
database.on('error',(err)=>{console.log(err)});