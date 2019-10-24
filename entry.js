var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("parkirdb");
  dbo.collection("parkircollection").findOne({status:0}, function(err, result) {
    if (err) throw err;
    console.log(result._id);

    var date = new Date();
    var myquery = { _id: result._id };
  	var newvalues = { $set: {status : 1, entry_datetime : date} };
  	dbo.collection("parkircollection").updateOne(myquery, newvalues, function(err, res) {
    	if (err) throw err;
    	console.log("1 document updated");
    	db.close();
  	});
  });
}); 

// module.exports = {
//   GetParkingSpot: function() {
//     return MongoClient.connect(url).then(function(db) {
//       var db = db.db("parkirdb");
//       var collection = db.collection("parkircollection");

//       return collection.findOne({status:0});
//     }).then(function(queryid) {
//       console.log(queryid);
//       return queryid;
//     });
//   }
// };