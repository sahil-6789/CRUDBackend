const express = require('express')
const mongoose =require( 'mongoose');
const data= require('./data.json');
const USER=require('./Model/User');
const teamRouter = require("./Route/team");
const UserRouter = require("./Route/user");
const queryRouter = require("./Route/filter");
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();


const app = express(); 
                                                 
app.use(express.json());

app.use(cors());



app.use("/api/user", UserRouter.router);
app.use("/api/query", queryRouter.router);
app.use("/api/team", teamRouter.router);

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
}


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};


const connectToDataBase=()=>{
  mongoose.connect('mongodb://localhost:27017/heliverse', options)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  connectToDataBase();
app.listen(8080, () => {
    console.log('Heliverse backend  listening on port http://localhost:8080')
})






