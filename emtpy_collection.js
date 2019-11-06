var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, 
	function(err, db) {
		if (err) throw err;
		var dbo = db.db("parkirdb");
		var newvalues = { $set: {status : "Empty", entry_datetime : 0} };
        dbo.collection("parkircollection").updateMany({status:"Occupied"}, newvalues, function(err, res) {
            if (err) throw err;
            console.log("All document updated to 'Empty'");
            db.close();
          });
	});