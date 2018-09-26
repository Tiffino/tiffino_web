
const express = require('express');
const router = express.Router();
const mongo = require('../db.js');
const bodyParser = require('body-parser');
var app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res) => {

   res.render('index');
/*  var obJ = {

      Name : req.body.name,

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

    });  */

});

router.post('/fetch',(req,res) => {

    var obj = {Name:req.body.name};

    mongo.connec(function(err){

      if(err){
        console.log("Database Error:".red +err);
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
                 console.log("Response:True".yellow );
               }
               else{
                 res.send("Sorry we're not serving here,but soon will.");
                  console.log("Response:False".yellow );
               }

             mongo.con.close();

             });

             }
        });
      }
    });
});

     router.post('/register',(req,res) => {

          var data = {

            _id:req.body.id,
             Name:req.body.username,
             Email:req.body.email,
             Device token:req.body.device_token

             Device token:req.body.token
          };

          mongo.connec(function(err){

             if(err){

               console.log("Error:".red +err);
             }
             else{

               var collection = mongo.con.db("Tiffino_db").collection("Users");

                 collection.insertOne(data,(err,resp) => {

                      if(err){

                           console.log("Error:" +err);
                           res.send("Error:" +err);
                      }
                      else{

                        console.log("User created.");
                        res.send("User created");
                      }
                 });
             }

         });
     });


module.exports = router;
