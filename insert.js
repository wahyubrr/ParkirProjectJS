var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, 
	function(err, db) {
		if (err) throw err;
		var dbo = db.db("parkirdb");
		var myobj = [
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0},
    		{ status: 0, entry_datetime: 0}
  			];
		dbo.collection("parkircollection").insertMany(myobj, function(err, res) {
			if (err) throw err;
			console.log("Number of documents inserted: " + res.insertedCount);
			db.close();
		});
	});