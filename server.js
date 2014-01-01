var express = require('express'),
    mongo = require('./routes/mongo'),
    path = require('path'),
    http = require('http');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'pub')));
});

app.get('/api/votes', mongo.getVotes);
app.put('/api/votes/52c3b1b8ecd11f3d564076fe', mongo.updateVotes);

http.createServer(app).listen(80, function() {
    console.log('Server listening on port 80.... Welcome to the Internet.....');
});