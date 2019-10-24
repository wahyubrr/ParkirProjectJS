var http = require('http'); // Import Node.js core module
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var server = http.createServer(function (req, res) {   //create web server
  if (req.url == '/') { //check the URL of the current request
       
    // set response header
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
    // set response content
    res.write('<html><body><p>This is home Page.</p></body></html>');
    res.end();
    
  }
  else if (req.url == "/entry") {
    entry()
      .then(function(value) {
        console.log('Async success! ', value);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ id: value }));
        res.end();
      })
      .catch(function(err) {
        console.log('Caught an error! ', err);
      });

  }
  else if (req.url == "/exit") {
        
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>This is admin Page.</p></body></html>');
    res.end();
    
  }
  else
    res.end('Invalid Request!');

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')

function entry() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parkirdb");
        dbo.collection("parkircollection").findOne({status:0}, function(err, result) {
          if (err) throw err;
          console.log(result._id);
          str = String(result._id);
        // var date = new Date();
        // var myquery = { _id: result._id };
        // var newvalues = { $set: {status : 1, entry_datetime : date} };
        // dbo.collection("parkircollection").updateOne(myquery, newvalues, function(err, res) {
        // if (err) throw err;
        // console.log("1 document updated");
        // db.close();
        // });

        resolve(result._id);

        });
      });
    }, );//2000); //put timeout here
  });
}