
const MongoClient = require("mongodb").MongoClient;

var dburl = process.env.URL;

  function connect(callback){

    MongoClient.connect(dburl,{ useNewUrlParser: true },(err,client) => {

        module.exports.con = client;
        callback(err);
    });
};

module.exports.connec = connect;
