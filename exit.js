var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("parkirdb");
  var myquery = { _id: ObjectID("5db19a673ca64b0f9e68e5e4") }; //beri input berupa ID dari arduino/raspberry pi
  dbo.collection("parkircollection").findOne(myquery, function(err, result) {
    if (err) throw err;
    console.log(result.entry_datetime);
    var timenow = new Date();
    console.log(timenow);
    var timegap = parseInt((((timenow - result.entry_datetime) / 1000) / 60) + 1);
    console.log(timegap + ' minutes');

    var newvalues = { $set: {status : 0, entry_datetime : 0} };
    dbo.collection("parkircollection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
}); 
