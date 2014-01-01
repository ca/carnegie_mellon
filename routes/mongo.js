var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 3000, {auto_reconnect: true});
db = new Db('votedb', server, {w: 1});

db.open(function(err, db) {
    console.log(err);
    if(!err) {
        console.log("Connected to 'highlandsdb'");
        db.collection('votes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'votes' collection does not exist! Creating with sample data...");
                populateDB();
            }
        });
    }
});

exports.getVotes = function(req, res) {
    db.collection('votes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.postVote = function(req, res) {
    var classA = req.body;
    console.log('Adding vote: ' + JSON.stringify(classA));
    db.collection('votes', function(err, collection) {
        collection.insert(classA, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error': 'Error has occurred!'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
         });
     });
}

var populateDB = function() {

    var votes = [
        {
            "upvotes": 0,
            "downvotes": 0
        }
    ];

    db.collection('votes', function(err, collection) {
        collection.insert(votes, {safe:true}, function(err, result) {});
    });

};