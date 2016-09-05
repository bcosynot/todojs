var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('todo',{'title': 'TODO!'})
});

app.post('/add', function(req, res){
    console.log("received:"+req.body.add);
    res.render('add',{'add':req.body.add});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
