var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var dbUrl = 'mongodb://localhost:27017/todojs';

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
        console.log("Connected successfully to server");
        var collection = db.collection('todos');
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
            res.render('todo',{'title': 'TODO!', 'todos':docs})
        });
    });
});

app.post('/add', function(req, res){
    console.log("received:"+req.body.add);
    MongoClient.connect(dbUrl, function(err, db) {
        console.log("Connected successfully to server");
        addTodo({content:req.body.add},db, function() {
            db.close();
        });
    });
    res.render('add',{'add':req.body.add});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function addTodo(todo, db, callback) {
    var collection = db.collection('todos');
    collection.insertOne(todo, function(err, result) {
        console.log("Inserted todo into the collection:"+todo);
        callback(result);
    });
}
