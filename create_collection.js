var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, 
	function(err, db) {
		if (err) throw err;
		var dbo = db.db("parkirdb");
		var myobj = [
    		{ index: 1, status: "Empty", entry_datetime: 0},
    		{ index: 2, status: "Empty", entry_datetime: 0},
    		{ index: 3, status: "Empty", entry_datetime: 0},
    		{ index: 4, status: "Empty", entry_datetime: 0},
    		{ index: 5, status: "Empty", entry_datetime: 0},
    		{ index: 6, status: "Empty", entry_datetime: 0},
    		{ index: 7, status: "Empty", entry_datetime: 0},
    		{ index: 8, status: "Empty", entry_datetime: 0},
    		{ index: 9, status: "Empty", entry_datetime: 0},
    		{ index: 10, status: "Empty", entry_datetime: 0},
    		{ index: 11, status: "Empty", entry_datetime: 0},
    		{ index: 12, status: "Empty", entry_datetime: 0},
    		{ index: 13, status: "Empty", entry_datetime: 0},
    		{ index: 14, status: "Empty", entry_datetime: 0},
    		{ index: 15, status: "Empty", entry_datetime: 0},
            { index: 16, status: "Empty", entry_datetime: 0},
            { index: 17, status: "Empty", entry_datetime: 0},
            { index: 18, status: "Empty", entry_datetime: 0},
            { index: 19, status: "Empty", entry_datetime: 0},
            { index: 20, status: "Empty", entry_datetime: 0}
  			];
		dbo.collection("parkircollection").insertMany(myobj, function(err, res) {
			if (err) throw err;
			console.log("Number of documents inserted: " + res.insertedCount);
			db.close();
		});
	});