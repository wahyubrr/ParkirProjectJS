var express = require('express'); // Import Node.js core module
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public')); //for serving static files in folder 'public'
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  checkspot()
  .then(function(value) {
    console.log('Entry Async success!');
    res.render('pages/index.ejs', { result: value });
  })
  .catch(function(err) {
    console.log('Caught an error! ', err);
  })
})

app.get('/entry', function(req, res) {
  entry()
    .then(function(value) {
    console.log('Entry Async success! ', value);
    res.writeHead(200, { 'Content-Type': 'application/json' }); //json dikirim untuk print ID di raspberry pi
    res.write(JSON.stringify({ id: value }));
    res.end();
  })
  .catch(function(err) {
    console.log('Caught an error! ', err);
  });
})

app.post('/exit', urlencodedParser, function(req, res) {
  var id = req.body.id;
  response = {id:req.body.id};
  console.log(response);
  exit(response.id)
    .then(function(value) {
    console.log('Exit Async success! ', value);
    res.writeHead(200, { 'Content-Type': 'application/json' }); //json dikirim untuk print ID di raspberry pi
    res.write(JSON.stringify({ timegap: value }));
    res.end();
  })
  .catch(function(err) {
    console.log('Caught an error! ', err);
  });
})

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Node.js web server at port 8081 is running..')
})


function checkspot() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parkirdb");
        dbo.collection("parkircollection").find().toArray(function(err, result) {
          if (err) throw err;
        db.close();
        resolve(result);
        });
      });
    });
  });
}

function entry() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parkirdb");
        dbo.collection("parkircollection").findOne({status:0}, function(err, result) {
          if (err) throw err;
          console.log(result._id);
          //str = String(result._id);
        var date = new Date();
        var myquery = { _id: result._id };
        var newvalues = { $set: {status : 1, entry_datetime : date} };
        dbo.collection("parkircollection").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        });

        resolve(result._id);

        });
      });
    });//2000); //put timeout here
  });
}

function exit(exitid) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parkirdb");
        var myquery = { _id: ObjectID(exitid) }; //beri input berupa ID dari arduino/raspberry pi
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

          resolve(timegap);

        });
      }); 
    });//2000); put timeout here
  })
}