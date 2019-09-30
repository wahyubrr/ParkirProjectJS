var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, 
	function(err, db) {
		if (err) throw err;
		var dbo = db.db("parkirdb");
		var myobj = { name: "Wahyu Berlianto", address: "Jl. Manyar Kartika no. 24D"};
		dbo.collection("parkircolection").insertOne(myobj, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
	});