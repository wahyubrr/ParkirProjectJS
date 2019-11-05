var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, 
	function(err, db) {
		if (err) throw err;
		var dbo = db.db("parkirdb");
		var myobj = [
    		{ index: 1, status: 0, entry_datetime: 0},
    		{ index: 2, status: 0, entry_datetime: 0},
    		{ index: 3, status: 0, entry_datetime: 0},
    		{ index: 4, status: 0, entry_datetime: 0},
    		{ index: 5, status: 0, entry_datetime: 0},
    		{ index: 6, status: 0, entry_datetime: 0},
    		{ index: 7, status: 0, entry_datetime: 0},
    		{ index: 8, status: 0, entry_datetime: 0},
    		{ index: 9, status: 0, entry_datetime: 0},
    		{ index: 10, status: 0, entry_datetime: 0},
    		{ index: 11, status: 0, entry_datetime: 0},
    		{ index: 12, status: 0, entry_datetime: 0},
    		{ index: 13, status: 0, entry_datetime: 0},
    		{ index: 14, status: 0, entry_datetime: 0},
    		{ index: 15, status: 0, entry_datetime: 0},
            { index: 16, status: 0, entry_datetime: 0},
            { index: 17, status: 0, entry_datetime: 0},
            { index: 18, status: 0, entry_datetime: 0},
            { index: 19, status: 0, entry_datetime: 0},
            { index: 20, status: 0, entry_datetime: 0}
  			];
		dbo.collection("parkircollection").insertMany(myobj, function(err, res) {
			if (err) throw err;
			console.log("Number of documents inserted: " + res.insertedCount);
			db.close();
		});
	});