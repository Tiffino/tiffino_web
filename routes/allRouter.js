
const express = require('express');
const router = express.Router();
const mongo = require('../db.js');
const bodyParser = require('body-parser');
var app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/',(req,res) => {

  var obJ = {

      Name : req.body.name,
      Continent:req.body.cont
  };

  mongo.connec(function(err){

       if(err){
         console.log("Error:".red +err);
       }
       else{

        mongo.con.db("Tiffino_db").collection("Places").insertOne(obJ,(err,result) => {

            if(err){

              console.log("Error:".red +err);
            }
            else{

                console.log("Response:".green);
                res.json({msg:"got that"});
            }

             mongo.con.close();
          });
       }

    });

});

router.post('/fetch',(req,res) => {

    var obj = {Name:req.body.name};

    mongo.connec(function(err){

      if(err){
        console.log("Error:".red +err);
      }

      else{

        var finding = mongo.con.db("Tiffino_db").collection("Places");

      /*  var cnt = finding.find({Name:obj.Name}).count().then((count) =>{
             console.log("Count:".yellow +count);
        });  */

         finding.find({Name:obj.Name},(err,cursor) => {

               if(err){
                 console.log("Error".red +err);
               }
               else{
               cursor.count(function(err,count){

                var me = count;
               if(me>0){
                 res.send("True");
               }
               else{
                 res.send("False");
               }

             mongo.con.close();

             });

             }
        });
      }
    });
});


module.exports = router;
