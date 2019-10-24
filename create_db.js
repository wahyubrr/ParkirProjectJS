var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/parkirdb";

MongoClient.connect(url, function(err, db) {
  useNewUrlParser: true;
  if (err) throw err;
  console.log("Database created!");
  db.close();
});