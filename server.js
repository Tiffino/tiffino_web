
 const express = require('express');
 const dotEnv = require('dotenv').config();
 const color = require('colors');

 const app = express();

 const port = process.env.PORT || 3000;
 app.use(require('./routes/allRouter'));

 app.listen(port,(req,res) => {

     console.log("Server is running at:".green +port);

 });
